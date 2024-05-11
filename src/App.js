import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PIXA from "./PIXA";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PIXA />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
