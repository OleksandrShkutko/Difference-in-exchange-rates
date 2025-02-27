import { FormControl, InputLabel, OutlinedInput, FormHelperText } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';

export default function TextField(props) {
  const inputStyles = {
    width: 300,
    maxWidth: '100%',
  };

  const minDate = dayjs(props.minDate, 'DD.MM.YYYY');

  const disableWeekends = (date) => {
    const day = dayjs(date).day();
    return day === 0 || day === 6;
  };

  return (
    props.type === 'date'
      ? (
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
            <DatePicker
              minDate={minDate}
              onChange={props.onChange}
              slotProps={{
                textField: {
                  helperText: props.helperText,
                  style: inputStyles,
                  error: props.error,
                },
              }}
              aria-describedby={props.helperText && (props.id + "-helper-text")}
              label={props.label}
              shouldDisableDate={props.disableWeekends && disableWeekends}
            />
          </LocalizationProvider>
        )
      : (
          <FormControl disabled={props.disabled} error={props.error} style={inputStyles}>
            {props.label
              && <InputLabel htmlFor={props.id}>{props.label}</InputLabel>}
            <OutlinedInput
              value={props.value}
              id={props.id}
              type={props.type}
              aria-describedby={props.helperText && (props.id + "-helper-text")}
              label={props.label}
              onChange={props.onChange}
              inputProps={{
                min: props.min >= 0 ? props.min : 'false'
              }}
            />
            {props.helperText 
              && <FormHelperText id={props.id + "-helper-text"}>{props.helperText}</FormHelperText>}
          </FormControl>
        )
  )
}