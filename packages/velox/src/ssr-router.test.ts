import { describe, it, expect, beforeEach } from 'vitest';
import { hSSR, resetHydrationId } from './ssr';
import { Router, Route, configureRouter } from './router';

describe('SSR Router', () => {
    beforeEach(() => {
        resetHydrationId();
    });

    it('should render correct route on server', () => {
        // Setup request context
        configureRouter('/about');

        const Home = () => hSSR('div', null, 'Home');
        const About = () => hSSR('div', null, 'About');

        const App = () => hSSR(Router, null,
            hSSR(Route, { path: '/', component: Home }),
            hSSR(Route, { path: '/about', component: About })
        );

        const html = App().toString();

        // Check presence
        expect(html).toContain('About');
        expect(html).not.toContain('>Home<');

        // Check IDs
        // IDs depend on order.
        // Route / runs. Div ID 1. Match? No. Content empty.
        // Route /about runs. Div ID 2. Match? Yes. Content:
        //   About() -> Div ID 3.

        expect(html).toContain('data-hid="3"');
    });
});
