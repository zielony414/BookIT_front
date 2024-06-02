import React, { useState } from "react";
import "./output.css";
import { useNavigate } from 'react-router-dom';

function Rejestracja() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [newsletterAccepted, setNewsletterAccepted] = useState(false);

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (setter) => (e) => {
    if (e.target.value.length <= 45) {
      setter(e.target.value);
    }
    
};

const handleEmailChange = handleChange(setEmail);
const handleNameChange = handleChange(setName);
const handleSurnameChange = handleChange(setSurname);
const handlePhoneChange = handleChange(setPhone);
const handelPasswordChange = handleChange(setPassword);
const handleConfirmedPasswordChange = handleChange(setConfirmPassword);
const handleCityChange = handleChange(setCity);
const handleGenderChange = handleChange(setGender);

const handleToggle = (setter) => () => {
  setter((prev) => !prev);
};

const handleTermsAcceptedChange = handleToggle(setTermsAccepted);
const handleNewsletterAcceptedChange = handleToggle(setNewsletterAccepted);

  const handleSubmit = async () => {
    const newUser ={
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      city: city,
      password: password,
      confirmPassword: confirmPassword,
      gender: gender,
      termsAccepted: termsAccepted,
      newsletterAccepted: newsletterAccepted
    }

    if (password !== confirmPassword) {
      setError('Hasła nie są takie same.');
      setMessage(null);
      return;
    }

    try {
      const response = await fetch('/api/user_registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setError(null);
        //clear from fields
        setName('');
        setSurname('');
        setPassword('');
        setConfirmPassword('');
        setCity('');
        setGender('');
        setPhone('');
        setNewsletterAccepted(false);
        setTermsAccepted(false);
        setEmail('');
        navigate('/logowanie');
      } else {
        setError(data.error);
        setMessage(null);
      }
    } catch (err) {
      console.error('Błąd połączenia z serwerm!', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  const handleLoginClick = () => {
    navigate('/logowanie');
  };

  const Button = ({ children, onClick, type = 'button' }) => (
    <button type={type} onClick={onClick} className="bg-white border border-black border-solid" style={{ borderRadius: '1rem', width: "100px", height: "50px", marginRight: "50px" }}>
      {children}
    </button>
  );

  const Header = () => (
    <div className="flex gap-5 justify-between px-5 py-1.5 w-full text-xs text-center text-black mix-blend-darken bg-stone-200 max-md:flex-wrap max-md:max-w-full" style={{ marginBottom: "50px" }}>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5de238929a006710f45648794a40a0622297cdbc516015bb550d2db71268e5c?apiKey=d10d36f0508e433185a32e898689ca50&"
        alt="Logo"
        className="shrink-0 max-w-full aspect-[4.17] w-[262px]"
      />
      <div className="flex gap-3.5 items-start my-auto">
        <button onClick={handleLoginClick} className="justify-center px-2.5 py-1.5 bg-white rounded-md border-b border-black border-solid">
          Zaloguj się/załóż konto
        </button>
        <button className="justify-center px-2.5 py-1.5 bg-white rounded-md border-b border-black border-solid">
          Dodaj swoją firmę
        </button>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="flex flex-col items-start px-8 pt-5 pb-3.5 mt-24 w-full text-white bg-black max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <nav className="flex gap-5 justify-between text-base">
        <div className="flex gap-4">
          <div>O nas</div>
          <div>Kontakt</div>
        </div>
        <div>FAQ</div>
      </nav>
      <div className="shrink-0 self-stretch mt-2 bg-white border border-white border-solid h-[5px] max-md:max-w-full"></div>
      <div className="justify-center mt-4 text-xs font-light">
        © 2024 PRZ All Rights Reserved
      </div>
    </footer>
  );



  return (
    <>
      <Header />
      <div className="flex flex-col bg-white">
      <main className="flex flex-col self-center px-5 mt-20 w-full max-w-[1027px] max-md:mt-10 max-md:max-w-full">
        <h1 className="self-center text-5xl font-light leading-6 text-black max-md:text-4xl" style={{ marginBottom: "20px" }}>
          REJESTRACJA
        </h1>

          <div style={{marginLeft: "120px"}}>
          <div className="flex gap-5 self-center mt-10 font-light max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full">
                  Imię
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={name} onChange={handleNameChange} type="text" placeholder="Imię"               
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px" }}/>
            </div>
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full">
                  Nazwisko
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={surname} onChange={handleSurnameChange} type="text" placeholder="Nazwisko"               
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px"}}/>
            </div>
          </div>
          <div className="flex gap-5 self-center mt-3.5 font-light max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full">
                  Email
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={email} onChange={handleEmailChange} type="email" placeholder="Email"               
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px" }}/>
            </div>
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full">
                  Numer Telefonu
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={phone} onChange={handlePhoneChange} type="text" placeholder="Telefon"               
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px" }}/>
            </div>
          </div>
          <div className="flex gap-5 self-center mt-3.5 font-light max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full">
                  Hasło (min. 8 znaków)
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={password} onChange={handelPasswordChange} type="password" placeholder="Haśło"               
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px" }}/>
            </div>
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full">
                  Potwierdź hasło
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={confirmPassword} onChange={handleConfirmedPasswordChange} type="password" placeholder="Potwierdź hasło"               
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px" }}/>
            </div>
          </div>
          <div className="flex gap-5 self-center mt-3.5 font-light max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" >
                  Miejscowość
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={city} onChange={handleCityChange} type="text" placeholder="Miejscowość"               
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px" }}/>
            </div>
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" >
                Płeć
              </label>
              <select
                name="gender"
                value={gender}
                onChange={handleGenderChange}
                className="justify-center items-start px-4 py-3 mt-1.5 text-sm bg-white border border-solid border-zinc-400 text-zinc-800 max-md:pr-5 max-md:max-w-full"
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px" }}
              >
                <option value="">Wybierz swoją płeć</option>
                <option value="Mezczyzna">Mężczyzna</option>
                <option value="Kobieta">Kobieta</option>
              </select>
            </div>
          </div>
          <div className="self-center mt-5 max-md:max-w-full" style={{ marginBottom: "50px" }}>
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col grow font-light max-md:mt-10 max-md:max-w-full">
                <div className="flex items-center mt-5 leading-[120%]">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={termsAccepted}
                    onChange={handleTermsAcceptedChange}
                    className="mr-2"
                    style={{marginRight: "10px"}}
                  />
                  Akceptuję wszelkie umowy i warunki*
                </div>
                <div className="flex items-center mt-5 leading-6">
                  <input
                    type="checkbox"
                    name="newsletterAccepted"
                    checked={newsletterAccepted}
                    onChange={handleNewsletterAcceptedChange}
                    className="mr-2"
                    style={{marginRight: "10px"}}
                  />
                  Wyrażam chęć na przesyłanie korespondencji na adres mailowy*
                </div>
              </div>
              <div className="flex flex-col grow font-light" style={{ width: "100px", height: "80px", marginTop: "30px", marginLeft: "50px" }}>
              <button
                className="justify-center px-7 py-1.5 font-light bg-white border border-black border-solid rounded-[30px] max-md:px-5"
                tabIndex="0" onClick={handleSubmit}
              >
                Zarejestruj
              </button>
              </div>
            </div>
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          {message && <div className="text-green-500 text-center">{message}</div>}
          </div>
      </main>
    </div>
      <Footer />
    </>
  );
}

export default Rejestracja;
