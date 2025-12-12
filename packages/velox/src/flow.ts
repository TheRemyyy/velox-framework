import { createEffect } from './reactive';
import { h, Component, dispose, addNodeCleanup, VNode } from './dom';
import { hSSR } from './ssr';

const isServer = typeof window === 'undefined';

export const For: Component = (props: any) => {
    const each = props.each as () => any[];
    const renderer = props.children[0];
    const keyFn = props.key;

    if (isServer) {
        const list = each() || [];
        const children = list.map((item, i) => renderer(item, () => i));
        return hSSR('div', { style: { display: 'contents' } }, ...children) as any;
    }

    const containerVNode = h('div', { style: { display: 'contents' } });

    const originalExec = containerVNode.exec;
    containerVNode.exec = () => {
        const container = originalExec() as HTMLElement;

        let renderedItems = new Map<any, Node[]>();

        const stop = createEffect(() => {
            const list = each() || [];
            const newRenderedItems = new Map<any, Node[]>();
            const pool = new Map<any, Node[]>();

            renderedItems.forEach((nodes, key) => {
                 pool.set(key, [...nodes]);
            });

            let currentDomNode = container.firstChild;

            list.forEach((item, index) => {
                 const key = keyFn ? keyFn(item, index) : item;

                 let nodes = pool.get(key);
                 let node: Node | undefined;

                 if (nodes && nodes.length > 0) {
                     node = nodes.shift();
                 }

                 if (!node) {
                     const vnode = renderer(item, () => index);
                     if (vnode && vnode.exec) {
                        node = vnode.exec();
                     } else {
                        // Fallback if renderer returned something else
                        // Should not happen with strict types
                     }
                 }

                 if (node) {
                     if (!newRenderedItems.has(key)) newRenderedItems.set(key, []);
                     newRenderedItems.get(key)!.push(node);

                     if (node !== currentDomNode) {
                         container.insertBefore(node, currentDomNode);
                     } else {
                         currentDomNode = currentDomNode.nextSibling;
                     }
                 }
            });

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

    return containerVNode;
};
