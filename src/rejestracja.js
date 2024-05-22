import React, { useState } from "react";
import "./output.css";
import { useNavigate } from 'react-router-dom';

function Rejestracja() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    city: '',
    gender: '',
    termsAccepted: false,
    newsletterAccepted: false
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
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
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setError(null);
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

  const Input = ({ label, placeholder, name, type = "text" }) => {
    return (
      <div className="flex flex-col flex-1 max-md:max-w-full">
        <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
          {label}
        </label>
        <input
          name={name}
          type={type}
          className="justify-center items-start px-4 py-3 mt-1.5 text-sm bg-white border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full"
          placeholder={placeholder}
          style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }} 
        />
      </div>
    );
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

  const Hero = () => (
    <div className="flex flex-col bg-white">
      <main className="flex flex-col self-center px-5 mt-20 w-full max-w-[1027px] max-md:mt-10 max-md:max-w-full">
        <h1 className="self-center text-5xl font-light leading-6 text-black max-md:text-4xl" style={{ marginBottom: "20px" }}>
          REJESTRACJA
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{marginLeft: "120px"}}>
          <div className="flex gap-5 self-center mt-10 font-light max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <Input label="Imię" name="name" placeholder="Wprowadź swoje imię" />
            <Input label="Nazwisko" name="surname" placeholder="Wprowadź swoje nazwisko" />
          </div>
          <div className="flex gap-5 self-center mt-3.5 font-light max-md:flex-wrap max-md:max-w-full">
            <Input label="Email" name="email" placeholder="Wprowadź swój email" />
            <Input label="Numer telefonu" name="phone" placeholder="Wprowadź swój numer telefonu" />
          </div>
          <div className="flex gap-5 self-center mt-3.5 font-light max-md:flex-wrap max-md:max-w-full">
            <Input label="Hasło" name="password" placeholder="Wprowadź swoje hasło" type="password" />
            <Input label="Powtórz hasło" name="confirmPassword" placeholder="Powtórz swoje hasło" type="password" />
          </div>
          <div className="flex gap-5 self-center mt-3.5 font-light max-md:flex-wrap max-md:max-w-full">
            <Input label="Miasto" name="city" placeholder="Wprowadź miasto, w którym mieszkasz" />
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                Płeć
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="justify-center items-start px-4 py-3 mt-1.5 text-sm bg-white border border-solid border-zinc-400 text-zinc-800 max-md:pr-5 max-md:max-w-full"
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }}
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
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="mr-2"
                    style={{marginRight: "10px"}}
                  />
                  Akceptuję wszelkie umowy i warunki*
                </div>
                <div className="flex items-center mt-5 leading-6">
                  <input
                    type="checkbox"
                    name="newsletterAccepted"
                    checked={formData.newsletterAccepted}
                    onChange={handleChange}
                    className="mr-2"
                    style={{marginRight: "10px"}}
                  />
                  Wyrażam chęć na przesyłanie korespondencji na adres mailowy*
                </div>
              </div>
              <div className="flex flex-col grow font-light" style={{ width: "100px", height: "80px", marginTop: "30px", marginLeft: "50px" }}>
                <Button type="submit">Dalej</Button>
              </div>
            </div>
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          {message && <div className="text-green-500 text-center">{message}</div>}
          </div>
        </form>
      </main>
    </div>
  );

  return (
    <>
      <Header />
      <Hero />
      <Footer />
    </>
  );
}

export default Rejestracja;
