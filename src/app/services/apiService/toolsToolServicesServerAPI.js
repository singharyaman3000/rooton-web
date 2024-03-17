const url = `${process.env.NEXT_API_BASE_URL}/api/tools-pages?populate[0]=media_url&populate[2]=footers.media_url&populate[3]=tools_page_contents.media_url&populate[4]=tools_page_contents.tools.media_url&populate[5]=tools_page_contents.tool.tools_contents&populate[6]=tools_page_contents`;

async function getToolsToolServicesServerData() {
  const response = await fetch(url);
  const data = await response.json();
  return data?.data;
}

module.exports = {
  getToolsToolServicesServerData,
};
