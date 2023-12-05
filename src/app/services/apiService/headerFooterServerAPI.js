const url = `${process.env.NEXT_API_BASE_URL}/api/commons?populate[0]=addresses.media_url&populate[1]=languages.media_url&populate[3]=core_services.sub_services&populate[4]=whats_app.profile_image`;

async function getHeaderFooterServerData() {
  const response = await fetch(url);
  const data = await response.json();
  return data?.data;
}

module.exports = {
  getHeaderFooterServerData,
};
