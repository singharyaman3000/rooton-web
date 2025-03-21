export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ID;

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const trackEvent = ({ action, category, label }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
  });
};
