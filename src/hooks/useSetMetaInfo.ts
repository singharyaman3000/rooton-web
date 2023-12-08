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

      // to be removed in production
      const noBotsMetaTag = document.querySelector('meta[name="robots"]');
      if (!noBotsMetaTag && process.env.NEXT_APP_ENVIRONMENT !== 'production') {
        const newNoBotsMetaTag = document.createElement('meta');
        newNoBotsMetaTag.name = 'robots';
        newNoBotsMetaTag.content = 'noindex';
        document.head.appendChild(newNoBotsMetaTag);
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
