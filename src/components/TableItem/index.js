import { Typography, Button } from '@mui/material';

export default function TableItem({ month, year }) {
  return (
    <Button
      href={`/${year}/${month}`}
      variant="outlined"
      fullWidth={true}
    >
      <Typography variant="h5" align="center" textTransform='capitalize'>
        {Intl.DateTimeFormat('ua', { month: 'long' }).format(new Date(month.toString()))}
      </Typography>
    </Button>
  )
}