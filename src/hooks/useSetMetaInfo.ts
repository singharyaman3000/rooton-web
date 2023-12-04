import { useEffect } from 'react';

const useSetMetaInfo = (title: string, description: string, canonicalUrl: string) => {
  console.log(document);

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
