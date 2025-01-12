/* eslint-disable @typescript-eslint/no-explicit-any */
export const logger = {
  debug: (...args: any[]) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(...args);
    }
  },
  error: (...args: any[]) => {
    // エラーは本番環境でも表示したい
    console.error(...args);
  },
};
