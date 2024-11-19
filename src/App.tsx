import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SearchPage from "./pages/SearchPage.tsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        {/*<Route path="/show/:id" element={<ShowPage />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
