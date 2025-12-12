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
        const r = hSSR(Route as any, { path: '/', component: Home });
        expect(r.exec().toString()).toContain('Home');
    });

    it('should render correct route on server', () => {
        configureRouter('/about');

        const Home = () => hSSR('div', null, 'Home');
        const About = () => hSSR('div', null, 'About');

        const App = () => hSSR(Router as any, null,
            hSSR(Route as any, { path: '/', component: Home }),
            hSSR(Route as any, { path: '/about', component: About })
        );

        const html = App().exec().toString();

        // Check presence
        expect(html).toContain('About');
        expect(html).not.toContain('>Home<');

        // Check IDs (nested structure implies 0.0.0 if routed correctly)
        // Router (0) -> Route (0.0) -> About (0.0.0) -> div (0.0.0.0)?
        // Wait. Route returns hSSR('div').
        // Router returns Fragment. Fragment returns children.
        // Router (0). Fragment (transparent).
        // Children: Route / (0.0), Route /about (0.1).
        // Route /about returns Div (0.1).
        // Div content: About (Component).
        // About executes. Div (0.1.0).

        expect(html).toContain('data-hid="0.1.0"');
    });
});
