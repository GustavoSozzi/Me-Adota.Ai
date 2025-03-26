import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Account from "../components/Tutor/Account";
import Home from "../components/Home";
import "../assets/App.css";
import "./App.css";
import Register from "../components/Tutor/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutComHeader />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/login/*" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

const LayoutComHeader = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
