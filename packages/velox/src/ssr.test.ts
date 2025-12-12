import { describe, it, expect } from 'vitest';
import { hSSR } from './ssr';
import { createSignal } from './reactive';

describe('SSR Renderer', () => {
    it('should render a simple element to string', () => {
        const html = hSSR('div', { id: 'test', className: 'foo' }, 'Hello');
        expect(html.toString()).toBe('<div id="test" class="foo">Hello</div>');
    });

    it('should handle void elements', () => {
        const html = hSSR('img', { src: 'test.jpg' });
        expect(html.toString()).toBe('<img src="test.jpg" />');
    });

    it('should escape HTML content', () => {
        const html = hSSR('div', null, '<script>alert(1)</script>');
        expect(html.toString()).toBe('<div>&lt;script&gt;alert(1)&lt;/script&gt;</div>');
    });

    it('should render nested components', () => {
        const Child = () => hSSR('span', null, 'Child');
        const Parent = () => hSSR('div', null, hSSR(Child, null));

        expect(Parent().toString()).toBe('<div><span>Child</span></div>');
    });

    it('should render signals', () => {
        const [count] = createSignal(10);
        const html = hSSR('div', null, count);
        expect(html.toString()).toBe('<div>10</div>');
    });

    it('should handle boolean attributes', () => {
         const html = hSSR('input', { disabled: true, readonly: false });
         expect(html.toString()).toBe('<input disabled />');
    });
});
