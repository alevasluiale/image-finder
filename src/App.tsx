import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
import SearchPage from "./pages/SearchPage.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AppProvider } from "./context.tsx";
import Gallery from "./pages/Gallery.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/searching" element={<Gallery />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
