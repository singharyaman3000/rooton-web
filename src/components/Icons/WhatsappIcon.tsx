// Design 1

import React, { useState, useEffect } from 'react';
import style from '../WhatsApp-Integration/WhatsappCss.module.css';

const WhatsappIcon = () => {
  const [opacity, setOpacity] = useState<number>(0); // Start with 0 opacity

  useEffect(() => {
    /**
     * Updates the opacity of an element based on the scroll position.
     *
     * @return {void}
     */
    const handleScroll = () => {
      // You can adjust these values based on your requirements
      const maxOpacityScrollHeight = 400;
      const currentScroll = window.scrollY;
      const calculatedOpacity = currentScroll / maxOpacityScrollHeight;

      setOpacity(Math.min(calculatedOpacity, 1)); // Ensure opacity doesn't exceed 1
    };

    // Add the event listener
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <svg
      className={style.bottomRightIcon}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="2489"
      height="2500"
      viewBox="0 0 1219.547 1225.016"
    >
      <path
        fill="#E0E0E0"
        d="M1041.858 178.02C927.206 63.289 774.753.07 612.325 0 277.617 0 5.232 272.298 5.098 606.991c-.039 106.986 27.915 211.42 81.048 303.476L0 1225.016l321.898-84.406c88.689 48.368 188.547 73.855 290.166 73.896h.258.003c334.654 0 607.08-272.346 607.222-607.023.056-162.208-63.052-314.724-177.689-429.463zm-429.533 933.963h-.197c-90.578-.048-179.402-24.366-256.878-70.339l-18.438-10.93-191.021 50.083 51-186.176-12.013-19.087c-50.525-80.336-77.198-173.175-77.16-268.504.111-278.186 226.507-504.503 504.898-504.503 134.812.056 261.519 52.604 356.814 147.965 95.289 95.36 147.728 222.128 147.688 356.948-.118 278.195-226.522 504.543-504.693 504.543z"
      />
      <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="609.77" y1="1190.114" x2="609.77" y2="21.084">
        <stop offset="0" stop-color="#20b038" />
        <stop offset="1" stop-color="#60d66a" />
      </linearGradient>
      <path
        fill="url(#a)"
        d="M27.875 1190.114l82.211-300.18c-50.719-87.852-77.391-187.523-77.359-289.602.133-319.398 260.078-579.25 579.469-579.25 155.016.07 300.508 60.398 409.898 169.891 109.414 109.492 169.633 255.031 169.57 409.812-.133 319.406-260.094 579.281-579.445 579.281-.023 0 .016 0 0 0h-.258c-96.977-.031-192.266-24.375-276.898-70.5l-307.188 80.548z"
      />
      <image
        overflow="visible"
        opacity=".08"
        width="682"
        height="639"
        xlinkHref="FCC0802E2AF8A915.png"
        transform="translate(270.984 291.372)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="#FFF"
        d="M462.273 349.294c-11.234-24.977-23.062-25.477-33.75-25.914-8.742-.375-18.75-.352-28.742-.352-10 0-26.25 3.758-39.992 18.766-13.75 15.008-52.5 51.289-52.5 125.078 0 73.797 53.75 145.102 61.242 155.117 7.5 10 103.758 166.266 256.203 226.383 126.695 49.961 152.477 40.023 179.977 37.523s88.734-36.273 101.234-71.297c12.5-35.016 12.5-65.031 8.75-71.305-3.75-6.25-13.75-10-28.75-17.5s-88.734-43.789-102.484-48.789-23.75-7.5-33.75 7.516c-10 15-38.727 48.773-47.477 58.773-8.75 10.023-17.5 11.273-32.5 3.773-15-7.523-63.305-23.344-120.609-74.438-44.586-39.75-74.688-88.844-83.438-103.859-8.75-15-.938-23.125 6.586-30.602 6.734-6.719 15-17.508 22.5-26.266 7.484-8.758 9.984-15.008 14.984-25.008 5-10.016 2.5-18.773-1.25-26.273s-32.898-81.67-46.234-111.326z"
      />
      <path
        fill="#FFF"
        d="M1036.898 176.091C923.562 62.677 772.859.185 612.297.114 281.43.114 12.172 269.286 12.039 600.137 12 705.896 39.633 809.13 92.156 900.13L7 1211.067l318.203-83.438c87.672 47.812 186.383 73.008 286.836 73.047h.255.003c330.812 0 600.109-269.219 600.25-600.055.055-160.343-62.328-311.108-175.649-424.53zm-424.601 923.242h-.195c-89.539-.047-177.344-24.086-253.93-69.531l-18.227-10.805-188.828 49.508 50.414-184.039-11.875-18.867c-49.945-79.414-76.312-171.188-76.273-265.422.109-274.992 223.906-498.711 499.102-498.711 133.266.055 258.516 52 352.719 146.266 94.195 94.266 146.031 219.578 145.992 352.852-.118 274.999-223.923 498.749-498.899 498.749z"
      />
    </svg>
  );
};

export default WhatsappIcon;

// Design 2

// import React, { useState, useEffect } from 'react';
// import style from '../WhatsApp-Integration/WhatsappCss.module.css';

// const WhatsappIcon = () => {
//   const [opacity, setOpacity] = useState<number>(0); // Start with 0 opacity

//   useEffect(() => {
//     /**
//      * Updates the opacity of an element based on the scroll position.
//      *
//      * @return {void}
//      */
//     const handleScroll = () => {
//       // You can adjust these values based on your requirements
//       const maxOpacityScrollHeight = 400;
//       const currentScroll = window.scrollY;
//       const calculatedOpacity = currentScroll / maxOpacityScrollHeight;

//       setOpacity(Math.min(calculatedOpacity, 1)); // Ensure opacity doesn't exceed 1
//     };

//     // Add the event listener
//     window.addEventListener('scroll', handleScroll);

//     // Remove the event listener when the component unmounts
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);
//   return (
//     <svg
//       className={style.bottomRightIcon}
//       style={{ opacity }}
//       xmlns="http://www.w3.org/2000/svg"
//       xmlnsXlink="http://www.w3.org/1999/xlink"
//       viewBox="0 0 256 256"
//       width="100px"
//       height="100px"
//     >
//       <g fill="#6cd82d" fillRule="nonzero">
//         <g transform="scale(4, 4)">
//           <path d="M32,10c-12.15,0 -22,9.85 -22,22c0,4.065 1.10725,7.86972 3.03125,11.13672l-2.81641,10.54688l11.0625,-2.47461c3.173,1.775 6.82866,2.79102 10.72266,2.79102c12.15,0 22,-9.85 22,-22c0,-12.15 -9.85,-22 -22,-22zM32,14c9.941,0 18,8.059 18,18c0,9.941 -8.059,18 -18,18c-3.731,0 -7.19631,-1.13513 -10.07031,-3.07812l-6.13867,1.37305l1.5625,-5.85547c-2.103,-2.946 -3.35352,-6.54345 -3.35352,-10.43945c0,-9.941 8.059,-18 18,-18zM24.47266,21.73633c-0.367,0 -0.95698,0.13564 -1.45898,0.68164c-0.493,0.547 -1.90039,1.86088 -1.90039,4.54688c0,2.676 1.9438,5.27191 2.2168,5.62891c0.273,0.367 3.77045,6.04552 9.31445,8.22852c4.596,1.81 5.53502,1.45142 6.54102,1.35742c0.998,-0.086 3.22278,-1.31298 3.67578,-2.58398c0.452,-1.272 0.45155,-2.3628 0.31055,-2.5918c-0.137,-0.222 -0.49502,-0.35981 -1.04102,-0.63281c-0.546,-0.274 -3.22456,-1.59344 -3.72656,-1.77344c-0.495,-0.18 -0.86175,-0.27452 -1.21875,0.27148c-0.367,0.546 -1.40742,1.77481 -1.73242,2.13281c-0.315,0.367 -0.62978,0.40972 -1.17578,0.13672c-0.546,-0.273 -2.30181,-0.84608 -4.38281,-2.70508c-1.619,-1.441 -2.71234,-3.22553 -3.02734,-3.76953c-0.316,-0.545 -0.03472,-0.84223 0.23828,-1.11523c0.248,-0.238 0.54731,-0.63227 0.82031,-0.94727c0.264,-0.324 0.35711,-0.54511 0.53711,-0.91211c0.189,-0.357 0.09303,-0.68208 -0.04297,-0.95508c-0.135,-0.274 -1.19369,-2.96897 -1.67969,-4.04297c-0.408,-0.904 -0.83456,-0.93045 -1.22656,-0.93945c-0.317,-0.016 -0.68402,-0.01562 -1.04102,-0.01562z"></path>
//         </g>
//       </g>
//     </svg>
//   );
// };

