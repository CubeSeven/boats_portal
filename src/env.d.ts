/// <reference path="../.astro/types.d.ts" />

// Type declarations for modules without bundled types
declare module 'glightbox' {
  interface GLightboxOptions {
    selector?: string;
    [key: string]: any;
  }
  interface GLightboxInstance {
    destroy(): void;
    init(): void;
    [key: string]: any;
  }
  function GLightbox(options?: GLightboxOptions): GLightboxInstance;
  export default GLightbox;
  export { GLightboxOptions, GLightboxInstance };
}
