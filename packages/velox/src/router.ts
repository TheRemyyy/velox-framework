import { createSignal, createEffect, Getter, Setter } from './reactive';
import { h, Component, dispose, addNodeCleanup, Fragment } from './dom';
import { hSSR, SafeString } from './ssr';

const isBrowser = typeof window !== 'undefined';

// Global router state
let pathSignal: [Getter<string>, Setter<string>] | null = null;

function getPathSignal(): [Getter<string>, Setter<string>] {
    if (!pathSignal) {
        const initial = isBrowser ? window.location.pathname : '/';
        pathSignal = createSignal(initial);
    }
    return pathSignal;
}

// Export for SSR setup
export function configureRouter(url: string) {
    const [_, setPath] = getPathSignal();
    setPath(url);
}

// Listen to popstate
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
    return props.children;
};

export const Outlet: Component = (props: any) => {
    if (!isBrowser) {
        return hSSR(Fragment, { children: props.children }) as any;
    }
    return h(Fragment, { children: props.children });
};

export const Route: Component = (props: any) => {
    const { path: routePath, component, exact = true, children } = props;
    const [getPath] = getPathSignal();

    if (!isBrowser) {
        // SSR Implementation
        const currentPath = getPath();
        const match = matchRoute(routePath, currentPath, exact);

        let content: any = null;
        if (match && typeof component === 'function') {
             content = hSSR(component, { params: match.params, children });
        }

        // Wrap in container to match Client structure
        return hSSR('div', {
            'data-router-outlet': routePath,
            style: { display: 'contents' }
        }, content) as any;
    }

    // Client Implementation
    const container = h('div', {
        'data-router-outlet': routePath,
        style: { display: 'contents' }
    }) as HTMLElement;

    const stop = createEffect(() => {
        const currentPath = getPath();

        // Clean up previous children
        container.childNodes.forEach(child => dispose(child));
        container.textContent = '';

        const match = matchRoute(routePath, currentPath, exact);

        if (match) {
            if (typeof component === 'function') {
                const node = component({ params: match.params, children });
                container.appendChild(node);
            }
        }
    });

    addNodeCleanup(container, stop);

    return container;
};

export const Link: Component = (props: any) => {
    const { to, children, ...rest } = props;

    const onClick = (e: MouseEvent) => {
        e.preventDefault();
        if (isBrowser) {
            window.history.pushState({}, '', to);
            const [_, setPath] = getPathSignal();
            setPath(to);
        }
    };

    if (!isBrowser) {
        return hSSR('a', { href: to, ...rest }, children) as any;
    }

    return h('a', { href: to, onClick, ...rest }, children);
};

export function navigate(to: string) {
    if (isBrowser) {
        window.history.pushState({}, '', to);
        const [_, setPath] = getPathSignal();
        setPath(to);
    }
}

function matchRoute(routePath: string, currentPath: string, exact: boolean) {
    if (routePath === '*') return { params: {} };

    const routeSegments = routePath.split('/').filter(Boolean);
    const pathSegments = currentPath.split('/').filter(Boolean);

    if (exact && routeSegments.length !== pathSegments.length) return null;
    if (!exact && pathSegments.length < routeSegments.length) return null;

    const params: Record<string, string> = {};
    for (let i = 0; i < routeSegments.length; i++) {
        const routeSeg = routeSegments[i];
        const pathSeg = pathSegments[i];

        if (routeSeg.startsWith(':')) {
            params[routeSeg.slice(1)] = pathSeg;
        } else if (routeSeg !== pathSeg) {
            return null;
        }
    }
    return { params };
}
