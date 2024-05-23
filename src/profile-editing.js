import React, { useState } from 'react';
import "./output.css";
import { Link } from "react-router-dom";
  

function Header() { 
  
  const [email, setEmail] = useState('');
  const [nrTelefonu, setNrTelefonu] = useState('');
  const [miasto, setMiasto] = useState('');
  const [plec, setPlec] = useState('');
  const [stareHaslo, setStareHaslo] = useState('');
  const [noweHaslo, setNoweHaslo] = useState('');
  const [powtorzNoweHaslo, setPowtorzNoweHaslo] = useState('');
  
    return ( 
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

const Footer = () => {
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

  function BookingHistory({ bookings }) {
    return (
      <section className="flex flex-col self-center px-5 mt-14 w-full max-w-6xl max-md:mt-10 max-md:max-w-full">
        <h2 className="text-5xl font-light leading-6 text-black max-md:max-w-full max-md:text-4xl">
          HISTORIA REZERWACJI
        </h2>
        Tutaj bedzie historia rezerwacji
      </section>
    );
  }
  

  function ProfileForm({ onSubmit }) {    

    return (
      <form className="mt-16 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <h2 className="text-2xl font-light leading-6 text-black max-md:max-w-full max-md:text-4xl">
          EMAIL
        </h2>
        <label htmlFor="email" className="sr-only">Email</label>
            <input
                className="label justify-center items-start px-5 py-9 text-sm bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full"
                id="email"
                type="email"
                placeholder="kontakt@roksa.pl"
                aria-label="Email"
            />
            <h2 className="text-2xl font-light leading-6 text-black max-md:max-w-full max-md:text-4xl mt-3">
          
          NR TELEFONU
        </h2>
            <label htmlFor="telephone" className="sr-only">Numer telefonu</label>
            <input
              className="label justify-center items-start px-5 py-9 text-sm bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full"
              id="telephone"
              type="text"
              placeholder="+48 420 213 769"
              aria-label="Numer telefonu"
            />
            <label htmlFor="city" className="sr-only">Miasto</label>
            <h2 className="text-2xl font-light leading-6 text-black max-md:max-w-full max-md:text-4xl mt-3">
          MIASTO
        </h2>
            <input
              className="label justify-center items-start px-5 py-9 text-sm bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full"
              id="city"
              type="text"
              placeholder="Lipinki Łużyckie"
              aria-label="Miasto"
            />
            <h2 className="text-2xl font-light leading-6 text-black max-md:max-w-full max-md:text-4xl mt-3">
          PŁEĆ
        </h2>
            <label htmlFor="gender" className="sr-only">Płeć</label>
            <select
                className="label justify-center items-start px-5 py-9 text-sm whitespace-nowrap bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full"
                id="gender"
                aria-label="Płeć"
                >
                <option value="Mezczyzna">Mężczyzna</option>
                <option value="Kobieta">Kobieta</option>
            </select>
          </div>
          
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <label htmlFor="oldPassword" className="sr-only">Stare hasło</label>
            <h2 className="text-2xl font-light leading-6 text-black max-md:max-w-full max-md:text-8xl mt-0">
          STARE HASŁO
            </h2>
            <input
              className="label justify-center items-start px-5 py-9 text-sm bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full"
              id="oldPassword"
              type="password"
              placeholder="***************"
              aria-label="Stare hasło"
            />
            <h2 className="text-2xl font-light leading-6 text-black max-md:max-w-full max-md:text-4xl mt-3">
          NOWE HASŁO
        </h2>
            <label htmlFor="newPassword" className="sr-only">Nowe hasło</label>
            <input
              className="label justify-center items-start px-5 py-9 text-sm bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full"
              id="newPassword"
              type="password"
              placeholder="***************"
              aria-label="Nowe hasło"
            />
            <h2 className="text-2xl font-light leading-6 text-black max-md:max-w-full max-md:text-4xl mt-3">
          POWTÓRZ NOWE HASŁO
        </h2>
            <label htmlFor="repeatNewPassword" className="sr-only">Powtórz nowe hasło</label>
            <input
              className="label justify-center items-start px-5 py-9 text-sm bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full"
              id="repeatNewPassword"
              type="password"
              placeholder="***************"
              aria-label="Powtórz nowe hasło"
            />
          </div>
        </div>
      </form>
    );
  }

  function ProfilEditing() {

    const bookings = [
        {
            name: "Holistic Body & Soul",
            address: "Rzeszów, ul. Mrokawska 14",
            service: "Terapia olejkami",
            price: "140",
            date: "15.02.2024 r., 11:00",
            rating: "4.5",
            ratingImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/aeabdacdf00eece9a8c6d82aa040143c73766f01fa42c139624d348a78d58522?apiKey=fafb1adb41a64ae8909ced39c83205ff&",
        },
        {
            name: "Mister Dappler",
            address: "Rzeszów, ul. Staroniwska 41A",
            service: "Strzyżenie męskie",
            price: "około 60",
            date: "15.05.2024 r., 11:00",
            rating: "",
            ratingImage: "",
        },
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

            <BookingHistory bookings={bookings} />

            <section className="mt-16 text-5xl font-light leading-6 text-black max-md:mt-10 max-md:max-w-full max-md:text-4xl">
                EDYTUJ PROFIL
            </section>
            <ProfileForm/>

            <section className="flex gap-5 justify-between items-start mt-20 w-full font-light max-md:flex-wrap max-md:pr-5 max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 justify-between text-2xl text-center text-black whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                    <button className="justify-center items-center px-7 py-1.5 bg-white border border-black border-solid rounded-[30px] max-md:px-5">
                        Anuluj
                    </button>
                    <button
                        className="justify-center items-center px-7 py-1.5 bg-white border border-black border-solid rounded-[30px] max-md:px-5"
                    >
                        Zapisz
                    </button>
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