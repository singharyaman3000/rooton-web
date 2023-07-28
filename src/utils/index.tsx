export const getAssetUrl = (url = '') => {
  const basePath = process.env.NEXT_ASSETS_BASEURL;
  console.log(basePath);
  return url.startsWith('/') || url.startsWith(process.env.NEXT_ASSETS_BASEURL as string) ? url : basePath + url;
};
