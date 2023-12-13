import React from 'react';
import style from '../WhatsApp-Integration/WhatsappCss.module.css';

/**
 * Renders a Whatsapp icon with opacity that changes based on scroll position.
 *
 * @return {JSX.Element} The Whatsapp icon component.
 */

const WhatsappIcon: React.FC<{ theme: string }> = ({ theme }): React.JSX.Element => {
  const filterG =
    theme === 'dark' ? (
      <g fill="rgba(0,0,0,1)" transform="translate(0,0) scale(0.6,0.6)">
        <path
          d="M128,399.36c-149.86799,0 -271.36,-121.49201 -271.36,-271.36v0c0,-149.86799 121.49201,-271.36 271.36,-271.36v0c149.86799,0 271.36,121.49201 271.36,271.36v0c0,149.86799 -121.49201,271.36 -271.36,271.36z"
          id="shape"
          filter="url(#shadow)"
        ></path>
      </g>
    ) : (
      <g fill="#ffffff" transform="translate(0,0) scale(0.6,0.6)">
        <path
          d="M128,399.36c-149.86799,0 -271.36,-121.49201 -271.36,-271.36v0c0,-149.86799 121.49201,-271.36 271.36,-271.36v0c149.86799,0 271.36,121.49201 271.36,271.36v0c0,149.86799 -121.49201,271.36 -271.36,271.36z"
          id="shape"
          filter="url(#shadow)"
        ></path>
      </g>
    );
  const filterDefs =
    theme === 'dark' ? (
      <defs>
        <filter id="f1" x="-20%" y="-20%" width="800%" height="800%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="50" />
          <feOffset dx="30" dy="30" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="1" />
            <feFuncR type="table" tableValues="0.75" />
            <feFuncG type="table" tableValues="0.75" />
            <feFuncB type="table" tableValues="0.75" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    ) : (
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="80" />
          <feOffset dx="2" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="1" />
            <feFuncR type="table" tableValues="0.4" />
            <feFuncG type="table" tableValues="0.4" />
            <feFuncB type="table" tableValues="0.4" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    );
  // Render the Whatsapp icon component
  return (
    <svg
      className={`${style.bottomRightIcon}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 256 256"
      width="100px"
      height="100px"
      fillRule="nonzero"
    >
      {filterDefs}
      <g transform="translate(96,96) scale(0.50,0.50)">
        {filterG}
        <g fill="#6cd82d">
          <g transform="translate(-50,-50) scale(4,4)">
            <path d="M32,10c-12.15,0 -22,9.85 -22,22c0,4.065 1.10725,7.86972 3.03125,11.13672l-2.81641,10.54688l11.0625,-2.47461c3.173,1.775 6.82866,2.79102 10.72266,2.79102c12.15,0 22,-9.85 22,-22c0,-12.15 -9.85,-22 -22,-22zM32,14c9.941,0 18,8.059 18,18c0,9.941 -8.059,18 -18,18c-3.731,0 -7.19631,-1.13513 -10.07031,-3.07812l-6.13867,1.37305l1.5625,-5.85547c-2.103,-2.946 -3.35352,-6.54345 -3.35352,-10.43945c0,-9.941 8.059,-18 18,-18zM24.47266,21.73633c-0.367,0 -0.95698,0.13564 -1.45898,0.68164c-0.493,0.547 -1.90039,1.86088 -1.90039,4.54688c0,2.676 1.9438,5.27191 2.2168,5.62891c0.273,0.367 3.77045,6.04552 9.31445,8.22852c4.596,1.81 5.53502,1.45142 6.54102,1.35742c0.998,-0.086 3.22278,-1.31298 3.67578,-2.58398c0.452,-1.272 0.45155,-2.3628 0.31055,-2.5918c-0.137,-0.222 -0.49502,-0.35981 -1.04102,-0.63281c-0.546,-0.274 -3.22456,-1.59344 -3.72656,-1.77344c-0.495,-0.18 -0.86175,-0.27452 -1.21875,0.27148c-0.367,0.546 -1.40742,1.77481 -1.73242,2.13281c-0.315,0.367 -0.62978,0.40972 -1.17578,0.13672c-0.546,-0.273 -2.30181,-0.84608 -4.38281,-2.70508c-1.619,-1.441 -2.71234,-3.22553 -3.02734,-3.76953c-0.316,-0.545 -0.03472,-0.84223 0.23828,-1.11523c0.248,-0.238 0.54731,-0.63227 0.82031,-0.94727c0.264,-0.324 0.35711,-0.54511 0.53711,-0.91211c0.189,-0.357 0.09303,-0.68208 -0.04297,-0.95508c-0.135,-0.274 -1.19369,-2.96897 -1.67969,-4.04297c-0.408,-0.904 -0.83456,-0.93045 -1.22656,-0.93945c-0.317,-0.016 -0.68402,-0.01562 -1.04102,-0.01562z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default WhatsappIcon;
