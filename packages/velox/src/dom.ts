import { createEffect } from './reactive';

export type Component = (props: any) => Node;

// Basic Types
type Props = Record<string, any>;

let hydrationId = 0;
let isHydrating = false;

export function setHydrating(value: boolean) {
    isHydrating = value;
}

export function resetHydrationId() {
    hydrationId = 0;
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
    node.childNodes.forEach(child => dispose(child));
}

/**
 * Creates a DOM element or component.
 * @param tag The tag name (string) or component function.
 * @param props The attributes/props.
 * @param children The children nodes.
 * @returns A DOM Node or Fragment.
 */
export function h(tag: string | Component, props: Props | null, ...children: any[]): Node {
  props = props || {};
  const normalizedChildren = children.flat().filter(c => c != null && c !== true && c !== false);

  // If it's a component function, call it.
  if (typeof tag === 'function') {
    return tag({ ...props, children: normalizedChildren });
  }

  // It's a native DOM element
  hydrationId++;
  let element: HTMLElement | null = null;
  let hydrated = false;

  if (isHydrating) {
      const existing = document.querySelector(`[data-hid="${hydrationId}"]`);
      if (existing && existing.tagName.toLowerCase() === tag.toLowerCase()) {
          element = existing as HTMLElement;
          element.removeAttribute('data-hid');
          hydrated = true;
      }
  }

  if (!element) {
      element = document.createElement(tag);
  }

  // Handle props
  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.toLowerCase().substring(2);
      element.addEventListener(eventName, value);
    } else {
      // Reactivity support for attributes
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

  // Handle children
  if (hydrated) {
      reconcileChildren(element, normalizedChildren);
  } else {
      normalizedChildren.forEach(child => {
          appendChild(element!, child);
      });
  }

  return element;
}

function setAttribute(element: HTMLElement, key: string, value: any) {
    if (value === null || value === undefined) {
        element.removeAttribute(key);
    } else if (key === 'className') {
        element.className = value;
    } else if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
    } else {
        element.setAttribute(key, String(value));
    }
}

function appendChild(parent: Node, child: any) {
    if (typeof child === 'function') {
        // It's a signal or computed value -> Dynamic Text Node
        let currentTextNode: Text | null = null;
        const stop = createEffect(() => {
            const newValue = child();
            const textContent = String(newValue ?? '');

            if (!currentTextNode) {
                currentTextNode = document.createTextNode(textContent);
                parent.appendChild(currentTextNode);
            } else {
                currentTextNode.data = textContent;
            }
        });
        addNodeCleanup(parent, stop);
    } else if (child instanceof Node) {
        parent.appendChild(child);
    } else {
        // String or Number
        parent.appendChild(document.createTextNode(String(child)));
    }
}

function reconcileChildren(parent: HTMLElement, children: any[]) {
    let currentDomNode = parent.firstChild;

    children.forEach(child => {
        if (typeof child === 'function') {
            // Signal
            let signalTextNode: Text | null = null;
            if (currentDomNode && currentDomNode.nodeType === Node.TEXT_NODE) {
                signalTextNode = currentDomNode as Text;
                currentDomNode = currentDomNode.nextSibling;
            }

            const stop = createEffect(() => {
                const newValue = child();
                const textContent = String(newValue ?? '');

                if (!signalTextNode) {
                    signalTextNode = document.createTextNode(textContent);
                    parent.appendChild(signalTextNode);
                } else {
                    signalTextNode.data = textContent;
                }
            });
            addNodeCleanup(parent, stop);

        } else if (child instanceof Node) {
            if (currentDomNode === child) {
                 currentDomNode = currentDomNode.nextSibling;
            } else {
                 parent.insertBefore(child, currentDomNode);
            }

        } else {
             // String/Number
             const textContent = String(child);
             if (currentDomNode && currentDomNode.nodeType === Node.TEXT_NODE) {
                 const textNode = currentDomNode as Text;
                 if (textNode.data !== textContent) textNode.data = textContent;
                 currentDomNode = currentDomNode.nextSibling;
             } else {
                 parent.insertBefore(document.createTextNode(textContent), currentDomNode);
             }
        }
    });

    // Remove remaining nodes
    while (currentDomNode) {
        const next = currentDomNode.nextSibling;
        dispose(currentDomNode);
        parent.removeChild(currentDomNode);
        currentDomNode = next;
    }
}

/**
 * Mounts a component to a root element.
 * @param component The component to mount.
 * @param root The DOM element to mount into.
 */
export function mount(component: () => Node, root: HTMLElement) {
    root.textContent = '';
    const node = component();
    root.appendChild(node);
}

// Fragment support (basic)
export const Fragment: Component = (props) => {
    const fragment = document.createDocumentFragment();
    (props.children || []).forEach((child: any) => appendChild(fragment, child));
    return fragment;
}
