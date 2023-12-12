const GET_PRIVATE_POLICY_CONTENTS =
  '/api/policy-pages/<service-id>?populate[0]=media_url';

export const getPrivatePolicyAPIUrl = (privatePolicyId: unknown) => {
  return GET_PRIVATE_POLICY_CONTENTS.replace('<service-id>', privatePolicyId as string);
};

const GET_POLICY_META_INFO =
  '/api/policy-pages?fields[0]=meta_title&fields[1]=meta_description&fields[2]=unique_identifier_name&filters[id][$eq]=<serviceId>';

export const getPolicyMetaInfoUrl = (policyId: string) => {
  return GET_POLICY_META_INFO.replace('<serviceId>', policyId);
};