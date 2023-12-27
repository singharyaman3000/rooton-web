export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ID;

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};

export const trackClicks = () => {
  const elements = document.querySelectorAll('.trackable-element');
  elements.forEach((element) => {
    element.addEventListener('click', () => {
      // Using the 'event' function for consistency and correct parameter structure
      event({
        action: 'click',
        event_category: 'BannerButton',
        event_label: element.id || 'unknown',
      });
    });
  });
};
