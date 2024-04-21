import React, { Dispatch, SetStateAction } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

const PinkSwitch = styled(Switch)(({ theme }) => {
  return {
    padding: theme.spacing(1), // Optional: Increase padding for larger clickable area
    width:80,
    height:50,
    // Customize the thumb (the circle part that moves)
    '& .MuiSwitch-thumb': {
      width: 36, // Set the width of the thumb
      height: 36, // Set the height of the thumb
    },

    // Customize the switch's track (the background)
    '& .MuiSwitch-track': {
      borderRadius: 18, // Keep rounded ends that match the new thumb size
      height: 28, // Increase the track height
      width: 58, // Adjust this to set the overall length of the track
      border: '1px solid var(--golden-yellow)',
    },

    // Scale up the switch base to ensure correct thumb movement area
    '& .MuiSwitch-switchBase': {
      padding: 4, // Adjust padding around the thumb
      '&.Mui-checked': {
        transform: 'translateX(34px)', // Adjust translation to match the increased track width
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: 'var(--golden-yellow)',
      '&:hover': {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: 'var(--pale-yellow)',
    },
  };
});

function ShowPartnerCollegeCoursesToggle({
  showPartneredCollegeCourses,
  setShowPartneredCollegeCourses,
}: {
  showPartneredCollegeCourses: boolean;
  setShowPartneredCollegeCourses: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center justify-between w-full gap-2 mt-10 text-2xl">
      <p>
        Show courses from partnered Institutes <span className="underline font-bold">only!</span>
      </p>
      <PinkSwitch
        checked={showPartneredCollegeCourses}
        onChange={() => {
          return setShowPartneredCollegeCourses(!showPartneredCollegeCourses);
        }}
      />
    </div>
  );
}

export default ShowPartnerCollegeCoursesToggle;
