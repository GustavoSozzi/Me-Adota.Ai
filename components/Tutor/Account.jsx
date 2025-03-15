import React from 'react';
import Register from './Register';
import { Routes, Route, Navigate } from 'react-router-dom';

const Account = () => {
  return (
    <div>
      <Routes>
        <Route path='register' element={<Register />} />
      </Routes>
    </div>
  );
};

export default Account;
