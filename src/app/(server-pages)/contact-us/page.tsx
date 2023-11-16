import { ContactUsResponseData, getContactUsContents } from '@/app/services/apiService/contactUsPageAPI';
import ContactUs from '@/components/ContactUsPage';

export default async function ContactUsPage() {
  const res = await getContactUsContents();
  return <ContactUs contents={res?.data?.length ? res.data[0] : ({} as ContactUsResponseData)} />;
}
