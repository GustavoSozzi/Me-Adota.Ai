import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import RegisterPets from './registerPets'
import SucessfullPet from './feedPets/sucessfullPet'


const Pets = () => {
  console.log("rota pets")
  return (
    <div>
      <Routes>
        <Route index element={<RegisterPets/>}/>
        <Route path="sucessfullPet" element={<SucessfullPet/>} />
      </Routes>
    </div>
  )
}

export default Pets
