/* eslint-disable no-lonely-if */

'use client';

import { useEffect } from 'react';

const useSetMetaInfo = (title: string, description: string, canonicalUrl: string) => {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      const metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', description);
      } else {
        const newMetaTag = document.createElement('meta');
        newMetaTag.name = 'description';
        newMetaTag.content = description;
        document.head.appendChild(newMetaTag);
      }

      const robotsMetaTag = document.querySelector('meta[name="robots"]');

      if (process.env.NEXT_APP_ENVIRONMENT === 'production') {
        // In production, ensure the meta tag exists and is set for indexing
        if (!robotsMetaTag) {
          // If the tag doesn't exist, create it and append it to the head
          const newRobotsMetaTag = document.createElement('meta');
          newRobotsMetaTag.name = 'robots';
          newRobotsMetaTag.content = 'index';
          document.head.appendChild(newRobotsMetaTag);
        }
      } else {
        // Not in production, ensure the site is not indexed
        if (!robotsMetaTag) {
          // If the tag doesn't exist, create it with 'noindex'
          const newNoBotsMetaTag = document.createElement('meta');
          newNoBotsMetaTag.name = 'robots';
          newNoBotsMetaTag.content = 'noindex';
          document.head.appendChild(newNoBotsMetaTag);
        }
      }
    }
    if (canonicalUrl) {
      const canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag) {
        canonicalTag.setAttribute('href', canonicalUrl);
      } else {
        const newCanonicalTag = document.createElement('link');
        newCanonicalTag.rel = 'canonical';
        newCanonicalTag.href = canonicalUrl;
        document.head.appendChild(newCanonicalTag);
      }
    }
  }, [title, description, canonicalUrl]);
};

export default useSetMetaInfo;
