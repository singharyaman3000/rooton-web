const url = `${process.env.NEXT_API_BASE_URL}/api/policy-pages`;

async function getPolicyServerData() {
  const response = await fetch(url);
  const data = await response.json();
  return data?.data;
}

module.exports = {
  getPolicyServerData,
};
