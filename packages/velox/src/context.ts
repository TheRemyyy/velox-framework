export interface RenderContext {
    hydrationPath: string;
    routerBase: string;
}

// Initial context
let contextStack: RenderContext[] = [{ hydrationPath: '0', routerBase: '' }];

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
    contextStack = [{ hydrationPath: '0', routerBase: '' }];
}
