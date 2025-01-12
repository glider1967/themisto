import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  frame-src 'self' *.nicovideo.jp;
  script-src 'self' 'unsafe-inline' 'unsafe-eval' *.nicovideo.jp;
  img-src 'self' *.nicovideo.jp data:;
  media-src 'self' *.nicovideo.jp;
  connect-src 'self' *.nicovideo.jp;
`;

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\s{2,}/g, " ").trim(),
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer-when-cross-origin",
          },
        ],
      },
    ];
  },
};

// module.exports = nextConfig;
