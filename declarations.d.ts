/// <reference types="vite/client" />

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare namespace NodeJS {
  interface ProcessEnv {
    GEMINI_API_KEY?: string;
    [key: string]: string | undefined;
  }
}