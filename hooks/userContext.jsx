import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [login, setLogin] = useState(null);
  const [tipo, setTipo] = useState(null); // novo

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      setLogin(true);
      setTipo(usuario.tipo); // "abrigo" ou "tutor"
    } else {
      setLogin(false);
      setTipo(null);
    }
  }, []);

  function logout() {
    localStorage.removeItem('usuario');
    setLogin(false);
    setTipo(null);
  }

  return (
    <UserContext.Provider value={{ login, tipo, logout }}>
      {children}
    </UserContext.Provider>
  );
};
