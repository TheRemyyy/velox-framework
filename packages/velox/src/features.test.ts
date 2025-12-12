// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { createSignal, createEffect, batch } from './reactive';
import { Route, navigate } from './router';
import { h, mount } from './dom';
import { For } from './flow';

describe('Advanced Features', () => {
    describe('Batching', () => {
         it('should batch updates', () => {
            const [count, setCount] = createSignal(0);
            const [text, setText] = createSignal('a');
            const spy = vi.fn();

            createEffect(() => {
                spy(count(), text());
            });

            expect(spy).toHaveBeenCalledTimes(1);

            batch(() => {
                setCount(1);
                setText('b');
            });

            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenLastCalledWith(1, 'b');
        });

        it('should handle nested batches', () => {
            const [count, setCount] = createSignal(0);
            const spy = vi.fn();
            createEffect(() => spy(count()));
            expect(spy).toHaveBeenCalledTimes(1);

            batch(() => {
                setCount(1);
                batch(() => {
                    setCount(2);
                });
                setCount(3);
            });

            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenLastCalledWith(3);
        });
    });

    describe('Nested Router', () => {
        it('should render nested routes with exact=false', () => {
            const root = document.createElement('div');
            const Layout = (props: any) => h('div', { id: 'layout' }, 'Layout', props.children);
            const Child = () => h('div', { id: 'child' }, 'Child');

            const App = () => h('div', null,
                h(Route, { path: '/user', component: Layout, exact: false },
                    h(Route, { path: '/user/profile', component: Child })
                )
            );

            mount(App, root);

            navigate('/user/profile');
            expect(root.querySelector('#layout')).not.toBeNull();
            expect(root.querySelector('#child')).not.toBeNull();

            navigate('/user');
            expect(root.querySelector('#layout')).not.toBeNull();
            expect(root.querySelector('#child')).toBeNull();
        });
    });

    describe('For Component', () => {
        it('should render list and handle updates', () => {
            const root = document.createElement('div');
            const [list, setList] = createSignal([1, 2, 3]);

            const App = () => h(For, { each: list }, (item: number) => h('span', null, item));

            mount(App, root);
            const wrapper = root.firstElementChild!;
            expect(wrapper.innerHTML).toBe('<span>1</span><span>2</span><span>3</span>');

            setList([1, 3, 2]);
            expect(wrapper.innerHTML).toBe('<span>1</span><span>3</span><span>2</span>');

            setList([1, 2]);
            expect(wrapper.innerHTML).toBe('<span>1</span><span>2</span>');
        });

        it('should handle duplicate primitives with keyed fallback logic', () => {
            const root = document.createElement('div');
            const [list, setList] = createSignal([1, 1]);

            const App = () => h(For, { each: list }, (item: number) => h('span', null, item));

            mount(App, root);
            const wrapper = root.firstElementChild!;
            expect(wrapper.innerHTML).toBe('<span>1</span><span>1</span>');

            setList([1]);
            expect(wrapper.innerHTML).toBe('<span>1</span>');
        });

        it('should support custom key function', () => {
             const root = document.createElement('div');
             const [list, setList] = createSignal([{id: 1, val: 'A'}, {id: 2, val: 'B'}]);

             const App = () => h(For, {
                 each: list,
                 key: (item: any) => item.id
             }, (item: any) => h('span', null, item.val));

             mount(App, root);
             const wrapper = root.firstElementChild!;
             expect(wrapper.innerHTML).toBe('<span>A</span><span>B</span>');

             const newObj = {id: 1, val: 'C'};
             setList([newObj, {id: 2, val: 'B'}]);

             // Expect reuse of first node -> 'A'
             expect(wrapper.innerHTML).toBe('<span>A</span><span>B</span>');
        });
    });
});
