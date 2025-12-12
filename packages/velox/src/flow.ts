import { createEffect } from './reactive';
import { h, Component, dispose, addNodeCleanup } from './dom';
import { hSSR } from './ssr';

const isServer = typeof window === 'undefined';

export const For: Component = (props: any) => {
    const each = props.each as () => any[];
    const renderer = props.children[0];

    if (isServer) {
        const list = each() || [];
        const children = list.map((item, i) => renderer(item, () => i));
        // Return as any because SSR returns SafeString but Component expects Node.
        // In SSR flow, this is handled.
        return hSSR('div', { style: { display: 'contents' } }, ...children) as any;
    }

    // Wrapper container with display: contents to minimize layout impact
    const container = h('div', { style: { display: 'contents' } }) as HTMLElement;

    // Map of rendered items: Item Reference -> DOM Node
    let renderedItems = new Map<any, Node>();

    const stop = createEffect(() => {
        const list = each() || [];
        const newRenderedItems = new Map<any, Node>();

        // Start diffing from the beginning of the container
        let currentDomNode = container.firstChild;

        list.forEach((item, index) => {
             let node = renderedItems.get(item);

             // If item is not previously rendered, create it
             if (!node) {
                 node = renderer(item, () => index);
             }

             // Ensure node is defined
             if (node) {
                 newRenderedItems.set(item, node);

                 // DOM Reconciliation
                 if (node !== currentDomNode) {
                     // Move or Insert
                     container.insertBefore(node, currentDomNode);
                 } else {
                     // Match, advance cursor
                     currentDomNode = currentDomNode.nextSibling;
                 }
             }
        });

        // Cleanup removed items
        renderedItems.forEach((node, item) => {
            if (!newRenderedItems.has(item)) {
                dispose(node);
                if (node.parentNode === container) {
                    container.removeChild(node);
                }
            }
        });

        renderedItems = newRenderedItems;
    });

    addNodeCleanup(container, stop);

    return container;
};
