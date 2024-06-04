import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Strona_tytulowa from './Strona_tytulowa';
import Rezerwacja from './pages/rezerwacja-uslug';
import Rezerwacja2 from './pages/rezerwacja-uslug2';
import Rezerwacja_logged from './pages/rezerwacja-uslug-zalogowany';
import Strona_zarządzania_firmą from './Strona_zarządzania_firmą';
import Strona_zarządzania_firmą2 from './Strona_zarządzania_firmą2';
import Strona_tytulowa from './Strona_tytulowa'
import Wyszukiwanie_uslug from './Wyszukiwanie_uslug';
import Testing from './pages/testing-stuff';
import Testing2 from './pages/testing-stuff-2';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Strona_tytulowa />} />
        <Route exact path="/rezerwacja" element={<Rezerwacja />} />
        <Route exact path="/rezerwacja2" element={<Rezerwacja2 />} />
        <Route exact path="/rezerwacja-logged" element={<Rezerwacja_logged />} />
        <Route exact path="/testing-stuff" element={<Testing />} />
        <Route exact path="/Strona firmy" element={<Strona_zarządzania_firmą />} />
        <Route exact path="/Strona formy rezerwacje" element={<Strona_zarządzania_firmą2 />} />
        <Route exact path="/Wyszukiwanie usług" element={<Wyszukiwanie_uslug />} />


      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))s
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
