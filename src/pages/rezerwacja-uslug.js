import React, { useState } from 'react';
import "../output.css";
import { Link, useNavigate } from "react-router-dom";
import NewServicePicker from "../components/NewServicePicker";
import { CookiesProvider, useCookiesContext } from "../components/CookiesManager";



const Header = () => {
  const navigate = useNavigate();
  const { cookies, clearCookies } = useCookiesContext();
  const [authStatus, setAuthStatus] = useState({
      email: cookies.email || '',
      company_or_user: cookies.isCompany ? 1 : cookies.isUser ? 0 : null,
  });

  const handleProfileClick = () => {
      if (authStatus.company_or_user === 1) {
          navigate('/strona_zarządzania_firmą');
      } else if (authStatus.company_or_user === 0) {
          navigate('/profile-editing');
      }
  };

  const handleLogout = async () => {
      try {
          const response = await fetch('https://bookit-back.vercel.app/api/wyloguj', {
              method: 'GET',
          });
          if (response.ok) {
              clearCookies();
              setAuthStatus({
                  email: '',
                  company_or_user: null,
              });
              navigate('/');
          }
      } catch (error) {
          console.error('Error logging out:', error);
      }
  };

  return (
      <div className="flex gap-5 justify-between px-5 py-1.5 w-full text-xs text-center text-black mix-blend-darken bg-stone-200 max-md:flex-wrap max-md:max-w-full">
          <img
              loading="lazy"
              src="bookit-logo.png"
              alt="Logo"
              className="shrink-0 h-16 w-auto" 
              role="button"
              onClick={() => navigate('/')}
          />
          {authStatus.company_or_user !== null ? (
              <div className="flex gap-3.5 items-start my-auto">
                  <button
                      onClick={handleProfileClick}
                      className="justify-center px-2.5 py-3.5 bg-white rounded-md border-b border-black border-solid"
                  >
                      {authStatus.email}
                  </button>
                  <button
                      onClick={handleLogout}
                      className="justify-center px-2.5 py-3.5 bg-white rounded-md border-b border-black border-solid"
                  >
                      Wyloguj
                  </button>
              </div>
          ) : (
              <div className="flex gap-3.5 items-start my-auto">
                  <button
                      onClick={() => navigate('/logowanie')}
                      className="justify-center px-2.5 py-3.5 bg-white rounded-md border-b border-black border-solid"
                  >
                      Zaloguj się/załóż konto
                  </button>
                  <button
                      onClick={() => navigate('/rejestracja_firmy')}
                      className="justify-center px-2.5 py-3.5 bg-white rounded-md border-b border-black border-solid"
                  >
                      Dodaj swoją firmę
                  </button>
              </div>
          )}
      </div>
  );
};

const Footer = () => {
  return (
    <div className="flex flex-col items-start px-10 pt-5 mt-[200px] pb-3.5 w-full text-white bg-black max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between text-base">
        <div className="flex gap-5 justify-between">
          <a href="#" className="justify-center">O nas</a>
          <a href="#" className="justify-center whitespace-nowrap">Kontakt</a>
        </div>
        <a href="#" className="justify-center whitespace-nowrap">FAQ</a>
      </div>
      <div className="shrink-0 self-stretch mt-2 bg-white border border-white border-solid h-[5px] max-md:max-w-full" />
      <div className="justify-center mt-4 text-xs font-light"> © 2024 PRZ All Rights Reserved{" "} </div>
    </div>
  );
}

const Rezerwacja = () => {
  const [services, setServices] = useState([]);
  const companyId = 1;
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('../rezerwacja-logged', { state: { services, companyId }});
  };

  const handleServiceSelect = (selectedServices) => {
    setServices(selectedServices);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center mt-[100px] bg-white">      
        <div className=''>                  
                    
          <NewServicePicker companyId={companyId} onServiceSelect={handleServiceSelect} />
          
        </div>
        <div className="flex gap-5 justify-between mt-10 max-w-full text-2xl font-light text-center whitespace-nowrap w-[414px] max-md:mt-10 max-md:mr-1">
          <Link to="/" className="px-7 py-1.5 bg-white border border-black border-solid rounded-[30px] max-md:px-5">
            Cofnij
          </Link>
          <button onClick={handleNext} className="px-7 py-1.5 bg-white border border-black border-solid rounded-[30px] max-md:px-5">
            Dalej
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Rezerwacja;

  