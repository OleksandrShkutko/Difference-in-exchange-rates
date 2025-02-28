import { Box, Typography } from '@mui/material';
import Table from '../Table';

export default function YearTable({date}) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthArray = Array.from(Array(month), (_, i) => i + 1).reverse();

  return (
    <Box>
      <Typography variant="h3" gutterBottom align="center">
        {year}
      </Typography>
      <Table monthArray={monthArray} year={year} />
    </Box>
  );
}