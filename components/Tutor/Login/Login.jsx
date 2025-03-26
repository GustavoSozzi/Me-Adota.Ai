import React, { useContext } from 'react'
import {Routes, Route, Navigate} from "react-router-dom";
import Register from '../Register';
import Account from '../Account';


const Login = () => {

  const {login} = React.useContext(useContext);

  if(login === true) return <Navigate to='/conta'/>

  return (
    <div>
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='entrar' element={Account}/>
        <Route path='*'/>
      </Routes>
    </div>
  )
}

export default Login
