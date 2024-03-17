import EmailVerificationClient from '@/components/EmailVerification/EmailVerificationClient';
import RSCSeoWrapper from '@/components/Containers/RSCSeoWrapper';

export default function EmailVerificationPageCSR() {
  return (
    <RSCSeoWrapper>
      <EmailVerificationClient />
    </RSCSeoWrapper>
  );
}
