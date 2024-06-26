import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Strona_tytulowa from './App';
import Wyszukiwanie_uslug from './Wyszukiwanie_uslug';
import Strona_firmy from './Strona_firmy';
import Rezerwacja from './pages/rezerwacja-uslug';
import Rezerwacja2 from './pages/rezerwacja-uslug2';
import Rezerwacja_logged from './pages/rezerwacja-uslug-zalogowany';
import Strona_zarządzania_firmą from './Strona_zarządzania_firmą';
import reportWebVitals from './reportWebVitals';
import Rejestracja from './rejestracja';
import Logowanie from './logowanie';
import Rejestracja_firmy from './rejestracja_firmy';
import ProfilEditing from './profile-editing';
import Strona_zarządzania_firma_szczegoly from './Strona_zarządzania_firmą2';
import { CookiesProvider } from './components/CookiesManager';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Router>
    <CookiesProvider>
      <Routes>
        <Route exact path="/" element={<Strona_tytulowa />} />
        <Route exact path="/Wyszukiwanie usług" element={<Wyszukiwanie_uslug />} />
        <Route exact path="/rejestracja_firmy" element={<Rejestracja_firmy />} />
        <Route exact path="/Strona wyboru usług" element={<Strona_firmy />} />
        <Route exact path="/rezerwacja" element={<Rezerwacja />} />
        <Route exact path="/rezerwacja2" element={<Rezerwacja2 />} />
        <Route exact path="/rezerwacja-logged" element={<Rezerwacja_logged />} />
        <Route exact path="/rejestracja" element={<Rejestracja />} />
        <Route exact path="/logowanie" element={<Logowanie />} />
        <Route exact path="/profile-editing" element={<ProfilEditing />} />
        <Route exact path="/zarzadzaj_firma_szczegoly" element={<Strona_zarządzania_firma_szczegoly />} />
        <Route exact path="/Strona_zarządzania_firmą" element={<Strona_zarządzania_firmą />} />
        <Route exact path="/Strona_firmy" element={<Strona_firmy />} />
      </Routes>
    </CookiesProvider>
  </Router>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))s
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
