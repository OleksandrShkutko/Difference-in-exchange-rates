import { FormControl, InputLabel, OutlinedInput, FormHelperText } from "@mui/material";

export default function TextField({props}) {
  return (
    <FormControl disabled={props.disabled}>
      {props.label
        && <InputLabel htmlFor={props.id}>{props.label}</InputLabel>}
      <OutlinedInput
        inputProps={props}
        aria-describedby={props.helperText && (props.id + "-helper-text")}
        label={props.label}
      />
      {props.helperText 
        && <FormHelperText id={props.id + "-helper-text"}>{props.helperText}</FormHelperText>}
    </FormControl>
  )
}