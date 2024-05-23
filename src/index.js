import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import App from './App';
import Rezerwacja from './pages/rezerwacja-uslug';
import Rezerwacja2 from './pages/rezerwacja-uslug2';
import Rezerwacja_logged from './pages/rezerwacja-uslug-zalogowany';
import Testing from './pages/testing-stuff';
import reportWebVitals from './reportWebVitals';
import ProfilEditing from './profile-editing';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/rezerwacja" element={<Rezerwacja />} />
        <Route exact path="/rezerwacja2" element={<Rezerwacja2 />} />
        <Route exact path="/rezerwacja-logged" element={<Rezerwacja_logged />} />
        <Route exact path="/testing-stuff" element={<Testing />} />
        <Route exact path="/profile_editing" element={<ProfilEditing />} />
        
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))s
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
