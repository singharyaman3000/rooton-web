export const getAssetUrl = (url = '') => {
  const basePath = process.env.NEXT_ASSETS_BASEURL;
  return url.startsWith('/') ? url : basePath + url;
};
