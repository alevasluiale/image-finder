import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
import SearchPage from "./pages/SearchPage.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AppProvider } from "./context.tsx";
import ImageBrowser from "./pages/ImageBrowser.tsx";
import AcceptedImagePage from "./pages/AcceptedImagePage.tsx";

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
            <Route path="/browse-images" element={<ImageBrowser />} />
            <Route path="/accepted-image" element={<AcceptedImagePage />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
