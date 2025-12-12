import { createEffect } from './reactive';

export type Component = (props: any) => Node;

// Basic Types
type Props = Record<string, any>;

/**
 * Creates a DOM element or component.
 * @param tag The tag name (string) or component function.
 * @param props The attributes/props.
 * @param children The children nodes.
 * @returns A DOM Node or Fragment.
 */
export function h(tag: string | Component, props: Props | null, ...children: any[]): Node {
  props = props || {};
  const normalizedChildren = children.flat().filter(c => c != null && c !== true && c !== false);

  // If it's a component function, call it.
  if (typeof tag === 'function') {
    return tag({ ...props, children: normalizedChildren });
  }

  // It's a native DOM element
  const element = document.createElement(tag);

  // Handle props
  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.toLowerCase().substring(2);
      element.addEventListener(eventName, value);
    } else {
      // Reactivity support for attributes
      if (typeof value === 'function') {
        createEffect(() => {
            const newValue = value();
            setAttribute(element, key, newValue);
        });
      } else {
        setAttribute(element, key, value);
      }
    }
  }

  // Handle children
  normalizedChildren.forEach(child => {
      appendChild(element, child);
  });

  return element;
}

function setAttribute(element: HTMLElement, key: string, value: any) {
    if (value === null || value === undefined) {
        element.removeAttribute(key);
    } else if (key === 'className') {
        element.className = value;
    } else if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
    } else {
        element.setAttribute(key, String(value));
    }
}

function appendChild(parent: Node, child: any) {
    if (typeof child === 'function') {
        // It's a signal or computed value -> Dynamic Text Node
        let currentTextNode: Text | null = null;
        createEffect(() => {
            const newValue = child();
            const textContent = String(newValue ?? '');

            if (!currentTextNode) {
                currentTextNode = document.createTextNode(textContent);
                parent.appendChild(currentTextNode);
            } else {
                currentTextNode.data = textContent;
            }
        });
    } else if (child instanceof Node) {
        parent.appendChild(child);
    } else {
        // String or Number
        parent.appendChild(document.createTextNode(String(child)));
    }
}

/**
 * Mounts a component to a root element.
 * @param component The component to mount.
 * @param root The DOM element to mount into.
 */
export function mount(component: () => Node, root: HTMLElement) {
    root.textContent = '';
    const node = component();
    root.appendChild(node);
}

// Fragment support (basic)
export const Fragment: Component = (props) => {
    // This is tricky because pure DOM API doesn't support "rendering" a fragment to a variable easily that holds reactivity without a parent.
    // For now, let's treat it as returning an array of nodes if we could, but our signature says Node.
    // A DocumentFragment is the closest thing.
    const fragment = document.createDocumentFragment();
    (props.children || []).forEach((child: any) => appendChild(fragment, child));
    return fragment;
}
