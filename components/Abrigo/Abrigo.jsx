import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import CadastrarAbrigo from './cadastrarAbrigo';
import LoginAbrigo from './LoginAbrigo';
import SucessfullAbrigo from './SucessfullAbrigo';
const Abrigo = () => {
  return (
    <div>
      <Routes>
      <Route index element={<CadastrarAbrigo />} />
      <Route path='login' element={<LoginAbrigo/>}/>
      <Route path="sucessfullAbrigo" element={<SucessfullAbrigo/>} />
      </Routes>
    </div>
  )
}

export default Abrigo
