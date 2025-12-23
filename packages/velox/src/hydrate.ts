import { Component, setHydrating } from './dom';
import { resetContext } from './context';

/**
 * Hydrates a server-rendered application on the client.
 */
export function hydrate(component: Component, root: HTMLElement) {
    if (import.meta.env.DEV) {
        console.log('Velox: Hydrating...');
    }

    setHydrating(true);
    resetContext();

    try {
        const vnode = component({});
        const node = vnode.exec();

        if (node.parentNode !== root) {
            // Mismatch occurred or root structure was different.
            // Fallback: Clear and mount.
            console.warn('Velox: Hydration mismatch. Falling back to client render.');
            root.textContent = '';
            root.appendChild(node);
        }
    } catch (e) {
        console.error('Velox: Hydration error', e);
        root.textContent = '';
        // Could retry rendering without hydration flag?
    } finally {
        setHydrating(false);
    }
}
