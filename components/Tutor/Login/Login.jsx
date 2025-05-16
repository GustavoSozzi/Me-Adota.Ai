import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from '../Register';
import Account from '../Account';
import Tutor from '../Tutor';

//import { userContext } from '../../../hooks/userContext';

const Login = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Register />} />
        <Route path="entrar" element={<Account />} />
        <Route path="tutor" element={<Tutor />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default Login;
