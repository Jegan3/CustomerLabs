import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
 import "../src/App.scss";

function App() {
  return (
    <BrowserRouter>
     
      <main>
        <Routes>
          <Route path="/" element={<Home />} exact />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
