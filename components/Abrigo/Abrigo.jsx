import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import CadastrarAbrigo from './cadastrarAbrigo';


const Abrigo = () => {
  return (
    <div>
      <Routes>
      <Route index element={<CadastrarAbrigo />} />
      </Routes>
    </div>
  )
}

export default Abrigo
