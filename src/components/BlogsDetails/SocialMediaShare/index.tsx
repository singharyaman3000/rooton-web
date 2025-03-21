'use client';

import { useState } from 'react';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';

import TwitterIcon from '@/components/Icons/TwitterIcon';
import CopyLinkIcon from '@/components/Icons/CopyLinkIcon';
import ToastMessage from '@/components/UIElements/ToastMessage';
import FacebookIconBlue from '@/components/Icons/FacebookIconBlue';
import LinkedInIconBlue from '@/components/Icons/LinkedInIconBlue';
import { usePathname } from 'next/navigation';

const SocialMediaShare = () => {
  const toastMessage = 'Copied to clipboard';
  const [displayToast, setDisplayToast] = useState(false);
  const path = usePathname();

  const getCurrentBlogUrl = () => {
    return process.env.NEXT_APP_BASE_URL + path.slice(1);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getCurrentBlogUrl()).then(() => {
      setDisplayToast(true);
    });
  };

  return (
    <div className="relative flex flex-col items-center lg:items-start">
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
        <div
          aria-label="copy-link-button"
          role="button"
          tabIndex={0}
          className="cursor-pointer"
          onClick={handleCopyLink}
          title="Copy Link"
        >
          <CopyLinkIcon />
        </div>
      </div>
      {displayToast ? <ToastMessage message={toastMessage} setShowToast={setDisplayToast} /> : null}
    </div>
  );
};

export default SocialMediaShare;
