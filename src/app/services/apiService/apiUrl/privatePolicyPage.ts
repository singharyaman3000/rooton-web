const GET_PRIVATE_POLICY_CONTENTS =
  '/api/policy-pages/<service-id>?populate[0]=media_url';

export const getPrivatePolicyAPIUrl = (privatePolicyId: unknown) => {
  return GET_PRIVATE_POLICY_CONTENTS.replace('<service-id>', privatePolicyId as string);
};