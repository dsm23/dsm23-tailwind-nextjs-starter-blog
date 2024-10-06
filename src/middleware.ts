import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const cspHeader = `
    default-src 'self';
    script-src 'self'  'unsafe-eval' 'unsafe-inline' giscus.app analytics.umami.is;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    media-src *.s3.amazonaws.com;
    connect-src *;
    font-src 'self';
    frame-src giscus.app;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  requestHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  requestHeaders.set("X-Frame-Options", "DENY");

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  requestHeaders.set("X-Content-Type-Options", "nosniff");

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  requestHeaders.set("X-DNS-Prefetch-Control", "on");

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  requestHeaders.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
  );

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  requestHeaders.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  return response;
}
