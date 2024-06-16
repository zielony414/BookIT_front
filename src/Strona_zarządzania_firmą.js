import React, { useState, useEffect, useRef } from "react";
import "./Strona_zarządzania_firmą.css";
import Calendar from 'react-calendar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CookiesProvider, useCookiesContext } from "./components/CookiesManager";

function Strona_zarządzania_firmą() {
  const [company, setCompany] = useState({
    name: '', description: '', logo: '', tel_nr: '', Site_link: '', Facebook_link: '', Instagram_link: '', Linkedin_link: '', X_link: '', Tiktok_link: ''
  });
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState('');
  const navigate = useNavigate();
  const { cookies, clearCookies } = useCookiesContext();
  const inputRef = useRef(null);

  const email = cookies.email;

  const fetchCompanyDetails = async () => {
    try {
      console.log('Sending email to server:', email);
      const response = await axios.post('https://book-it-back.vercel.app/api/Strona_zarzadzania_firma', {email});
      console.log('Server response:', response);
      setCompany(response.data.data); // Update to access the correct object
    } catch (err) {
      console.error('Error fetching company details:', err);
      if (axios.isAxiosError(err)) {
        console.error('Axios error response:', err.response);
        setError(err.response ? err.response.data.error : 'Error connecting to the server');
      } else {
        setError('Unexpected error');
      }
    }
  };

  const fetchReservations = async (date) => {
    try {
      const response = await axios.post('https://book-it-back.vercel.app/api/Strona_zarzadzania_firma/reservations', { email, date });
      console.log('Fetched reservations:', response.data); // Log response data
      setReservations(response.data.data); // Ensure accessing correct data
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error fetching reservations');
      setReservations([]); // Clear reservations on error
    }
  };

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = (field) => {
    setIsEditing(true);
    setEditField(field);
  };

  const handleInputChange = (e) => {
    setCompany({ ...company, [editField]: e.target.value });
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      await axios.put('https://book-it-back.vercel.app/api/Strona_zarzadzania_firma/update', {
        email,
        field: editField,
        value: company[editField]
      });
      fetchCompanyDetails();
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error updating data');
    }
    setEditField('');
  };

  const handleDateChange = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    console.log('Fetching reservations for:', formattedDate); // Add this line for debugging
    fetchReservations(formattedDate);
  };

  const LinksPrzyciski = ({ field }) => {
    const isFieldEditing = isEditing && editField === field;
    return (
      <button
        type="button"
        className="przyciski_link"
        onClick={isFieldEditing ? handleSaveClick : () => handleEditClick(field)}
      >
        {isFieldEditing ? 'ZAPISZ' : (company[field] ? 'EDYTUJ' : 'DODAJ')}
      </button>
    );
  };

  const Links = ({ variable, nazwa, field }) => {
    if (isEditing && editField === field) {
      return (
        <input
          id="linkiEdytuj"
          type="text"
          value={company[field]}
          onChange={handleInputChange}
          ref={inputRef}
        />
      );
    } else {
      return <p className="linki">{variable || nazwa}</p>;
    }
  };

  const Header = () => {
    const navigate = useNavigate();
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

  const Body = () => (
    <div id="body2">
      <div id="góra">
        <div id="user">
          <img src={company.logo} id="logo_firmy" alt="logo firmy" />
          <div id="all">
            <div id="linki">
              <Links variable={company.Site_link} nazwa="Strona" field="Site_link" />
              <Links variable={company.tel_nr} nazwa="Numer" field="tel_nr" />
              <Links variable={company.Facebook_link} nazwa="Facebook" field="Facebook_link" />
              <Links variable={company.Instagram_link} nazwa="Instagram" field="Instagram_link" />
              <Links variable={company.Linkedin_link} nazwa="Linkedin" field="Linkedin_link" />
              <Links variable={company.X_link} nazwa="X" field="X_link" />
              <Links variable={company.Tiktok_link} nazwa="Tiktok" field="Tiktok_link" />
            </div>
            <div id="przyciski">
              <LinksPrzyciski field="Site_link" />
              <LinksPrzyciski field="tel_nr" />
              <LinksPrzyciski field="Facebook_link" />
              <LinksPrzyciski field="Instagram_link" />
              <LinksPrzyciski field="Linkedin_link" />
              <LinksPrzyciski field="X_link" />
              <LinksPrzyciski field="Tiktok_link" />
            </div>
          </div>
        </div>

        <div id="user_description">
          <a>Nazwa Firmy</a>
          <div id="nazwa_całość">
            {isEditing && editField === 'name' ? (
              <textarea
                id="nazwa_firmy"
                placeholder=''
                value={company.name}
                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                ref={inputRef}
              />
            ) : (
              <p id="nazwa_firmy">{company.name}</p>
            )}
            <button
              type="button"
              id="nazwa_firmy_przycisk"
              onClick={isEditing && editField === 'name' ? handleSaveClick : () => handleEditClick('name')}
            >
              {isEditing && editField === 'name' ? 'ZAPISZ' : 'EDYTUJ'}
            </button>
          </div>
          <a>Opis Firmy</a>
          <div id="opis_całość">
            {isEditing && editField === 'description' ? (
              <textarea
                id="opis_firmy_edytuj"
                placeholder=""
                value={company.description}
                onChange={(e) => setCompany({ ...company, description: e.target.value })}
                ref={inputRef}
              />
            ) : (
              <p id="opis_firmy">{company.description}</p>
            )}
            <button
              type="button"
              id="przycisk_opis"
              onClick={isEditing && editField === 'description' ? handleSaveClick : () => handleEditClick('description')}
            >
              {isEditing && editField === 'description' ? 'ZAPISZ' : 'EDYTUJ'}
            </button>
          </div>
          <div id="resaca">
            <Calendar onClickDay={handleDateChange} />
            <button type="button" onClick={() => navigate('/zarzadzaj_firma_szczegoly')} id="zarzadzanie_harmonogramem">ZARZĄDZANIE HARMONOGRAMEM</button>
          </div>
        </div>

        <div>
          <div id="uslugi">
            <div id="uslugi2">
              <div id="usługi3">
                {reservations.length > 0 ? reservations.map((res, index) => (
                  <div key={index} className="uslugi4">
                    <p className="uslugi_napisy">{res.category} {res.booking_time}</p>
                    <p className="uslugi_napisy">{res.service_name}</p>
                    <p className="uslugi_napisy">Czas trwania: {res.execution_time}</p>
                  </div>
                )) : (
                  <p className="uslugi4">Brak rezerwacji</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <div className="flex flex-col items-start px-10 pt-5 pb-3.5 mt-8 w-full text-white bg-black max-md:px-5 max-md:max-w-full">
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

  return (
    <div className="Strona_zarządzania_firmą">
      <Header />
      <Body />
      <Footer/>
    </div>
  );
}

export default Strona_zarządzania_firmą;
