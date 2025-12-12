import { getContext, pushContext, popContext, resetContext } from './context';

export type SSRComponent = (props: any) => SSRVNode;

export interface SSRVNode {
    exec: () => SafeString;
}

export const resetHydrationId = resetContext;

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

export class SafeString {
    constructor(public value: string) {}
    toString() { return this.value; }
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export function hSSR(tag: string | SSRComponent, props: any, ...children: any[]): SSRVNode {
    props = props || {};
    let normalizedChildren = children.flat().filter(c => c != null && c !== true && c !== false);

    if (normalizedChildren.length === 0 && props.children) {
        normalizedChildren = Array.isArray(props.children) ? props.children.flat() : [props.children];
    }

    return {
        exec: () => {
            if (typeof tag === 'function') {
                const result = tag({ ...props, children: normalizedChildren });
                if (result && result.exec) return result.exec();
                return new SafeString(String(result));
            }

            const ctx = getContext();
            const currentId = ctx.hydrationPath;

            const tagName = tag as string;
            let html = `<${tagName} data-hid="${currentId}"`;

            for (const [key, value] of Object.entries(props)) {
                if (key === 'children' || key.startsWith('on')) continue;
                if (key === 'className') {
                    html += ` class="${escapeHtml(String(value))}"`;
                } else if (key === 'style' && typeof value === 'object') {
                     const styleStr = Object.entries(value as Record<string, any>)
                        .map(([k, v]) => `${k}:${v}`)
                        .join(';');
                     html += ` style="${escapeHtml(styleStr)}"`;
                } else {
                    if (value === true) {
                         html += ` ${key}`;
                    } else if (value !== false && value != null) {
                         html += ` ${key}="${escapeHtml(String(value))}"`;
                    }
                }
            }

            if (VOID_ELEMENTS.has(tagName)) {
                html += ' />';
                return new SafeString(html);
            }

            html += '>';

            normalizedChildren.forEach((child, i) => {
                const childId = `${currentId}.${i}`;
                pushContext({ hydrationPath: childId });
                html += renderToStringChild(child);
                popContext();
            });

            html += `</${tagName}>`;
            return new SafeString(html);
        }
    }
}

export const Fragment: SSRComponent = (props) => {
    return {
        exec: () => {
            const ctx = getContext();
            const currentId = ctx.hydrationPath;

            let html = '';
            const children = props.children || [];

            children.flat().forEach((child: any, i: number) => {
                const childId = `${currentId}.${i}`;
                pushContext({ hydrationPath: childId });
                html += renderToStringChild(child);
                popContext();
            });

            return new SafeString(html);
        }
    };
}

function renderToStringChild(child: any): string {
    if (child && child.exec) {
        const res = child.exec();
        if (res instanceof SafeString) return res.value;
        return String(res);
    }
    if (child instanceof SafeString) {
        return child.value;
    }
    if (typeof child === 'string' || typeof child === 'number') {
        return escapeHtml(String(child));
    }
    if (typeof child === 'function') {
        const res = child();
        if (res instanceof SafeString) return res.value;
        return escapeHtml(String(res));
    }
    return String(child);
}

export function renderToString(component: SSRComponent): SafeString {
    resetContext();
    const vnode = component({});
    return vnode.exec();
}

export async function renderToStringAsync(component: SSRComponent): Promise<SafeString> {
    resetContext(); // Start fresh

    const MAX_PASSES = 10;
    for (let i = 0; i < MAX_PASSES; i++) {
        if (i > 0) resetContext(true); // Keep cache

        const promises = new Set<Promise<any>>();
        pushContext({ suspense: promises });

        const vnode = component({});
        const result = vnode.exec();

        popContext();

        if (promises.size === 0) {
            return result;
        }

        await Promise.all(promises);
    }
    return new SafeString('<!-- Suspense Timeout -->');
}
