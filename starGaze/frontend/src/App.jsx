import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Webcam from "./webcam";
import { ThemeProvider, createTheme } from '@mui/material';

export default function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
        </Route>
        <Route path="/webcam" element={<Webcam />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);