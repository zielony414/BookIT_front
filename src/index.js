import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Strona_tytulowa from './Strona_tytulowa';
import Wyszukiwanie_uslug from './Wyszukiwanie_uslug';
import Rezerwacja from './pages/rezerwacja-uslug';
import Rezerwacja2 from './pages/rezerwacja-uslug2';
import Rezerwacja_logged from './pages/rezerwacja-uslug-zalogowany';
import reportWebVitals from './reportWebVitals';
import Rejestracja from './rejestracja';
import Logowanie from './logowanie';
import Rejestracja_firmy from './rejestracja_firmy';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Strona_tytulowa />} />
        <Route exact path="/Wyszukiwanie usług" element={<Wyszukiwanie_uslug />} />
        <Route exact path="/rejestracja_firmy" element={<Rejestracja_firmy />} />
        <Route exact path="/rezerwacja" element={<Rezerwacja />} />
        <Route exact path="/rezerwacja2" element={<Rezerwacja2 />} />
        <Route exact path="/rezerwacja-logged" element={<Rezerwacja_logged />} />
        <Route exact path="/rejestracja" element={<Rejestracja />} />
        <Route exact path="/logowanie" element={<Logowanie />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))s
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
