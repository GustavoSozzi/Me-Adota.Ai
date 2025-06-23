import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Account from '../components/Tutor/Account';
import Home from '../components/Home';
import '../assets/App.css';
import './App.css';
import Register from '../components/Tutor/Register';
import Login from '../components/Tutor/Login/Login';
import Conta from '../components/Tutor/Conta';
import Tutor from '../components/Tutor/Tutor';
import Abrigo from '../components/Abrigo/Abrigo';
import Pets from '../components/Pets/Pets';
import Doacoes from '../components/Doacoes/Doacoes';
import DetalhePet from '../components/Pets/feedPets/DetalhePet';
import Footer from '../components/Footer';
import Sobre from '../components/Sobre/Sobre';
import HistoricoDoacoes from '../components/Historico/Historico';
import ProtectedRouter from '../hooks/helper/protectedRouter';
import { UserStorage } from '../hooks/userContext';

const App = () => {
  return (
    <BrowserRouter>
      <UserStorage>
        <div className="App"></div>
        <main>
          <Routes>
            <Route path="/" element={<LayoutComHeader />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/login/*" element={<Login />} />
            <Route path="tutor" element={<Tutor />} />
            <Route path="/abrigo/*" element={<Abrigo />} />
            <Route path="sobre" element={<Sobre/>}/>
            <Route
              path="/pets/*"
              element={
                  <Pets />
              }
            />
            <Route path="doacoes" element={<Doacoes />} />
            <Route path="animal/:id" element={<DetalhePet />} />
            <Route path="conta/*" element={<Conta />} />
            <Route path="historico" element={<HistoricoDoacoes/>} />
          </Routes>
        </main>
        <Footer />
      </UserStorage>
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
