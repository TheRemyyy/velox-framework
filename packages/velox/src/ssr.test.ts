import { describe, it, expect, beforeEach } from 'vitest';
import { hSSR, resetHydrationId } from './ssr';
import { createSignal } from './reactive';

describe('SSR Renderer', () => {
    beforeEach(() => {
        resetHydrationId();
    });

    it('should render a simple element to string', () => {
        const html = hSSR('div', { id: 'test', className: 'foo' }, 'Hello');
        // Root is 0
        expect(html.exec().toString()).toBe('<div data-hid="0" id="test" class="foo">Hello</div>');
    });

    it('should handle void elements', () => {
        const html = hSSR('img', { src: 'test.jpg' });
        expect(html.exec().toString()).toBe('<img data-hid="0" src="test.jpg" />');
    });

    it('should escape HTML content', () => {
        const html = hSSR('div', null, '<script>alert(1)</script>');
        expect(html.exec().toString()).toBe('<div data-hid="0">&lt;script&gt;alert(1)&lt;/script&gt;</div>');
    });

    it('should render nested components', () => {
        const Child = () => hSSR('span', null, 'Child');
        const Parent = () => hSSR('div', null, hSSR(Child, null));

        // Parent 0
        // Child 0.0
        expect(Parent().exec().toString()).toBe('<div data-hid="0"><span data-hid="0.0">Child</span></div>');
    });

    it('should render signals', () => {
        const [count] = createSignal(10);
        const html = hSSR('div', null, count);
        expect(html.exec().toString()).toBe('<div data-hid="0">10</div>');
    });

    it('should handle boolean attributes', () => {
         const html = hSSR('input', { disabled: true, readonly: false });
         expect(html.exec().toString()).toBe('<input data-hid="0" disabled />');
    });
});
