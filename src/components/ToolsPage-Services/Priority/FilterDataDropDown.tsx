import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const filteringCriterias: { title: string; value: string }[] = [
  { title: 'Course Fee - from low to high', value: 'Course Fee - from low to high' },
  { title: 'Course Fee - from high to low', value: 'Course Fee - from high to low' },
  { title: 'Application Fee - from low to high', value: 'Application Fee - from low to high' },
  { title: 'Application Fee - from high to low', value: 'Application Fee - from high to low' },
  { title: 'Duration - from low to high', value: 'Duration - from low to high' },
  { title: 'Duration - from high to low', value: 'Duration - from high to low' },
];

const opposingGroups: {
  [key: string]: string | undefined;
} = {
  'Course Fee - from low to high': 'Course Fee - from high to low',
  'Course Fee - from high to low': 'Course Fee - from low to high',
  'Application Fee - from low to high': 'Application Fee - from high to low',
  'Application Fee - from high to low': 'Application Fee - From low to high',
  'Duration - from low to high': 'Duration - from high to low',
  'Duration - from high to low': 'Duration - from low to high',
};

function FilterDataDropDown({
  setfilterCriteria,
  filterCriteria,
}: {
  filterCriteria: string[];
  setfilterCriteria: Dispatch<SetStateAction<string[]>>;
}) {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const handleChange = (event: SelectChangeEvent<typeof filterCriteria>) => {
    const {
      target: { value },
    } = event;
    // Convert all selections into an array
    let newValues = typeof value === 'string' ? value.split(',') : value;
    let conflict = false;
    // Check for and handle opposing selections
    newValues = newValues.filter((selectedValue, _, self) => {
      const opposite = opposingGroups[selectedValue];
      if (opposite && self.includes(opposite)) {
        // Remove the opposite value if it exists in the array
        conflict = true;
        return self.indexOf(selectedValue) < self.indexOf(opposite);
      }
      return true;
    });
    setShowAlert(conflict);
    setfilterCriteria(newValues);
  };

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowAlert(false);
  };

  return (
    <Box sx={{ minWidth: 180, maxWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter Courses</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          multiple
          value={filterCriteria}
          label="Filter Criteria"
          onChange={handleChange}
        >
          {filteringCriterias.map((criteria, index) => {
            return (
              <MenuItem value={criteria.value} key={criteria.title + index.toString()}>
                {criteria.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" variant="standard" sx={{ width: '100%' }}>
          You cannot select opposing filters at the same time.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default FilterDataDropDown;
