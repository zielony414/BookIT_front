import React, { useState, useEffect, useRef } from "react";
import "./Strona_zarządzania_firmą.css";
import Calendar from 'react-calendar';
import axios from 'axios';

function Strona_zarządzania_firmą() {
  const [company, setCompany] = useState({
    name: '', description: '', logo: '', numer: '', strona: '', facebook: '', instagram: '', linkedin: '', x: '', tiktok: ''
  });
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState('');
  const company_id = 3;

  const inputRef = useRef(null);

  const fetchCompanyDetails = async () => {
    try {
      const response = await axios.post('https://book-it-back.vercel.app/api/Strona_zarządzania_firmą', { company_id });
      setCompany(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error connecting to the server');
    }
  };

  const fetchReservations = async (date) => {
    try {
      const response = await axios.post('https://book-it-back.vercel.app/api/Strona_zarządzania_firmą/reservations', { company_id, date });
      setReservations(response.data);
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
      await axios.put('https://book-it-back.vercel.app/api/Strona_zarządzania_firmą/update', {
        company_id,
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

  const Header = () => (
    <header className="flex gap-5 justify-between px-7 py-2 w-full text-xs text-center text-black mix-blend-darken bg-stone-200 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <img
        loading="lazy"
        src="bookit-logo.png"
        alt="Logo"
        className="shrink-0 h-16 w-auto" 
        role = "button"
        onClick={() => navigate('/')}
      />
    </header>
  );

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
    <footer className="flex flex-col items-start px-10 pt-5 pb-3.5 mt-8 w-full text-white bg-black max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between text-base">
        <div className="flex gap-5 justify-between">
          <a href="#" className="justify-center">O nas</a>
          <a href="#" className="justify-center whitespace-nowrap">Kontakt</a>
        </div>
        <a href="#" className="justify-center whitespace-nowrap">FAQ</a>
      </div>
      <div className="shrink-0 self-stretch mt-2 bg-white border border-white border-solid h-[5px] max-md:max-w-full" />
      <div className="justify-center mt-4 text-xs font-light"> © 2024 PRZ All Rights Reserved{" "} </div>
    </footer>
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
