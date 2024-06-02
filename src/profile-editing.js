import React, { useEffect, useState } from 'react';
import "./output.css";
import { Link } from "react-router-dom";
  

function Header() { return ( 
  <header className="flex gap-5 justify-between px-7 py-2 w-full text-xs text-center text-black mix-blend-darken bg-stone-200 max-md:flex-wrap max-md:px-5 max-md:max-w-full"> 
      <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1881cefb472dc9fb0438a60e74e4b960e1e91330c8b9f5af952e28bc8f48cf9?apiKey=88baf2bf66c748bd80f6f382a2c28dd5&" 
          alt="Company logo" 
          className="shrink-0 max-w-full aspect-[4.35] w-[230px]" 
      /> 
      <div className="flex gap-4 items-start my-auto"> 
          <Link to="/rezerwacja-logged" className="justify-center px-7 py-1.5 bg-white rounded-md border-b border-black border-solid max-md:px-5"> Zaloguj się/załóż konto </Link> 
          <button className="justify-center px-6 py-1.5 bg-white rounded-md border-b border-black border-solid max-md:px-5"> Dodaj swoją firmę </button> 
      </div>
  </header> 
);
} 

const Footer = () => 
{
    return (
      <footer className="flex flex-col items-start px-10 pt-5 pb-3.5 mt-16 w-full text-white bg-black max-md:px-5 max-md:max-w-full">
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
}

function BookingHistory({ bookings }) 
  {
    return (
      <section className="flex flex-col self-center px-5 mt-14 w-full max-w-6xl max-md:mt-10 max-md:max-w-full">
        <h2 className="text-5xl font-light leading-6 text-black max-md:max-w-full max-md:text-4xl">
          HISTORIA REZERWACJI
        </h2>
        Tutaj bedzie historia rezerwacji
      </section>
    );
}
 
function ReservationHistoryItem({ businessName, location, service, price, date, userRating, upcoming }) {
  return (
    <article className="py-1 pr-1 pl-5 mt-2.5 w-full rounded-3xl bg-white">
      <header className="mb-4">
        <h2 className="text-3xl font-medium">{businessName}</h2>
        <p className="mt-1.5 text-xl">{location}</p>
      </header>
      <section className="mb-4">
        <p className="text-xl">{service}</p>
        <p className="mt-3.5 text-3xl font-semibold">
          <span className="text-2xl font-medium">Cena: {price}</span>
          <span className="text-base font-medium">00</span>
        </p>
      </section>
      <footer className="text-2xl font-medium">
        <p>Data: {date}</p>
        {userRating ? (
          <div className="mt-1.5">
            <span className="block">Twoja ocena:</span>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/aeabdacdf00eece9a8c6d82aa040143c73766f01fa42c139624d348a78d58522?apiKey=fafb1adb41a64ae8909ced39c83205ff&"
              alt="User rating"
              className="max-w-full aspect-[5.56] w-[157px]"
            />
          </div>
        ) : upcoming ? (
          <p className="mt-3">Spotkanie już za 4 dni!</p>
        ) : (
          <div className="mt-2">
            <p className="mb-2.5">Daj znać jak było!</p>
            <button className="justify-center px-2 py-1.5 text-xl text-center whitespace-nowrap border border-black border-solid rounded-[30px]">
              Oceń <br /> spotkanie!
            </button>
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

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      async function fetchUserReservations() {
        try {
          const response = await fetch('/api/user_reservations');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setServices(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
  
      fetchUserReservations();
    }, []);

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
        
        <ul className="service-list">
        {services.length === 0 ? (
          <li>No services found.</li>
        ) : (
          services.map(service => (
            <li key={service.id} className="service-item">
              {service.service_name} - {service.date}
            </li>
          ))
        )}
      </ul>
        
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
  
    const reservations = [
      { businessName: "Holistic Body & Soul", location: "Rzeszów, ul. Mrokawska 14", service: "Terapia olejkami", price: 140, date: "15.02.2024 r., 11:00", userRating: true },
      { businessName: "Mister Dappler", location: "Rzeszów, ul. Staroniwska 41A", service: "Strzyżenie męskie", price: 60, date: "15.05.2024 r., 11:00", userRating: false },
      { businessName: "Mister Dappler", location: "Rzeszów, ul. Staroniwska 41A", service: "Strzyżenie męskie", price: 60, date: "24.06.2024 r., 16:00", userRating: false, upcoming: true },
    ];

    return (
        <main className="flex flex-col bg-white">
            <header className="flex gap-5 justify-between pt-4 pr-14 pb-2.5 pl-4 w-full mix-blend-darken bg-stone-200 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7977c09fbdc7f424f43b6bac313c8c0b846a8486409cc547828cd66becea5790?apiKey=fafb1adb41a64ae8909ced39c83205ff&"
                    alt="Logo"
                    className="shrink-0 max-w-full aspect-[4] w-[269px]"
                />
                <div className="flex gap-5 self-start px-3 py-1 mt-4 text-xl tracking-normal leading-5 bg-white rounded-[50px] text-stone-200 max-md:flex-wrap">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cfe0cb0d32b199a057494cc33d09f8174e60fc1e9c7999c63ddd34527a7a9b32?apiKey=fafb1adb41a64ae8909ced39c83205ff&"
                        alt="Search Icon"
                        className="shrink-0 aspect-[0.93] w-[42px]"
                    />
                    <div className="flex-auto my-auto max-md:max-w-full">
                        Szukaj usług lub biznesów
                    </div>
                </div>
                <div className="justify-center px-4 py-1.5 my-auto text-xs text-center text-black bg-white rounded-md border-b border-black border-solid">
                    Zalogowany użytkownik
                </div>
            </header>

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
                        Anuluj sybskrypcję newslettera
                    </p>
                    <p className="self-end mt-8 text-red-600 underline">Usuń konto</p>
                </div>
            </section>

            <Footer />
        </main>
    );
}

export default ProfilEditing;