import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../userContext';

const ProtectedAbrigoRoute = ({ children }) => {
  const { login, usuario } = React.useContext(UserContext);
  const location = useLocation();

  const tipo = usuario?.tipo;

  if (login === null) {
    return <p>Carregando...</p>;
  }

  if (login === true && tipo === 'abrigo') {
    return children;
  }

  return <Navigate to="/abrigo/login" state={{ from: location }} replace />;
};

export default ProtectedAbrigoRoute;
