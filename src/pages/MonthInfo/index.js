import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Container, Box, Typography } from "@mui/material";
import CalculationForm from "./components/CalculationForm";
import Breadcrumbs from "components/Breadcrumbs";

export default function MonthInfo() {
  const { year, month } = useParams();
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const monthValidationError = isNaN(new Date(month)) || Number(month) > 12;
  const yearValidationError = isNaN(new Date(year)) || Number(year) > currentYear;

  useEffect(() => {
    if (monthValidationError || yearValidationError) {
      return navigate('/');
    }
  }, []);
 
  const monthString =
    !monthValidationError
      ? Intl.DateTimeFormat('ua', { month: 'long' }).format(new Date(month))
      : '';
  const pageTitle = monthString + ' ' + year;
  const lastDayOfMonth = new Date(year, month, 0).toLocaleDateString('uk-UA');

  const breadcrumbs = [
    {
      text: 'Головна сторінка',
      href: '/',
    },
    {
      text: pageTitle,
    },
  ];

  return (
    <Container sx={{ py: 2 }}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Box component="section" marginTop={2}>
        <Typography variant="h4" align="center" textTransform='capitalize' children={pageTitle} />
        <CalculationForm lastDayOfMonth={lastDayOfMonth} />
      </Box>
    </Container>
  );
}