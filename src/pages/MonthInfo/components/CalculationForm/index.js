import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import TextField from "components/TextField";
import dayjs from 'dayjs';

export default function CalculationForm({dateOfSelling}) {
  const [dateOfArrival, setDateOfArrival] = useState('');
  const [summInCurrency, setSummInCurrency] = useState('');
  const [dateOfArrivalError, setDateOfArrivalError] = useState(false);
  const [dateOfArrivalHelperText, setDateOfArrivalHelperText] = useState('');

  const defaultInputsConfigs = [
    {
      inputConfig: {
        id: 'date-of-selling',
        label: 'Дата продажу',
        disabled: true,
        value: dateOfSelling,
      },
      size: { xs: 12, sm: 6 }
    },
    {
      inputConfig: {
        id: 'date-of-arrival',
        label: 'Дата зарахування',
        type: 'date',
        minDate: dateOfSelling,
        helperText: dateOfArrivalHelperText,
        
        onChange: (date) => {
          if (
            !date
              || !dayjs(date).isValid()
              || date.isBefore(dayjs(dateOfSelling, 'DD.MM.YYYY'), "day")
          ) {
            setDateOfArrival(null);
            setDateOfArrivalError(true);
            !date && setDateOfArrivalHelperText('');
            
            if (date) {
              !dayjs(date).isValid()
                && setDateOfArrivalHelperText('Некоректна дата зарахування');
              date.isBefore(dayjs(dateOfSelling, 'DD.MM.YYYY'), "day") 
                && setDateOfArrivalHelperText('Дата зарахування не може бути меншою за дату продажу');
            }
          } else {
            const formatedDate = date ? date.format('L') : null;
            setDateOfArrival(formatedDate);
            setDateOfArrivalError(false);
            setDateOfArrivalHelperText(formatedDate);
          }
        },
      },
      size: { xs: 12, sm: 6 }
    },
    {
      inputConfig: {
        id: 'summ-in-currency',
        label: 'Сума в USD',
        type: 'number',
        min: 0,
        onChange: (e) => {
          setSummInCurrency(e.target.value);
        }
      },
    },
  ];

  const [inputConfigs, setInputConfigs] = useState(defaultInputsConfigs);

  useEffect(() => {
    setInputConfigs(defaultInputsConfigs);
  }, [dateOfArrivalHelperText, summInCurrency]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!dateOfArrival || dateOfArrivalError) {
      setDateOfArrivalError(true);
      setInputConfigs(inputConfigs.map((config) => {
        if (config.inputConfig.id === 'date-of-arrival') {
          return {
            ...config,
            inputConfig: {
              ...config.inputConfig,
              error: 'true',
              helperText:
                dateOfArrivalError 
                  ? 'Некоректна дата зарахування'
                  : 'Це поле не може бути пустим',
            }
          }
        }
        return config;
      }));
      console.log('Invalid date of arrival');
      return;
    }
    if (!summInCurrency) {
      setInputConfigs(inputConfigs.map((config) => {
        if (config.inputConfig.id === 'summ-in-currency') {
          return {
            ...config,
            inputConfig: {
              ...config.inputConfig,
              error: 'true',
              helperText: 'Це поле не може бути пустим',
            }
          }
        }
        return config;
      }));
      console.log('Invalid summ in currency');
      return;
    }
    console.log(dateOfSelling + '-' + dateOfArrival, 'Summ: ' + summInCurrency);
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      marginTop={6}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={4} justifyContent='center'>
        {inputConfigs.map((config) => (
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