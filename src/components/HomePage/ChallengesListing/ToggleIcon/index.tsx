import React from 'react';

export interface IToggleIcon {
  isOpen: boolean;
}

const ToggleIcon = ({ isOpen }: IToggleIcon) => {

  return <div className='w-[18px] h-[18px] md:w-[24px] md:h-[24px] flex-shrink-0  ml-[10px]'>
    {
      isOpen ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="challenges_toggle" width="100%" height="100%" viewBox="0 0 24 24">
          <g fill="none" fillRule="evenodd">
            <path style={{ fill: 'var(--icon-bg)' }} fillRule="nonzero" d="M0 24V0h24v24z" />
            <path style={{ fill: 'var(--icon-path)' }} d="M12.577 12.577h6.173v-1.154H5.25v1.154h6.173z" />
          </g>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="challenges_toggle" width="100%" height="100%" viewBox="0 0 24 24">
          <g fill="none" fillRule="evenodd">
            <path style={{ fill: 'var(--icon-bg)' }} fillRule="nonzero" d="M0 24V0h24v24z" />
            <path
              style={{ fill: 'var(--icon-path)' }}
              d="M11.423 18.75h1.154v-6.173h6.173v-1.154h-6.173V5.25h-1.154v6.173H5.25v1.154h6.173z"
            />
          </g>
        </svg>
      )}
  </div>;
};

export default ToggleIcon;
