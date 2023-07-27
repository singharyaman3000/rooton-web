export const getAssetUrl = (url = '') => {
    const basePath = process.env.NEXT_ASSETS_BASEURL;
    console.log(basePath + url , url)
    return url.startsWith('/') ? url : basePath + url;
  };
  