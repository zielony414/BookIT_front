import React, { useEffect, useState } from 'react';
import "./output.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CookiesProvider, useCookiesContext } from "./components/CookiesManager";
  



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

const Footer = () => 
{
    return (
      <div className="flex flex-col items-start px-10 pt-5 pb-3.5 mt-16 w-full text-white bg-black max-md:px-5 max-md:max-w-full">
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
 
function StarRating({ rating, setRating, disabled }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      {rating === 0 ? <p>Oceń wizytę:</p> : <p>Dziękujemy za opinię :)</p>}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              style={{
                background: 'none',
                border: 'none',
                cursor: disabled ? 'default' : 'pointer',
                fontSize: '2rem',
                color: index <= rating ? 'gold' : 'gray',
                pointerEvents: disabled ? 'none' : 'auto',
              }}
              onClick={() => !disabled && setRating(index)}
            >
              <span>&#9733;</span> {/* Unicode character for star */}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ReservationHistoryItem({ businessName, location, service, price, date, company_email }) {
  const [rating, setRating] = useState(0);

  const isPastReservation = new Date(date) < new Date();

  // Extract day, month, year, hour, and minute from the date
  const reservationTime = new Date(date);
  const day = reservationTime.getDate().toString().padStart(2, '0'); // Add leading zero if day is single digit
  const month = (reservationTime.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if month is single digit
  const year = reservationTime.getFullYear();
  const hours = reservationTime.getHours().toString().padStart(2, '0'); // Add leading zero if hour is single digit
  const minutes = reservationTime.getMinutes().toString().padStart(2, '0'); // Add leading zero if minute is single digit

  useEffect(() => {
    if (rating > 0) {
      const email = company_email; // replace with actual email logic
      const payload = { email, ocena: rating };
      fetch('https://book-it-back.vercel.app/api/user_page/oceny', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Odpowiedź z serwera:', data);
        })
        .catch(error => {
          console.error('Błąd:', error);
        });
    }
  }, [rating]);

  return (
    <article style={{ padding: '1rem', marginTop: '0.625rem', width: '100%', borderRadius: '1.875rem', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: '500', marginBottom: '0.375rem' }}>{businessName}</h2>
        <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{location}</p>
      </header>
      <section style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: '1.25rem', marginBottom: '0.875rem' }}>{service}</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ fontSize: '1.875rem', fontWeight: '600', marginBottom: '0', marginRight: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: '500' }}>Cena: {price} zł</span>
          </p>
        </div>
      </section>
      <footer style={{ fontSize: '1.5rem', fontWeight: '500', marginTop: 'auto' }}>
        {/* Display the full reservation date */}
        <p>Data: {`${day}/${month}/${year}`}</p>
        {/* Display the reservation time in a separate paragraph */}
        <p>Godzina: {`${hours}:${minutes}`}</p>
        {isPastReservation && (
          <div style={{ marginTop: '0.5rem' }}>
            <StarRating rating={rating} setRating={setRating} />
          </div>
        )}
      </footer>
    </article>
  );
}


