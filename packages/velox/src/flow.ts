import { createEffect } from './reactive';
import { h, Component, dispose, addNodeCleanup } from './dom';
import { hSSR } from './ssr';

const isServer = typeof window === 'undefined';

export const For: Component = (props: any) => {
    const each = props.each as () => any[];
    const renderer = props.children[0];
    const keyFn = props.key; // Optional key function

    if (isServer) {
        const list = each() || [];
        const children = list.map((item, i) => renderer(item, () => i));
        // Return as any because SSR returns SafeString but Component expects Node.
        // In SSR flow, this is handled.
        return hSSR('div', { style: { display: 'contents' } }, ...children) as any;
    }

    // Wrapper container with display: contents to minimize layout impact
    const container = h('div', { style: { display: 'contents' } }) as HTMLElement;

    // Map of rendered items: Key -> Array of Nodes (to handle duplicates)
    let renderedItems = new Map<any, Node[]>();

    const stop = createEffect(() => {
        const list = each() || [];
        const newRenderedItems = new Map<any, Node[]>();

        // Create a pool of existing nodes to reuse
        // We clone the arrays because we will shift() from them
        const pool = new Map<any, Node[]>();
        renderedItems.forEach((nodes, key) => {
             pool.set(key, [...nodes]);
        });

        // Start diffing from the beginning of the container
        let currentDomNode = container.firstChild;

        list.forEach((item, index) => {
             const key = keyFn ? keyFn(item, index) : item;

             let nodes = pool.get(key);
             let node: Node | undefined;

             if (nodes && nodes.length > 0) {
                 node = nodes.shift();
             }

             if (!node) {
                 node = renderer(item, () => index);
             }

             if (node) {
                 // Register in new map
                 if (!newRenderedItems.has(key)) newRenderedItems.set(key, []);
                 newRenderedItems.get(key)!.push(node);

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

        // Cleanup remaining nodes in pool (not reused)
        pool.forEach((nodes) => {
            nodes.forEach(node => {
                dispose(node);
                if (node.parentNode === container) {
                    container.removeChild(node);
                }
            });
        });

        renderedItems = newRenderedItems;
    });

    addNodeCleanup(container, stop);

    return container;
};