// export default WhatsappIcon;

// Design 3

// import React, { useState, useEffect } from 'react';
// import style from '../WhatsApp-Integration/WhatsappCss.module.css';

// const WhatsappIcon = () => {
//   const [opacity, setOpacity] = useState<number>(0); // Start with 0 opacity

//   useEffect(() => {
//     /**
//      * Updates the opacity of an element based on the scroll position.
//      *
//      * @return {void}
//      */
//     const handleScroll = () => {
//       // You can adjust these values based on your requirements
//       const maxOpacityScrollHeight = 400;
//       const currentScroll = window.scrollY;
//       const calculatedOpacity = currentScroll / maxOpacityScrollHeight;

//       setOpacity(Math.min(calculatedOpacity, 1)); // Ensure opacity doesn't exceed 1
//     };

//     // Add the event listener
//     window.addEventListener('scroll', handleScroll);

//     // Remove the event listener when the component unmounts
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);
//   return (
//     <svg
//       className={style.bottomRightIcon}
//       style={{ opacity }}
//       xmlns="http://www.w3.org/2000/svg"
//       xmlnsXlink="http://www.w3.org/1999/xlink"
//       viewBox="0 0 256 256"
//       width="100px"
//       height="100px"
//       fillRule="nonzero"
//     >
//       <g transform="translate(96,96) scale(0.50,0.50)">
//         <g fill="#ffffff" transform="translate(0,0) scale(0.6,0.6)">
//           <path
//             d="M128,399.36c-149.86799,0 -271.36,-121.49201 -271.36,-271.36v0c0,-149.86799 121.49201,-271.36 271.36,-271.36v0c149.86799,0 271.36,121.49201 271.36,271.36v0c0,149.86799 -121.49201,271.36 -271.36,271.36z"
//             id="shape"
//           ></path>
//         </g>

