import { Chip, Stack } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

interface AppliedFiltersProps {
  filterCriteria: string[];
  setfilterCriteria: Dispatch<SetStateAction<string[]>>;
}
function AppliedFilters({ filterCriteria, setfilterCriteria }: AppliedFiltersProps) {
  return (
    <Stack direction={'row'} spacing={1} flexWrap={'wrap'} rowGap={1}>
      {filterCriteria.map((criteria, index) => {
        return (
          <Chip
            key={criteria + index.toString()}
            label={criteria}
            onDelete={() => {
              return setfilterCriteria(
                filterCriteria.filter((c) => {
                  return c !== criteria;
                }),
              );
            }}
          />
        );
      })}
    </Stack>
  );
}

export default AppliedFilters;
