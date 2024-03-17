import RSCSeoWrapper from '@/components/Containers/RSCSeoWrapper';
import { metaInfo } from '@/app/constants/pageMetaInfo';
import GoogleVerificationClient from '@/components/GoogleSignUpVerification/GoogleVerificationClient';
import { useParams } from 'next/navigation';
import { useTranslationLoader } from '@/providers/translationLoadingProvider';
import useSetMetaInfo from '@/hooks/useSetMetaInfo';
import LoadingUI from '@/components/LoadingUI';

const GoogleAuthCSR = () => {
  const params = useParams();
  const { loader } = useTranslationLoader();

  const canonicalUrl = `https://rooton.ca/${params.lang}/googleauth`;
  useSetMetaInfo(metaInfo.google_auth.title, metaInfo.google_auth.description, canonicalUrl);

  if (loader) return <LoadingUI />;

  return (
    <div>
      {loader && <LoadingUI />}
      {
        <RSCSeoWrapper>
          <GoogleVerificationClient />
        </RSCSeoWrapper>
      }
    </div>
  );
};

export default GoogleAuthCSR;
