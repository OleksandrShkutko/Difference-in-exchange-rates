import Grid from '@mui/material/Grid2';
import TableItem from '../TableItem';

export default function Table({monthArray, year}) {  
  return (
    <Grid container spacing={2} columns={{md: 4, sm: 3, xs: 2}} >
      {monthArray.map(month => (
        <Grid key={month} size={{ xs: 1 }}>
          <TableItem month={month} year={year} />
        </Grid>
      ))}
    </Grid>
  )
}