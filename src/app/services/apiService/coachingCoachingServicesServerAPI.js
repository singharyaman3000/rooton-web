const url = `${process.env.NEXT_API_BASE_URL}/api/coaching-pages?populate[0]=media_url&populate[2]=footers.media_url&populate[3]=coaching_page_contents.media_url&populate[4]=coaching_page_contents.coaching_services.media_url&populate[5]=coaching_page_contents.coaching_services.coaching_service_contents&populate[6]=coaching_page_contents`;

async function getCoachingCoachingServicesServerData() {
  const response = await fetch(url);
  const data = await response.json();
  return data?.data;
}

module.exports = {
  getCoachingCoachingServicesServerData,
};
