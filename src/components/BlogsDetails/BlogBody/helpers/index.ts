/* eslint-disable no-loop-func */
const REGEX = {
  YOUTUBE: /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
  IMG_TAG: /<img[^>]*src="([^"]+)"[^>]*>/,
  OEMBED_TAG: /<oembed[^>]*url="([^"]+)"[^>]*>/,
};

function getYoutubeVideoId(url: string) {
  const regExp = REGEX.YOUTUBE;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : '';
}

function getObjectTagContent(result: string[]) {
  const videoId = getYoutubeVideoId(result[1]);
  const videoUrl = videoId ? `https://www.youtube.com/v/${videoId}` : result[1];
  return `
         <object width="100%" height="344" style="margin: 10px 0;">
              <param name="movie" value="${videoUrl}"></param>
              <param name="allowFullScreen" value="true"></param>
              <param name="allowscriptaccess" value="always"></param>
              <embed src="${videoUrl}" type="video/*" width="100%" height="344"
                   allowscriptaccess="always" allowfullscreen="true">
              </embed>
         </object>`;
}

function getIframeContent(result: string[]) {
  const url = result[1].includes('facebook')
    ? `https://www.facebook.com/plugins/video.php?href=${result[1]}&show_text=0`
    : result[1];
  return `
         <iframe
              class="${result[1].includes('facebook') ? 'facebook-iframe' : 'spotify-iframe'}"
              src="${url}" id="frame-${url}"
              style="border:none" 
              scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true">
         </iframe>`;
}

function htmlEnhancer(content: string, type: string) {
  const indices: number[] = [];
  const regex = type === 'image' ? REGEX.IMG_TAG : REGEX.OEMBED_TAG;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = { index: 0 };
  let contentCopy = content;
  result = regex.exec(content);
  let currentInd = 0;
  let currentLength = 0;

  // eslint-disable-next-line no-cond-assign
  while ((result = regex.exec(content.slice(currentLength))) && content.length > currentLength) {
    if (
      !indices.find((item: number) => {
        return item === result.index;
      })
    ) {
      indices.push(currentLength + result.index);
      currentInd = result.index;
      let replacer = '';
      let prefixLength = 0;
      let closingTagLength = 0;
      if (!result[0].includes('http') && type === 'image') {
        replacer = `<img src="${process.env.NEXT_ASSETS_BASEURL}`;
        prefixLength = 10;
      } else {
        if (result[1].includes('youtu')) {
          replacer = getObjectTagContent(result);
        } else {
          replacer = getIframeContent(result);
        }
        prefixLength = 13;
        closingTagLength = result[1].length + 11;
      }
      contentCopy =
        contentCopy.substring(0, currentLength + result.index) +
        replacer +
        contentCopy.substring(currentLength + result.index + prefixLength + closingTagLength);
      currentLength += currentInd + replacer.length + prefixLength;
    } else break;
  }
  return contentCopy;
}

export function getAllPageIndex(content: string, start: string, end: string) {
  const pageIndexList: string[] = [];
  let currentLength = 0;
  let title = '';
  while (content.length > currentLength) {
    const updatedContent = content.slice(currentLength);
    if (updatedContent.indexOf(end) !== -1) {
      title = updatedContent.substring(updatedContent.indexOf(start) + start.length, updatedContent.indexOf(end));
      if (
        !pageIndexList.find((text: string) => {
          return text === title;
        })
      ) {
        pageIndexList.push(title);
        currentLength += updatedContent.indexOf(end) + end.length;
      } else break;
    } else break;
  }

  return pageIndexList;
}

// replacing all font family with Jakarta
function replaceFontFamily(content: string) {
  const query = /font-family:[^;]+/g;
  const fontFamily = 'font-family:__Plus_Jakarta_Sans_7507a8,_Plus_Jakarta_Sans_Fallback_7507a8';
  const output = content.replace(query, fontFamily);
  return output;
}

// finding all image tags and addding the base url for src
function replaceImageUrl(content: string) {
  let contentCopy = content;
  const imgTagMatch = /<img[^>]+src=["']([^"']+)["'][^>]*\/?>/g;
  const matches = contentCopy.match(imgTagMatch);
  matches?.forEach((match) => {
    const srcMatch = /src=["']([^"']+)["']/.exec(match);
    if (srcMatch && !srcMatch[1].includes('http')) {
      contentCopy = contentCopy.replace(srcMatch[1], process.env.NEXT_ASSETS_BASEURL + srcMatch[1]);
    }
  });
  return contentCopy;
}

export function contentParser(content: string) {
  let parsedContent: string = content;
  if (content) {
    parsedContent = replaceImageUrl(content);
    parsedContent = htmlEnhancer(parsedContent, 'video');
  }
  return replaceFontFamily(parsedContent);
}
