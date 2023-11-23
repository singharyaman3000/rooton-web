'use client';

import CopyLinkIcon from '@/components/Icons/CopyLinkIcon';
import FacebookIconBlue from '@/components/Icons/FacebookIconBlue';
import LinkedInIconBlue from '@/components/Icons/LinkedInIconBlue';
import TwitterIcon from '@/components/Icons/TwitterIcon';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';

const SocialMediaShare = () => {
  const getCurrentBlogUrl = () => {
    return window.location.href;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getCurrentBlogUrl());
  };

  return (
    <div className="flex flex-col items-center lg:items-start">
      <div className="text-xl font-bold mb-8">Share Article</div>
      <div className="flex gap-8">
        <FacebookShareButton url={getCurrentBlogUrl()} title="Share on Facebook">
          <FacebookIconBlue />
        </FacebookShareButton>
        <TwitterShareButton url={getCurrentBlogUrl()} title="Share on Twitter">
          <TwitterIcon />
        </TwitterShareButton>
        <LinkedinShareButton url={getCurrentBlogUrl()} title="Share on LinkedIn">
          <LinkedInIconBlue />
        </LinkedinShareButton>
        <div role="button" tabIndex={0} className="cursor-pointer" onClick={handleCopyLink} title="Copy Link">
          <CopyLinkIcon />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaShare;
