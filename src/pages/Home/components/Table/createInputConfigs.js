export const createInputConfigs = ({
  dateOfSelling,
  dateOfSellingHelperText,
  dateOfSellingError,
  dateOfArrivalHelperText,
  dateOfArrivalError,
  handleDateOfArivalChange,
  summInCurrencyHelperText,
  handleSummInCurrencyChange
}) => {
  return [
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
        error: !!summInCurrencyHelperText,
        helperText: summInCurrencyHelperText,
        onChange: (e) => {
          handleSummInCurrencyChange(e.target.value)
        }
      },
    },
  ];
}