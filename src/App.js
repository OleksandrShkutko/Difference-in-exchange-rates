import Home from "./pages/Home";
import MonthInfo from "./pages/MonthInfo";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":year/:month" element={<MonthInfo />} />

        <Route path="/*" element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
