import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SearchPage from "./pages/SearchPage.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          {/*<Route path="/show/:id" element={<ShowPage />} />*/}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
