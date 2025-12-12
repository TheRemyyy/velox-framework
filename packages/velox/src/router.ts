import { createSignal, createEffect, Getter, Setter } from './reactive';
import { h, Component, dispose, addNodeCleanup, Fragment, VNode } from './dom';
import { hSSR, Fragment as FragmentSSR } from './ssr';
import { getContext, pushContext, popContext } from './context';

const isBrowser = typeof window !== 'undefined';

let pathSignal: [Getter<string>, Setter<string>] | null = null;

function getPathSignal(): [Getter<string>, Setter<string>] {
    if (!pathSignal) {
        const initial = isBrowser ? window.location.pathname : '/';
        pathSignal = createSignal(initial);
    }
    return pathSignal;
}

export function configureRouter(url: string) {
    const [_, setPath] = getPathSignal();
    setPath(url);
}

if (isBrowser) {
    window.addEventListener('popstate', () => {
        const [_, setPath] = getPathSignal();
        setPath(window.location.pathname);
    });
}

export const Router: Component = (props: any) => {
    if (props.url) {
        configureRouter(props.url);
    }
    if (!isBrowser) {
        return hSSR(FragmentSSR, { children: props.children }) as any;
    }
    return h(Fragment, { children: props.children });
};

export const Outlet: Component = (props: any) => {
    if (!isBrowser) {
        return hSSR(FragmentSSR, { children: props.children }) as any;
    }
    return h(Fragment, { children: props.children });
};

export const Route: Component = (props: any) => {
    const { path: routePath, component, exact = true, children } = props;
    const [getPath] = getPathSignal();

    const ctx = getContext();
    const parentBase = ctx.routerBase;

    const fullPath = resolvePath(parentBase, routePath);

    if (!isBrowser) {
        const currentPath = getPath();
        const match = matchRoute(fullPath, currentPath, exact);

        let content: any = null;
        if (match && typeof component === 'function') {
             const matchedUrl = match.url || fullPath;
             const wrappedChildren = wrapChildren(children, matchedUrl);

             content = hSSR(component, { params: match.params, children: wrappedChildren });
        }

        return hSSR('div', {
            'data-router-outlet': routePath,
            style: { display: 'contents' }
        }, content) as any;
    }

    // Client
    const container = h('div', {
        'data-router-outlet': routePath,
        style: { display: 'contents' }
    }) as any as VNode;

    const originalExec = container.exec;
    container.exec = () => {
        const el = originalExec();
        const stop = createEffect(() => {
            const currentPath = getPath();

            el.childNodes.forEach((child: Node) => dispose(child));
            el.textContent = '';

            const match = matchRoute(fullPath, currentPath, exact);

            if (match) {
                if (typeof component === 'function') {
                    const matchedUrl = match.url;

                    const wrappedChildren = wrapChildren(children, matchedUrl);

                    const nodeVNode = component({ params: match.params, children: wrappedChildren });
                    const node = nodeVNode.exec();
                    el.appendChild(node);
                }
            }
        });
        addNodeCleanup(el, stop);
        return el;
    };

    return container;
};

export const Link: Component = (props: any) => {
    const { to, children, ...rest } = props;
    const ctx = getContext();
    const base = ctx.routerBase;
    const fullTo = resolvePath(base, to);

    const onClick = (e: MouseEvent) => {
        e.preventDefault();
        if (isBrowser) {
            window.history.pushState({}, '', fullTo);
            const [_, setPath] = getPathSignal();
            setPath(fullTo);
        }
    };

    if (!isBrowser) {
        return hSSR('a', { href: fullTo, ...rest }, children) as any;
    }

    return h('a', { href: fullTo, onClick, ...rest }, children);
};

export function navigate(to: string) {
    if (isBrowser) {
        window.history.pushState({}, '', to);
        const [_, setPath] = getPathSignal();
        setPath(to);
    }
}

function resolvePath(base: string, path: string) {
    if (path.startsWith('/')) return path;
    const cleanBase = base === '/' ? '' : base;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${cleanBase}/${cleanPath}`;
}

function wrapChildren(children: any[], newBase: string) {
    return children.map((child: any) => {
         if (child && child.exec) {
             return {
                 exec: () => {
                     pushContext({ routerBase: newBase });
                     const n = child.exec();
                     popContext();
                     return n;
                 }
             };
         }
         return child;
    });
}

function matchRoute(routePath: string, currentPath: string, exact: boolean) {
    if (routePath === '*') return { params: {}, url: currentPath };

    const routeSegments = routePath.split('/').filter(Boolean);
    const pathSegments = currentPath.split('/').filter(Boolean);

    if (exact && routeSegments.length !== pathSegments.length) return null;
    if (!exact && pathSegments.length < routeSegments.length) return null;

    const params: Record<string, string> = {};
    let matchedUrl = '';

    for (let i = 0; i < routeSegments.length; i++) {
        const routeSeg = routeSegments[i];
        const pathSeg = pathSegments[i];

        if (routeSeg.startsWith(':')) {
            params[routeSeg.slice(1)] = pathSeg;
        } else if (routeSeg !== pathSeg) {
            return null;
        }
    }

    matchedUrl = '/' + pathSegments.slice(0, routeSegments.length).join('/');

    return { params, url: matchedUrl };
}
