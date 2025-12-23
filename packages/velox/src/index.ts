/// <reference path="./vite-env.d.ts" />
export { createSignal, createEffect, createMemo, onCleanup, batch } from './reactive';
export { h, mount, Fragment } from './dom';
export { hydrate } from './hydrate';
export { Router, Route, Link, Outlet, navigate, configureRouter } from './router';
export { For } from './flow';
export { createContext, useContext } from './context-api';
export { createResource, Suspense } from './suspense';
/// <reference path="./types.d.ts" />
export { renderToString, renderToStringAsync, hSSR, resetHydrationId } from './ssr';

declare global {
    namespace JSX {
        interface Element extends Node { }
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}
