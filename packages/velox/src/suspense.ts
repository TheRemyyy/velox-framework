import { createSignal } from './reactive';
import { getContext, pushContext, popContext } from './context';
import { h, Fragment as FragmentDOM } from './dom';
import { hSSR, Fragment as FragmentSSR, SafeString } from './ssr';

const RESOURCE_CACHE = Symbol('resource_cache');

export function createResource<T>(key: string, fetcher: () => Promise<T>): [() => T | undefined] {
    const [data, setData] = createSignal<T | undefined>(undefined);

    const ctx = getContext();
    let cache = ctx.custom.get(RESOURCE_CACHE);
    if (!cache) {
        cache = new Map();
        ctx.custom.set(RESOURCE_CACHE, cache);
    }

    if (cache.has(key)) {
        setData(cache.get(key));
    } else {
        // Mark as pending in cache to avoid double fetch?
        // Or store Promise in cache?
        // For simple MVP: just fire.
        const promise = fetcher().then(val => {
            cache.set(key, val);
            setData(val);
            return val;
        });

        if (ctx.suspense) {
            ctx.suspense.add(promise);
        }
    }

    return [data];
}

export const Suspense = (props: any) => {
    const fallback = props.fallback;

    return {
        exec: () => {
            const ctx = getContext();
            const parentSuspense = ctx.suspense;
            const promises = new Set<Promise<any>>();

            pushContext({ suspense: promises });

            try {
                let result;
                if (typeof window === 'undefined') {
                    // SSR
                    const vnode = hSSR(FragmentSSR, { children: props.children });
                    result = vnode.exec();
                } else {
                    // Client
                    const vnode = h(FragmentDOM, { children: props.children });
                    result = vnode.exec();
                }

                if (promises.size > 0) {
                    // Propagate to parent for SSR Waiting
                    if (parentSuspense) {
                        promises.forEach(p => parentSuspense.add(p));
                    }

                    if (typeof window === 'undefined') {
                        // SSR Fallback
                        if (fallback) {
                             const fbVNode = hSSR(FragmentSSR, { children: fallback });
                             return fbVNode.exec();
                        }
                        return new SafeString('');
                    } else {
                        // Client Fallback
                        const fallbackVNode = h(FragmentDOM, { children: fallback });
                        const fallbackNode = fallbackVNode.exec();

                        Promise.all(promises).then(() => {
                            if (fallbackNode instanceof Node && fallbackNode.parentNode) {
                                const parent = fallbackNode.parentNode;
                                parent.replaceChild(result as Node, fallbackNode);
                            }
                        });

                        return fallbackNode;
                    }
                }

                return result;
            } finally {
                popContext();
            }
        }
    } as any;
};
