// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { Route, navigate } from './router';
import { h, mount } from './dom';

describe('Router', () => {
    it('should render correct route', async () => {
        const root = document.createElement('div');
        document.body.appendChild(root);

        const Home = () => h('div', { id: 'home' }, 'Home Page');
        const About = () => h('div', { id: 'about' }, 'About Page');

        const App = () => h('div', null,
            h(Route, { path: '/', component: Home }),
            h(Route, { path: '/about', component: About })
        );

        mount(App, root);

        // Initial path is / (jsdom default)
        expect(root.querySelector('#home')).not.toBeNull();
        expect(root.querySelector('#about')).toBeNull();

        // Navigate
        navigate('/about');

        // Wait for effect? Effects are synchronous in our implementation currently (executed immediately)
        expect(root.querySelector('#home')).toBeNull();
        expect(root.querySelector('#about')).not.toBeNull();
    });
});
