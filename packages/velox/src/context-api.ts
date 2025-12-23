import { h, Fragment as FragmentDOM, Component } from './dom';
import { hSSR, Fragment as FragmentSSR } from './ssr';
import { getContext, pushContext, popContext } from './context';

export interface Context<T> {
    id: symbol;
    defaultValue: T;
    Provider: Component;
}

export function createContext<T>(defaultValue: T): Context<T> {
    const id = Symbol('context');

    const Provider: Component = (props: any) => {
        return {
            exec: () => {
                const ctx = getContext();
                const newCustom = new Map(ctx.custom);
                newCustom.set(id, props.value);

                pushContext({ custom: newCustom });

                try {
                    if (typeof window === 'undefined') {
                        // SSR - Delegate to FragmentSSR logic
                        // hSSR handles array normalization etc.
                        const vnode = hSSR(FragmentSSR, { children: props.children });
                        return vnode.exec();
                    } else {
                        // Client - Delegate to FragmentDOM logic
                        // h handles VNode/Signal/Text logic
                        const vnode = h(FragmentDOM, { children: props.children });
                        return vnode.exec();
                    }
                } finally {
                    popContext();
                }
            }
        } as any;
    };

    return { id, defaultValue, Provider };
}

export function useContext<T>(context: Context<T>): T {
    const ctx = getContext();
    if (ctx.custom.has(context.id)) {
        return ctx.custom.get(context.id);
    }
    return context.defaultValue;
}
