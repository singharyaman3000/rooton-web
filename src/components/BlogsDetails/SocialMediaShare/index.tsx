import FacebookIconBlue from '@/components/Icons/FacebookIconBlue';
import LinkedInIconBlue from '@/components/Icons/LinkedInIconBlue';
import TwitterIconBlue from '@/components/Icons/TwitterIconBlue';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';

const SocialMediaShare = () => {
  const url = window.location.href;

  return (
    <div className='flex flex-col items-center lg:items-start'>
      <div className='text-xl font-bold mb-8'>Share Article</div>
      <div className="flex gap-8">
        <FacebookShareButton url={url}>
          <FacebookIconBlue />
        </FacebookShareButton>
        <TwitterShareButton url={url}>
          <TwitterIconBlue />
        </TwitterShareButton>
        <LinkedinShareButton url={url}>
          <LinkedInIconBlue />
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export default SocialMediaShare;
