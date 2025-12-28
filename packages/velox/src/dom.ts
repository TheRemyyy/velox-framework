import { createEffect, batch } from './reactive';
import { getContext, pushContext, popContext, resetContext } from './context';

export interface VNode {
    exec: () => Node;
}
export type Component = (props: Props) => VNode;
export type Factory = VNode;

// Basic Types
export type Props = Record<string, any>;

let isHydrating = false;

export function setHydrating(value: boolean) {
    isHydrating = value;
}

// Helper to attach cleanups
const CLEANUP_KEY = Symbol('velox_cleanup');
interface VeloxNode extends Node {
    [CLEANUP_KEY]?: (() => void)[];
}

export function addNodeCleanup(node: Node, fn: () => void) {
    const vNode = node as VeloxNode;
    if (!vNode[CLEANUP_KEY]) vNode[CLEANUP_KEY] = [];
    vNode[CLEANUP_KEY]!.push(fn);
}

export function dispose(node: Node) {
    const vNode = node as VeloxNode;
    if (vNode[CLEANUP_KEY]) {
        vNode[CLEANUP_KEY]!.forEach(fn => fn());
        vNode[CLEANUP_KEY] = undefined;
    }
    // Recursive
    if (node.hasChildNodes()) {
        node.childNodes.forEach(child => dispose(child));
    }
}

export function h(tag: string | Component, props: Props | null, ...children: any[]): VNode {
    const safeProps = props || {};
    let normalizedChildren = children.flat().filter(c => c != null && c !== true && c !== false);

    if (normalizedChildren.length === 0 && safeProps.children) {
        normalizedChildren = Array.isArray(safeProps.children) ? safeProps.children.flat() : [safeProps.children];
    }

    return {
        exec: () => {
            if (typeof tag === 'function') {
                // Component
                const vnode = tag({ ...safeProps, children: normalizedChildren });
                return vnode.exec();
            }

            // HTML Element
            const ctx = getContext();
            const currentId = ctx.hydrationPath;

            let element: HTMLElement | null = null;

            if (isHydrating) {
                // Hierarchical ID lookup
                const found = document.querySelector(`[data-hid="${currentId}"]`);
                if (found && found.tagName.toLowerCase() === tag.toLowerCase()) {
                    element = found as HTMLElement;
                    element.removeAttribute('data-hid');
                }
            }

            if (!element) {
                element = document.createElement(tag);
            }

            // Apply Props
            for (const [key, value] of Object.entries(safeProps)) {
                if (key === 'children' || key === 'key') continue;

                if (key.startsWith('on') && typeof value === 'function') {
                    const eventName = key.toLowerCase().substring(2);
                    element.addEventListener(eventName, (e) => {
                        batch(() => value(e));
                    });
                } else {
                    if (typeof value === 'function') {
                        const stop = createEffect(() => {
                            const newValue = value();
                            setAttribute(element!, key, newValue);
                        });
                        addNodeCleanup(element, stop);
                    } else {
                        setAttribute(element, key, value);
                    }
                }
            }

            // Process Children
            let domCursor = element.firstChild;

            normalizedChildren.forEach((child, i) => {
                const childId = `${currentId}.${i}`;
                pushContext({ hydrationPath: childId });

                let childNode: Node | null = null;

                if (child && typeof child === 'object' && 'exec' in child) {
                    // VNode
                    childNode = (child as VNode).exec();
                } else if (typeof child === 'function') {
                    // Signal
                    childNode = handleSignal(child, domCursor);
                } else {
                    // Static Text
                    childNode = handleStaticText(String(child), domCursor);
                }

                // Placement / Reconciliation
                if (childNode) {
                    if (domCursor === childNode) {
                        domCursor = domCursor.nextSibling;
                    } else {
                        // Robust check before insert
                        if (childNode.parentNode !== element) {
                            element!.insertBefore(childNode, domCursor);
                        } else {
                            // It is already child, but not at cursor. Move it.
                            element!.insertBefore(childNode, domCursor);
                        }
                    }
                }

                popContext();
            });

            // Cleanup remaining nodes (mismatches)
            while (domCursor) {
                const next = domCursor.nextSibling;
                // Robust check before remove
                if (domCursor.parentNode === element) {
                    dispose(domCursor);
                    element.removeChild(domCursor);
                }
                domCursor = next;
            }

            return element;
        }
    }
}

function handleSignal(signal: () => unknown, cursor: Node | null): Node {
    let textNode: Text;
    // Try to claim cursor if it's text
    if (cursor && cursor.nodeType === Node.TEXT_NODE) {
        textNode = cursor as Text;
    } else {
        textNode = document.createTextNode('');
    }

    const stop = createEffect(() => {
        const val = signal();
        const str = String(val ?? '');
        if (textNode.data !== str) {
            textNode.data = str;
        }
    });

    addNodeCleanup(textNode, stop);
    return textNode;
}

function handleStaticText(text: string, cursor: Node | null): Node {
    if (cursor && cursor.nodeType === Node.TEXT_NODE) {
        const textNode = cursor as Text;
        if (textNode.data !== text) textNode.data = text;
        return textNode;
    }
    return document.createTextNode(text);
}

function setAttribute(element: HTMLElement, key: string, value: any) {
    if (value === null || value === undefined) {
        element.removeAttribute(key);
    } else if (key === 'className' || key === 'class') {
        element.className = value;
    } else if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
    } else {
        element.setAttribute(key, String(value));
    }
}

export function mount(component: Component, root: HTMLElement) {
    resetContext();
    root.textContent = '';
    const vnode = component({});
    const node = vnode.exec();
    root.appendChild(node);
}

export const Fragment: Component = (props) => {
    return {
        exec: () => {
            const ctx = getContext();
            const currentId = ctx.hydrationPath;

            const fragment = document.createDocumentFragment();
            const children = props.children || [];

            const flatChildren = Array.isArray(children) ? children.flat() : [children];

            flatChildren.forEach((child: any, i: number) => {
                const childId = `${currentId}.${i}`;
                pushContext({ hydrationPath: childId });

                let node: Node | null = null;
                if (child && child.exec) node = child.exec();
                else if (typeof child === 'function') node = handleSignal(child, null);
                else node = document.createTextNode(String(child));

                if (node) fragment.appendChild(node);

                popContext();
            });
            return fragment;
        }
    };
}
