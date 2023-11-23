'use client';

import { useState } from 'react';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';

import TwitterIcon from '@/components/Icons/TwitterIcon';
import CopyLinkIcon from '@/components/Icons/CopyLinkIcon';
import ToastMessage from '@/components/UIElements/ToastMessage';
import FacebookIconBlue from '@/components/Icons/FacebookIconBlue';
import LinkedInIconBlue from '@/components/Icons/LinkedInIconBlue';

const SocialMediaShare = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [displayToast, setDisplayToast] = useState(false);

  const getCurrentBlogUrl = () => {
    return window.location.href;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getCurrentBlogUrl()).then(() => {
      setToastMessage('Copied to Clipboard');
      setDisplayToast(true);
    });
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
      {displayToast ? <ToastMessage message={toastMessage} setShowToast={setDisplayToast} /> : null}
    </div>
  );
};

export default SocialMediaShare;
