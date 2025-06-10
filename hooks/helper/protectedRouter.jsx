import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../userContext';

const ProtectedAbrigoRoute = ({ children }) => {
  const { login, tipo } = React.useContext(UserContext);
  const location = useLocation();

  if (login === true && tipo === 'abrigo') {
    return children;
  } else if (login === false || tipo !== 'abrigo') {
    return <Navigate to="/abrigo/login" state={{ from: location }} replace />;
  } else {
    return null; // ou um loading
  }
};

export default ProtectedAbrigoRoute;
