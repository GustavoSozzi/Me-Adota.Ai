import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Account from "../components/Tutor/Account";
import Home from "../components/Home";
import "../assets/App.css";
import "./App.css";
import Register from "../components/Tutor/Register";
import Login from "../components/Tutor/Login/Login";
import Conta from "../components/Tutor/Conta";
import Tutor from "../components/Tutor/Tutor";
import Abrigo from "../components/Abrigo/Abrigo";
import Pets from "../components/Pets/Pets";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutComHeader />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login/*" element={<Login />} />
        <Route path="tutor" element={<Tutor/>} />
        <Route path="/abrigo/*" element={<Abrigo />} />
        <Route path="/pets/*" element={<Pets/>} />
        <Route 
          path="conta/*"
          element={<Conta/>}
        />
      </Routes>
    </BrowserRouter>
  );
};

const LayoutComHeader = () => {
  return (
    <>
      <Header />
      <Home />
    </>
  );
};


export default App;
