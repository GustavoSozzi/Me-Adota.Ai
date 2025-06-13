import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [login, setLogin] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  if(login === null) return <p>Carregando...</p>

  function loginUser(usuarioData) {
    localStorage.setItem('usuario', JSON.stringify(usuarioData));
    setUsuario(usuarioData);
    setLogin(true);
  }

  function logout() {
    localStorage.removeItem('usuario');
    setUsuario(null);
    setLogin(false);
  }

  console.log("contexto atual:", { login, usuario });


  return (
    <UserContext.Provider value={{ login, usuario, loginUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