//         <g fill="#6cd82d">
//           <g transform="translate(-50,-50) scale(4,4)">
//             <path d="M32,10c-12.15,0 -22,9.85 -22,22c0,4.065 1.10725,7.86972 3.03125,11.13672l-2.81641,10.54688l11.0625,-2.47461c3.173,1.775 6.82866,2.79102 10.72266,2.79102c12.15,0 22,-9.85 22,-22c0,-12.15 -9.85,-22 -22,-22zM32,14c9.941,0 18,8.059 18,18c0,9.941 -8.059,18 -18,18c-3.731,0 -7.19631,-1.13513 -10.07031,-3.07812l-6.13867,1.37305l1.5625,-5.85547c-2.103,-2.946 -3.35352,-6.54345 -3.35352,-10.43945c0,-9.941 8.059,-18 18,-18zM24.47266,21.73633c-0.367,0 -0.95698,0.13564 -1.45898,0.68164c-0.493,0.547 -1.90039,1.86088 -1.90039,4.54688c0,2.676 1.9438,5.27191 2.2168,5.62891c0.273,0.367 3.77045,6.04552 9.31445,8.22852c4.596,1.81 5.53502,1.45142 6.54102,1.35742c0.998,-0.086 3.22278,-1.31298 3.67578,-2.58398c0.452,-1.272 0.45155,-2.3628 0.31055,-2.5918c-0.137,-0.222 -0.49502,-0.35981 -1.04102,-0.63281c-0.546,-0.274 -3.22456,-1.59344 -3.72656,-1.77344c-0.495,-0.18 -0.86175,-0.27452 -1.21875,0.27148c-0.367,0.546 -1.40742,1.77481 -1.73242,2.13281c-0.315,0.367 -0.62978,0.40972 -1.17578,0.13672c-0.546,-0.273 -2.30181,-0.84608 -4.38281,-2.70508c-1.619,-1.441 -2.71234,-3.22553 -3.02734,-3.76953c-0.316,-0.545 -0.03472,-0.84223 0.23828,-1.11523c0.248,-0.238 0.54731,-0.63227 0.82031,-0.94727c0.264,-0.324 0.35711,-0.54511 0.53711,-0.91211c0.189,-0.357 0.09303,-0.68208 -0.04297,-0.95508c-0.135,-0.274 -1.19369,-2.96897 -1.67969,-4.04297c-0.408,-0.904 -0.83456,-0.93045 -1.22656,-0.93945c-0.317,-0.016 -0.68402,-0.01562 -1.04102,-0.01562z"></path>
//           </g>
//         </g>
//       </g>
//     </svg>
//   );
// };

// export default WhatsappIcon;
