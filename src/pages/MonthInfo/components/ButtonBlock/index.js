import { Stack, Button, Typography } from "@mui/material";

export default function ButtonBlock({disableButton, calculatedRateText}) {
  const showBottomText = disableButton || calculatedRateText;

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
        disabled={disableButton}
        style={buttonStyles}
      >
        Розрахувати
      </Button>

      { showBottomText && (
        <Typography
          variant="h6"
          align="center"
          color={disableButton ? 'error' : 'primary'}
        >
          {disableButton && 'Розрахунок неможливий - відсутні дані'}
          {calculatedRateText}
        </Typography>
      )}
    </Stack>
  )
}