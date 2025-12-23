export {};

declare global {
  namespace JSX {
    interface Element extends Node {}
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
