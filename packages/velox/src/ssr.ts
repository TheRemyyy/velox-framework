export type SSRComponent = (props: any) => SafeString | Promise<SafeString>;

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

// Global hydration counter
let hydrationId = 0;

/**
 * Resets the global hydration ID counter.
 * Call this before rendering a new request on the server.
 */
export function resetHydrationId() {
    hydrationId = 0;
}

export class SafeString {
    constructor(public value: string) {}
    toString() { return this.value; }
}

/**
 * Escapes HTML special characters to prevent XSS.
 */
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Renders a component tree to an HTML string.
 */
export function renderToString(tag: string | SSRComponent | any, props: any = {}, ...children: any[]): SafeString {
    props = props || {};
    const normalizedChildren = children.flat().filter(c => c != null && c !== true && c !== false);

    // Handle Component
    if (typeof tag === 'function') {
        const result = tag({ ...props, children: normalizedChildren });
        if (result instanceof SafeString) return result;
        return new SafeString(String(result));
    }

    // Handle Fragment
    if (Array.isArray(tag)) {
        return new SafeString(tag.map(c => renderToStringChild(c)).join(''));
    }

    // Handle HTML Element
    const tagName = tag as string;
    hydrationId++;
    let html = `<${tagName} data-hid="${hydrationId}"`;

    // Attributes
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
            // boolean attributes
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

    // Children
    normalizedChildren.forEach(child => {
        html += renderToStringChild(child);
    });

    html += `</${tagName}>`;
    return new SafeString(html);
}

function renderToStringChild(child: any): string {
    if (child instanceof SafeString) {
        return child.value;
    }
    if (typeof child === 'string' || typeof child === 'number') {
        return escapeHtml(String(child));
    }
    // If it's a function (Signal), execute it
    if (typeof child === 'function') {
        const res = child();
        if (res instanceof SafeString) return res.value;
        return escapeHtml(String(res));
    }
    return String(child);
}

// SSR specific `h` function
export function hSSR(tag: string | SSRComponent, props: any, ...children: any[]): SafeString {
     return renderToString(tag, props, ...children);
}
