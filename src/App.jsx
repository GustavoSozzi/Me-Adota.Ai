import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Account from "../components/Tutor/Account";
import Home from "../components/Home";
import "../assets/App.css";
import "./App.css";

const Layout = ({ children }) => {
  const location = useLocation(); 
  const isHome = location.pathname === "/";

  return (
    <div>
      {!isHome && <Header />} 
      {children}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login/*" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
