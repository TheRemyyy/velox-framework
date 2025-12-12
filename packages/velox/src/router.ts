import { createSignal, createEffect } from './reactive';
import { h, Component } from './dom';

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

export const Route: Component = (props: any) => {
    // In SSR, we can't create DOM nodes easily with this router structure without a virtual context.
    // For V1, we will gracefully degrade or return empty if not browser, or handle basic SSR if possible.
    // But since `h` is DOM-based, SSR uses `hSSR`.
    // We need to make Router universal or specific for DOM.
    // Given the architecture, this Router is for DOM Client Side.
    if (!isBrowser) return null as any;

    const { path: routePath, component } = props;

    const container = document.createElement('div');
    container.setAttribute('data-router-outlet', routePath);
    container.style.display = 'contents';

    createEffect(() => {
        const currentPath = path();
        container.textContent = ''; // clear

        if (currentPath === routePath || (routePath === '*' && !container.hasChildNodes())) {
            if (typeof component === 'function') {
                const node = component({});
                container.appendChild(node);
            }
        }
    });

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
