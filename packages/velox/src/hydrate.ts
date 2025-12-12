import { Component, setHydrating, resetHydrationId } from './dom';

/**
 * Hydrates a server-rendered application on the client.
 */
export function hydrate(component: Component, root: HTMLElement) {
    if (import.meta.env.DEV) {
        console.log('Velox: Hydrating...');
    }

    setHydrating(true);
    resetHydrationId();

    try {
        const node = component({});

        // If the returned node is not already in the root (mismatch or new node),
        // we append it. If it was hydrated, it's already there.
        // But wait, if it was hydrated, `h` returned the existing node.
        // The existing node is a child of `root` (usually).
        // If `h` returns it, `node.parentNode` should be `root`.

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
