import { h, Fragment } from './dom';

export { Fragment };

export function jsx(tag: any, props: any, key: any) {
    const { children, ...rest } = props || {};
    if (key !== undefined) {
        rest.key = key;
    }

    let childArgs: any[] = [];
    if (Array.isArray(children)) {
        childArgs = children;
    } else if (children !== undefined) {
        childArgs = [children];
    }

    return h(tag, rest, ...childArgs);
}

export const jsxs = jsx;

export namespace JSX {
    // VNode structure matching dom.ts
    export interface Element {
        exec: () => Node;
    }

    // Explicitly define common events to support camelCase usage + generics
    interface VeloxEvents {
        onClick?: (e: MouseEvent) => void;
        onDblClick?: (e: MouseEvent) => void;
        onMouseDown?: (e: MouseEvent) => void;
        onMouseUp?: (e: MouseEvent) => void;
        onMouseEnter?: (e: MouseEvent) => void;
        onMouseLeave?: (e: MouseEvent) => void;
        onMouseMove?: (e: MouseEvent) => void;

        onKeyDown?: (e: KeyboardEvent) => void;
        onKeyUp?: (e: KeyboardEvent) => void;
        onKeyPress?: (e: KeyboardEvent) => void;

        onChange?: (e: Event) => void;
        onInput?: (e: Event) => void;
        onSubmit?: (e: Event) => void;
        onFocus?: (e: FocusEvent) => void;
        onBlur?: (e: FocusEvent) => void;

        // Fallback for others
        [key: `on${string}`]: any;
    }

    // Strict mapped types for intrinsic elements
    export type IntrinsicElements = {
        [K in keyof HTMLElementTagNameMap]: Partial<Omit<HTMLElementTagNameMap[K], 'children' | 'style'>> & VeloxEvents & {
            children?: any;
            style?: string | Partial<CSSStyleDeclaration>;
            class?: string;
        };
    }

    export interface ElementChildrenAttribute {
        children: {};
    }
}
