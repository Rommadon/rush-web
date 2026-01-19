import React from 'react';

class Robots extends React.Component {
  // @ts-ignore
  public static async getInitialProps({ res, req }) {
    const BASE_URL = req.headers.host;

    res.setHeader('Content-Type', 'text/plain');
    // Return a non-crawlable robots.txt in non-production environments
    res.write(process.env.NODE_ENV === "production"
      ? `User-agent: *\nAllow: /\nSitemap: https://${BASE_URL}/sitemap.xml`
      : `User-agent: *\nDisallow: /\nSitemap: https://${BASE_URL}/sitemap.xml`
    );
    res.end();
  }
}

export default Robots;