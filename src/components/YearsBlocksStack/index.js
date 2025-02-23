import { useState } from 'react';
import { Stack } from '@mui/material';
import YearBlock from '../YearBlock';

export default function YearsBlocksStack() {
  // TODO: Add a range slider
  const [yearsToShow, setYearsToShow] = useState(3);

  const date = new Date();

  function getPastYear(prevYear) {
    return new Date(new Date().getFullYear() - prevYear, 11, 31);
  }

  return (
    <Stack spacing={4}>
      {
        Array.from(Array.from(Array(yearsToShow).keys())).map(prevYear =>
          prevYear === 0
            ? <YearBlock key={prevYear} date={date} />
            : <YearBlock key={prevYear} date={getPastYear(prevYear)} />
        )
      }
    </Stack>
  );
}