import { Stack, Button, Typography } from "@mui/material";

export default function ButtonBlock({props}) {
  const showBottomText = props.disableButton || props.calculatedRateText;

  const stackStyles = {
    maxWidth: '100%'
  }

  const buttonStyles = {
    width: 300,
    maxWidth: '100%',
  };

  return (
    <Stack spacing={2} alignItems='center' style={stackStyles}>
      <Button
        variant="contained"
        type='submit'
        size="large"
        disabled={props.disableButton}
        style={buttonStyles}
      >
        Розрахувати
      </Button>

      { showBottomText && (
        <Typography
          variant="h6"
          align="center"
          color={props.disableButton ? 'error' : 'primary'}
        >
          {props.disableButton && 'Розрахунок неможливий - відсутні дані'}
          {props.calculatedRateText}
        </Typography>
      )}
    </Stack>
  )
}