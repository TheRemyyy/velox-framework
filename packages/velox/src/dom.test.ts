// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { h, VNode } from './dom';
import { createSignal } from './reactive';

describe('DOM Renderer', () => {
    it('should render a simple element', () => {
        const div = (h('div', { id: 'test', className: 'foo' }, 'Hello') as VNode).exec() as HTMLDivElement;
        expect(div instanceof HTMLDivElement).toBe(true);
        expect((div as HTMLDivElement).id).toBe('test');
        expect((div as HTMLDivElement).className).toBe('foo');
        expect(div.textContent).toBe('Hello');
    });

    it('should handle click events', () => {
        const handler = vi.fn();
        const btn = (h('button', { onClick: handler }, 'Click me') as VNode).exec() as HTMLButtonElement;
        (btn as HTMLButtonElement).click();
        expect(handler).toHaveBeenCalled();
    });

    it('should react to signal changes in text content', () => {
        const [count, setCount] = createSignal(0);
        const div = (h('div', null, count) as VNode).exec() as HTMLDivElement;

        expect(div.textContent).toBe('0');

        setCount(1);
        expect(div.textContent).toBe('1');
    });

    it('should react to signal changes in attributes', () => {
        const [active, setActive] = createSignal(false);
        const div = (h('div', { 'data-active': active }, 'Toggle') as VNode).exec() as HTMLDivElement;

        expect((div as HTMLDivElement).getAttribute('data-active')).toBe('false');

        setActive(true);
        expect((div as HTMLDivElement).getAttribute('data-active')).toBe('true');
    });

    it('should render functional components', () => {
        const Component = (props: any) => h('span', null, props.text);
        const div = (h('div', null, h(Component, { text: 'World' })) as VNode).exec() as HTMLDivElement;

        expect((div as HTMLDivElement).innerHTML).toBe('<span>World</span>');
    });
});
