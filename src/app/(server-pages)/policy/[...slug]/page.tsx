import { getPrivatePolicyContents,IPrivatePolicyPageContent } from '@/app/services/apiService/privatePolicyAPI';
import PrivatePolicy from '@/components/PrivatePolicyPage';

type PrivatePolicyPageProps = {
  params: {
    slug: string;
  };
};

export default async function PrivatePolicyPage(props: PrivatePolicyPageProps) {
  const response = (await getPrivatePolicyContents(props.params.slug[0])) as IPrivatePolicyPageContent;

  return <PrivatePolicy response={response}/>;
}
