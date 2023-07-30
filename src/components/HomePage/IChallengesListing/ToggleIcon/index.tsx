import { themes } from '@/app/constants/themeConstants';
import { useTheme } from 'next-themes';
import React from 'react';

export interface IToggleIcon {
  isOpen: boolean;
}

const ToggleIcon = ({ isOpen }: IToggleIcon) => {
  const { theme } = useTheme();

  //  const [theme , updateTheme] = useState<string| undefined>(undefined)

  //  useEffect(()=>{
  //     updateTheme(theme)
  //  } , [theme])

  return isOpen && theme ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path fill={theme === themes.light ? '#FFE5C5' : '#424242'} fillRule="nonzero" d="M0 24V0h24v24z" />
        <path fill={theme === themes.light ? '#000' : '#FFE5C5'} d="M12.577 12.577h6.173v-1.154H5.25v1.154h6.173z" />
      </g>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path fill={theme === themes.light ? '#FFE5C5' : '#424242'} fillRule="nonzero" d="M0 24V0h24v24z" />
        <path
          fill={theme === themes.light ? '#000' : '#FFE5C5'}
          d="M11.423 18.75h1.154v-6.173h6.173v-1.154h-6.173V5.25h-1.154v6.173H5.25v1.154h6.173z"
        />
      </g>
    </svg>
  );
};

export default ToggleIcon;
