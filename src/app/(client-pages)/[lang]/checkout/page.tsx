'use client';

import { metaInfo } from '@/app/constants/pageMetaInfo';
import { getCurrentUserDetails } from '@/app/services/apiService/checkoutPageAPI';
import Checkout from '@/components/CheckoutPage';
import LoadingUI from '@/components/LoadingUI';
import useClientAPI from '@/components/UIElements/Slider/hooks/useClientAPI';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import { decrypt } from '@/utils/actions/checkout';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';

const CheckoutPageCSR = () => {
  const params = useParams();
  const router = useRouter();

  const { plan } = router.query;
  const planDetails = decrypt(plan as string);

  const { loader } = useTranslationLoader();
  const { data, loading } = useClientAPI({
    apiFn: () => {
      return getCurrentUserDetails();
    },
  });

  const canonicalUrl = `https://rooton.ca/${params.lang}/checkout`;
  useSetMetaInfo(metaInfo.checkout.title, metaInfo.checkout.description, canonicalUrl);

  if (loader || loading) return <LoadingUI />;

  return (
    <div>
      {(loader || loading) && <LoadingUI />}
      {<Checkout planDetails={JSON.parse(planDetails)} currentLoggedInUser={data} />}
    </div>
  );
};

export default CheckoutPageCSR;
