import React from "react";
import * as fs from "fs";
const Sitemap = () => {
  return null;
};

// @ts-ignore
export const getServerSideProps = async ({ res, req, resolvedUrl }) => {
  const BASE_URL = req.headers.host;
  
  const staticPaths = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "api",
        "virtuals",
        "_app.tsx",
        "_document.tsx",
        "404.tsx",
        "500.tsx",
        "sitemap.xml.tsx",
        ".DS_Store",
        "_error.js"
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `https://${BASE_URL}/${staticPagePath.replace('index', '').replace('.tsx', '').replace('.ts', '')}`;
    });

  // const dynamicPaths = [`${BASE_URL}/product/1`, `${BASE_URL}/product/2`];
  // const allPaths = [...staticPaths, ...dynamicPaths];

  const allPaths = [...staticPaths]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
      .map((url) => {
        return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
      })
      .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;