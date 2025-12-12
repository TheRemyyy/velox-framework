import { h, Fragment } from './dom';

export { Fragment };

export function jsx(tag: any, props: any, key: any) {
    // The automatic runtime passes children inside props.
    // Our h function expects children as rest arguments.
    // We need to extract children from props.

    const { children, ...rest } = props || {};
    if (key !== undefined) {
        rest.key = key;
    }

    // If children is an array, spread it. If it's a single value, pass it.
    // However, h expects ...children.

    // Case 1: children is an array [child1, child2]
    // Case 2: children is a single child
    // Case 3: no children

    let childArgs = [];
    if (Array.isArray(children)) {
        childArgs = children;
    } else if (children !== undefined) {
        childArgs = [children];
    }

    return h(tag, rest, ...childArgs);
}

export const jsxs = jsx;
