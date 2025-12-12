import { createSignal, createEffect } from './reactive';
import { h, Component, dispose, addNodeCleanup, Fragment } from './dom';

const isBrowser = typeof window !== 'undefined';

// Simple global router state
const [path, setPath] = createSignal(isBrowser ? window.location.pathname : '/');

// Listen to popstate
if (isBrowser) {
    window.addEventListener('popstate', () => {
        setPath(window.location.pathname);
    });
}

export const Router: Component = (props: any) => {
    return props.children;
};

export const Outlet: Component = (props: any) => {
    return h(Fragment, { children: props.children });
};

export const Route: Component = (props: any) => {
    if (!isBrowser) return null as any;

    const { path: routePath, component, exact = true, children } = props;

    const container = h('div', {
        'data-router-outlet': routePath,
        style: { display: 'contents' }
    }) as HTMLElement;

    const stop = createEffect(() => {
        const currentPath = path();

        // Clean up previous children
        container.childNodes.forEach(child => dispose(child));
        container.textContent = '';

        const match = matchRoute(routePath, currentPath, exact);

        if (match) {
            if (typeof component === 'function') {
                // Pass children (sub-routes) to the component so it can render them (via Outlet or props.children)
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
            setPath(to);
        }
    };

    return h('a', { href: to, onClick, ...rest }, children);
};

// Helper for programmatic navigation
export function navigate(to: string) {
    if (isBrowser) {
        window.history.pushState({}, '', to);
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
