export interface RenderContext {
    hydrationPath: string;
    routerBase: string;
    custom: Map<any, any>;
}

// Initial context
let contextStack: RenderContext[] = [{
    hydrationPath: '0',
    routerBase: '',
    custom: new Map()
}];

export function pushContext(ctx: Partial<RenderContext>) {
    const parent = contextStack[contextStack.length - 1];
    contextStack.push({ ...parent, ...ctx });
}

export function popContext() {
    contextStack.pop();
}

export function getContext() {
    return contextStack[contextStack.length - 1];
}

export function resetContext() {
    contextStack = [{
        hydrationPath: '0',
        routerBase: '',
        custom: new Map()
    }];
}
