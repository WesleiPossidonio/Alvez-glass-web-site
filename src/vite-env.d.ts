/// <reference types="vite/client" />

declare module "*&as=srcset" {
  const src: {
    src: string;
    srcset: string;
    images: {
      src: string;
      width: number;
      height: number;
      format: string;
    }[];
  };
  export default src;
}

declare module "*?*" {
  const src: never;
  export default src;
}
