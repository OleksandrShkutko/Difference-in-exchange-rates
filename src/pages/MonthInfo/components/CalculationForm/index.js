import { useState } from "react";
import { Box, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import TextField from "components/TextField";

export default function CalculationForm({dateOfSelling}) {
  const [dateOfArrival, setDateOfArrival] = useState('');
  const [summInCurrency, setSummInCurrency] = useState('');

  const defaultInputsConfigs = [
    {
      inputConfig: {
        id: 'date-of-selling',
        label: 'Дата продажу',
        disabled: true,
        required: true,
        value: dateOfSelling,
      },
      size: { xs: 6 }
    },
    {
      inputConfig: {
        id: 'date-of-arrival',
        label: 'Дата зарахування',
        required: true,
        onChange: (e) => {
          setDateOfArrival(e.target.value);
        }
      },
      size: { xs: 6 }
    },
    {
      inputConfig: {
        id: 'summ-in-currency',
        label: 'Сума в USD',
        required: true,
        onChange: (e) => {
          setSummInCurrency(e.target.value);
        }
      },
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    console.log(dateOfSelling, dateOfArrival, summInCurrency);
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      marginTop={6}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={4} justifyContent='center'>
        {defaultInputsConfigs.map((config) => (
          <Grid
            key={config.inputConfig.id}
            display="flex"
            justifyContent="center"
            size={config.size || { xs: 12 }}
          >
            <TextField props={config.inputConfig} />
          </Grid>
        ))}
      
        <Grid display="flex" justifyContent="center" size={{ xs: 12 }}>
          <Button variant="contained" type='submit' size="large">
            Розрахувати
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}