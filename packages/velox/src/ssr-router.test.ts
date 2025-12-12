import { describe, it, expect, beforeEach } from 'vitest';
import { hSSR, resetHydrationId } from './ssr';
import { Router, Route, configureRouter } from './router';

describe('SSR Router', () => {
    beforeEach(() => {
        resetHydrationId();
    });

    it('should render Route directly', () => {
        configureRouter('/');
        const Home = () => hSSR('div', null, 'Home');
        const r = hSSR(Route, { path: '/', component: Home });
        expect(r.exec().toString()).toContain('Home');
    });

    it('should render correct route on server', () => {
        configureRouter('/about');

        const Home = () => hSSR('div', null, 'Home');
        const About = () => hSSR('div', null, 'About');

        const App = () => hSSR(Router, null,
            hSSR(Route, { path: '/', component: Home }),
            hSSR(Route, { path: '/about', component: About })
        );

        const html = App().exec().toString();

        expect(html).toContain('About');
    });
});
