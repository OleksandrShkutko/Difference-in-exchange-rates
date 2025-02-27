import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import TextField from "components/TextField";
import ButtonBlock from "../ButtonBlock";
import getExchangeRates from "utils/getExchangeRates"
import dayjs from 'dayjs';

export default function CalculationForm({lastDayOfMonth}) {
  // Variables section
  const [dateOfSelling, setDateOfSelling] = useState(lastDayOfMonth);
  const [dateOfSellingRate, setDateOfSellingRate] = useState();
  const [dateOfSellingError, setDateOfSellingError] = useState(false);
  const [dateOfSellingHelperText, setDateOfSellingHelperText] = useState('');

  const [dateOfArrival, setDateOfArrival] = useState('');
  const [dateOfArrivalRate, setDateOfArrivalRate] = useState();
  const [dateOfArrivalError, setDateOfArrivalError] = useState(false);
  const [dateOfArrivalHelperText, setDateOfArrivalHelperText] = useState('');

  const [summInCurrency, setSummInCurrency] = useState('');

  const [disableButton, setDisableButton] = useState(false);
  const [calculatedRateText, setCalculatedRateText] = useState('')

  const defaultInputsConfigs = [
    {
      inputConfig: {
        id: 'date-of-selling',
        label: 'Дата продажу',
        disabled: true,
        value: dateOfSelling,
        helperText: dateOfSellingHelperText,
        error: dateOfSellingError,
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
        error: dateOfArrivalError,
        disableWeekends: true,
        onChange: (e) => {
          handleDateOfArivalChange(e)
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
          handleSummInCurrencyChange(e.target.value)
        }
      },
    },
  ];

  const [inputConfigs, setInputConfigs] = useState(defaultInputsConfigs);

  const calculatedRate = (dateOfSellingRate - dateOfArrivalRate) * summInCurrency;

  // useEffects section
  useEffect(() => {
    const lastDay = dayjs(dateOfSelling, 'DD.MM.YYYY');
    const firstDay = dayjs(dateOfSelling, 'DD.MM.YYYY').startOf('month');
    const dateForRequest =
      `${firstDay.format('YYYY-MM-DD')}/${lastDay.format('YYYY-MM-DD')}`

    handleDateOfSellingFetch(dateForRequest)
  }, [])

  useEffect(() => {
    setInputConfigs(defaultInputsConfigs);
  }, [dateOfSellingHelperText, dateOfArrivalHelperText, summInCurrency]);

  // Functions section
  // onChange functions
  function handleDateOfArivalChange(date) {
    setCalculatedRateText('');
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
      const dateForRequest = dayjs(formatedDate, 'DD.MM.YYYY').format('YYYY-MM-DD');

      setDateOfArrival(formatedDate);
      handleDateOfArivalFetch(dateForRequest)
    }
  }

  function handleSummInCurrencyChange(value) {
    setCalculatedRateText('');
    setSummInCurrency(value);
  }

  // Functions for getting exchangerates rates
  function handleDateOfSellingFetch(date) {
    getExchangeRates(date, handleDateOfSellingFetchSuccess, handleDateOfSellingFetchError);
  }

  function handleDateOfArivalFetch(date) {
    getExchangeRates(date, handleDateOfArivalFetchSuccess, handleDateOfArivalFetchError);
  }

  // Exchangerates rates help functions
  function handleDateOfSellingFetchSuccess(data) {
    const lastData = data.rates.pop();
    const formatedDateOfSelling = dayjs(lastData.effectiveDate).format('DD.MM.YYYY');

    setDateOfSelling(formatedDateOfSelling);
    setDateOfSellingRate(lastData.mid);
    setDateOfSellingHelperText(`1USD = ${lastData.mid}PLN`);
  }

  function handleDateOfSellingFetchError() {
    setDateOfSellingError(true);
    setDateOfSellingHelperText('Відсутні дані');

    setDisableButton(true);
  }

  function handleDateOfArivalFetchSuccess(data) {
    dateOfSellingError ? setDisableButton(true) : setDisableButton(false)

    setDateOfArrivalError(false);
    setDateOfArrivalRate(data.rates[0].mid);
    setDateOfArrivalHelperText(`1USD = ${data.rates[0].mid}PLN`);
  }

  function handleDateOfArivalFetchError(error) {
    setDisableButton(true);

    setDateOfArrivalError(true);
    setDateOfArrivalHelperText('Відсутні дані');
  }

  // The form submit function
  function handleSubmit(e) {
    e.preventDefault();
    if (!dateOfArrival || dateOfArrivalError) {
      const arrivalHelperText =
        dateOfArrivalError 
          ? 'Некоректна дата зарахування'
          : 'Це поле не може бути пустим';

      setDateOfArrivalError(true);
      setDateOfArrivalHelperText(arrivalHelperText);

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

    setCalculatedRateText(`Курсова різниця: ${calculatedRate.toFixed(4)} PLN`);
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
          <ButtonBlock props={{disableButton, calculatedRateText}} />
        </Grid>
      </Grid>
    </Box>
  );
}