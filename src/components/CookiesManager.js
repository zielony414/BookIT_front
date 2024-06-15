import React, { createContext, useContext } from 'react';
import { useCookies } from 'react-cookie';

const CookiesContext = createContext();

export const CookiesProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['email', 'isCompany', 'isUser']);

  const setEmail = (email) => {
    setCookie('email', email, { path: '/', sameSite: 'strict' });
  };

  const setIsCompany = (isCompany) => {
    setCookie('isCompany', isCompany, { path: '/', sameSite: 'strict' });
  };
  
  const setIsUser = (isUser) => {
    setCookie('isUser', isUser, { path: '/', sameSite: 'strict' });
  };
  

  const clearCookies = () => {
    removeCookie('email', { path: '/' });
    removeCookie('isCompany', { path: '/' });
    removeCookie('isUser', { path: '/' });
  };

  return (
    <CookiesContext.Provider value={{ cookies, setEmail, setIsCompany, setIsUser, clearCookies }}>
      {children}
    </CookiesContext.Provider>
  );
};

export const useCookiesContext = () => useContext(CookiesContext);