import { createMDX } from "fumadocs-mdx/next";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url, { interopDefault: true, moduleCache: false });
const { docs, blog } = jiti("./source.config.ts");

const withMDX = createMDX({
  collections: { docs, blog },
});

const NEW_SITE = "https://casbin.apache.org";

const renamedDocs = {
  "index": "overview",
  "tutorial": "tutorials",
  "casbin-rbac-and-rbac96": "rbac-96",
  "super-admin": "superadmin",
  "role-manager-api": "rolemanager-api",
  "frontend-usage": "frontend",
  "envoy-authz": "envoy",
  "k8s-authz": "k8s-gatekeeper",
  "k8s-gate-keeper": "k8s-gatekeeper",
  "model/rbac": "rbac-overview",
  "model/mac": "mac-overview",
  "api": "api-overview",
  "category/the-basics": "category/basics",
  "category/basics": "category/basics",
  "category/model": "category/access-control-models",
  "category/storage": "category/storage",
  "category/scenarios": "category/use-cases",
  "category/plugins": "plugins-overview",
  "category/api": "category/api",
  "category/advanced-usage": "category/advanced-usage",
  "category/management": "category/management",
  "category/editor": "category/editors--tools",
  "category/more": "category/about--more",
};

const blogPosts = {
  "2018-08-07-launching-casbin-server": "2018/08/07/launching-casbin-server",
  "2018-08-27-node-casbin": "2018/08/27/node-casbin",
  "2018-09-23-new-website": "2018/09/23/new-website",
  "2020-04-21-google-award": "2020/04/21/google-award",
  "2021-08-19-apisix-casbin-authorization": "2021/08/19/apisix-casbin-authorization",
  "2023-12-08-understanding-casbin-matching-in-detail": "2023/12/08/understanding-casbin-matching-in-detail",
  "2025-12-11-casbin-2025-ai-agent-era": "casbin-2025-ai-agent-era",
  "2026-02-01-upgrading-casbin-go-v2-to-v3": "upgrading-casbin-go-v2-to-v3",
};

const movedRedirects = [
  ...Object.entries(renamedDocs).map(([from, to]) => ({ source: `/docs/${from}`, destination: `${NEW_SITE}/docs/${to}/` })),
  { source: "/docs", destination: `${NEW_SITE}/docs/overview/` },
  { source: "/docs/:slug", destination: `${NEW_SITE}/docs/:slug/` },
  ...Object.entries(blogPosts).map(([from, to]) => ({ source: `/blog/${from}`, destination: `${NEW_SITE}/blog/${to}/` })),
  { source: "/blog/:path*", destination: `${NEW_SITE}/blog/` },
  { source: "/user", destination: `${NEW_SITE}/users/` },
  { source: "/:page(ecosystem|editor|gallery|help)", destination: `${NEW_SITE}/:page/` },
  { source: "/robots.txt", destination: `${NEW_SITE}/robots.txt` },
  { source: "/llms-full.txt", destination: `${NEW_SITE}/llms.txt` },
  { source: "/llms.mdx/:path*", destination: `${NEW_SITE}/llms.txt` },
  { source: "/:path*", destination: `${NEW_SITE}/` },
].map((r) => ({ ...r, permanent: true }));

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return movedRedirects;
  },
  // i18n: {
  //   locales: ['en', 'zh', 'ja', 'ko', 'fr', 'de', 'es', 'ru', 'ar', 'pt', 'it', 'tr', 'id', 'th', 'ms', 'uk', 'vi'],
  //   defaultLocale: 'en',
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.casbin.org",
      },
      {
        protocol: "https",
        hostname: "hsluoyz.github.io",
      },
      {
        protocol: "https",
        hostname: "learn.microsoft.com",
        pathname: "/**",
      },
    ],
  },
  outputFileTracingIncludes: {
    "/**/*": ["./content/**/*", "./.source/**/*"],
  },
};

export default withMDX(config);
