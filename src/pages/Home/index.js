import { Container } from '@mui/material';
import YearsBlocksStack from "./components/YearsBlocksStack";

export default function Home() {
  return (
    <Container sx={{ py: 2 }}>
      <YearsBlocksStack />
    </Container>
  );
}