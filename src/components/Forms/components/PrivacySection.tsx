export const PrivacyPolicy = () => {
  return (
    <div className="hs-richtext hs-main-font-element">
      <p>
        <span className="text-[12pt] text-black bg-transparent font-normal no-underline align-baseline">
          <strong>
            Privacy Note:<br></br>{' '}
          </strong>
          By submitting this form, you agree to our{' '}
          <a href="/privacy-policy" target="_blank" rel="noopener">
            <span className="underline text-[#3574e3]">Privacy Policy</span>
          </a>{' '}
          &amp;{' '}
          <a href="/terms-and-conditions" target="_blank" rel="noopener">
            <span className="text-[#3574e3]">
              <span className="underline">Terms &amp; </span>
              <span className="underline">Conditions</span>
            </span>
          </a>
          . We respect your privacy and will only use your information to provide you with the information and services
          you request.
        </span>
      </p>
    </div>
  );
};