function ProfileForm({ onSubmit }) 
{    
  
    const [email, setEmail] = useState('');
    const [nrTelefonu, setnrTelefonu] = useState('');
    const [miasto, setMiasto] = useState('');
    const [plec, setPlec] = useState('');
    const [stareHaslo, setStareHaslo] = useState('');
    const [noweHaslo, setNoweHaslo] = useState('');
    const [powtorzNoweHaslo, setPowtworzNoweHaslo] = useState('');
    
    const handleSave = () => {
      // Tutaj możesz wywołać funkcję fetch(), aby przesłać dane na backend
      fetch('/edit_profile', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email: email,
            nrTelefonu: nrTelefonu,
            miasto: miasto,
            plec: plec,
            stareHaslo: stareHaslo,
            noweHaslo: noweHaslo,
            powtorzNoweHaslo: powtorzNoweHaslo
           }), // Wysyłamy napis "hej"
      })
      .then(response => response.json())
      .then(data => {
          console.log('Odpowiedź z serwera:', data);
          // Tutaj możesz obsłużyć odpowiedź z serwera
      })
      .catch(error => {
          console.error('Błąd:', error);
          // Tutaj możesz obsłużyć błąd, np. wyświetlając komunikat dla użytkownika
      });
  };


    return (
      <form className="mt-16 max-md:mt-10 max-md:max-w-full">
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <form className="mt-16 max-md:mt-10 max-md:max-w-full bg-white p-8 rounded-xl shadow-lg">
    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
      <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
        <h2 className="text-2xl font-light leading-6 text-black max-md:max-w-full max-md:text-4xl">EMAIL</h2>
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          className="label justify-center items-start px-6 py-12 text-lg bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 w-96 max-md:w-full"
          id="email"
          type="email"
          placeholder="kontakt@roksa.pl"
          aria-label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <h2 className="text-2xl font-light leading-6 text-black max-md:max-w-full max-md:text-4xl mt-3">NR TELEFONU</h2>
        <label htmlFor="telephone" className="sr-only">Numer telefonu</label>
        <input
          className="label justify-center items-start px-6 py-12 text-lg bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 w-96 max-md:w-full"
          id="telephone"
          type="text"
          placeholder="+48 420 213 769"
          aria-label="Numer telefonu"
          value={nrTelefonu}
          onChange={(event) => setnrTelefonu(event.target.value)}
        />
        <h2 className="text-2xl font-light leading-6 text-black max-md:max-w-full max-md:text-4xl mt-3">MIASTO</h2>
        <label htmlFor="city" className="sr-only">Miasto</label>
        <input
          className="label justify-center items-start px-6 py-12 text-lg bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 w-96 max-md:w-full"
          id="city"
          type="text"
          placeholder="Lipinki Łużyckie"
          aria-label="Miasto"
          value={miasto}
          onChange={(event) => setMiasto(event.target.value)}
        />
        <h2 className="text-2xl font-light leading-6 text-black max-md:max-w-full max-md:text-4xl mt-3">PŁEĆ</h2>
        <label htmlFor="gender" className="sr-only">Płeć</label>
        <select
          className="label justify-center items-start px-6 py-12 text-lg whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 w-96 max-md:w-full"
          id="gender"
          aria-label="Płeć"
          value={plec}
          onChange={(event) => setPlec(event.target.value)}
        >
          <option value="Mezczyzna">Mężczyzna</option>
          <option value="Kobieta">Kobieta</option>
        </select>
      </div>
      
      <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
        <h2 className="text-2xl font-light leading-6 text-black max-md:max-w-full max-md:text-4xl mt-0">STARE HASŁO</h2>
        <label htmlFor="oldPassword" className="sr-only">Stare hasło</label>
        <input
          className="label justify-center items-start px-6 py-12 text-lg bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 w-96 max-md:w-full"
          id="oldPassword"
          type="password"
          placeholder="***************"
          aria-label="Stare hasło"
          value={stareHaslo}
          onChange={(event) => setStareHaslo(event.target.value)}
        />
        <h2 className="text-2xl font-light leading-6 text-black max-md:max-w-full max-md:text-4xl mt-3">NOWE HASŁO</h2>
        <label htmlFor="newPassword" className="sr-only">Nowe hasło</label>
        <input
          className="label justify-center items-start px-6 py-12 text-lg bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 w-96 max-md:w-full"
          id="newPassword"
          type="password"
          placeholder="***************"
          aria-label="Nowe hasło"
          value={noweHaslo}
          onChange={(event) => setNoweHaslo(event.target.value)}
        />
        <h2 className="text-2xl font-light leading-6 text-black max-md:max-w-full max-md:text-4xl mt-3">POWTÓRZ NOWE HASŁO</h2>
        <label htmlFor="repeatNewPassword" className="sr-only">Powtórz nowe hasło</label>
        <input
          className="label justify-center items-start px-6 py-12 text-lg bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 w-96 max-md:w-full"
          id="repeatNewPassword"
          type="password"
          placeholder="***************"
          aria-label="Powtórz nowe hasło"
          value={powtorzNoweHaslo}
          onChange={(event) => setPowtworzNoweHaslo(event.target.value)}
        />
      </div>
    </div>
    
    <div className="flex gap-4 justify-center mt-8 max-md:flex-col max-md:gap-2">
      <button className="w-1/2 px-7 py-1.5 bg-white border border-black border-solid rounded-full max-md:w-full">Anuluj</button>
      <button 
        className="w-1/2 px-7 py-1.5 bg-white border border-black border-solid rounded-full max-md:w-full"
        onClick={handleSave}
      >
        Zapisz
      </button>
    </div>
  </form>
</div>

      </form>
    );
}

function ProfilEditing() 
  {
    
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { cookies, clearCookies } = useCookiesContext();
  const [authStatus, setAuthStatus] = useState({
      email: cookies.email || '',
      company_or_user: cookies.isCompany ? 1 : cookies.isUser ? 0 : null,
  });

    useEffect(() => {
      async function fetchReservations() {
        try {
          const response = await fetch('https://book-it-back.vercel.app/api/user_reservations', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'User-Email': cookies.email // Zakładając, że `userEmail` jest zmienną przechowującą email użytkownika
            }
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
    
          // Formatowanie daty
          const formattedData = data.map(service => ({
            ...service,
            booking_time: new Date(service.booking_time).toLocaleString('pl-PL', { timeZone: 'UTC' })
          }));
    
          setReservations(formattedData);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    
      fetchReservations();
    }, [cookies.email]);
  

    return (
        <main className="flex flex-col bg-white">
            <Header />

            <section className="flex gap-5 self-center px-2.5 py-2.5 mt-11 rounded-3xl bg-stone-200 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          {reservations.map((reservation, index) => (
            <ReservationHistoryItem key={index} {...reservation} />
          ))}
        </section>
            <ProfileForm/>

            <section className="flex gap-5 justify-between items-start mt-20 w-full font-light max-md:flex-wrap max-md:pr-5 max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 justify-between text-2xl text-center text-black whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                    
                </div>
                <div className="flex flex-col mt-4 text-xl leading-6 text-right">
                    <p className="underline text-zinc-800">
                        {cookies.email}
                    </p>
                    <p className="self-end mt-8 text-red-600 underline">Usuń konto</p>
                </div>
            </section>

            <Footer />
        </main>
    );
}

export default ProfilEditing;