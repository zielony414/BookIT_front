import * as React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Logowanie() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/rejestracja');
  };

  const scrollToLoginForm = () => {
    const formHeader = document.getElementById("form-header");
    if (formHeader) {
      formHeader.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFinish = () => {
    navigate('/');
  };
  

  const handleUserLoginSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await axios.post("book-it-back.vercel.app"+'/api/strona_logowania/user', {
        user_login: email,
        user_password: password
      });

      if (response.status === 200) {
        alert(response.data.message);
        // Handle successful login (e.g., redirect to another page)
        navigate('/');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Błąd logowania!', error);
      alert('Niepoprawne dane logowania. Spróbuj ponownie.');
    }
  };

  const handleCompanyLoginSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.company_email.value;
    const password = event.target.company_password.value;

    try {
      const response = await axios.post('book-it-back.vercel.app'+'/api/strona_logowania/company', {
        company_login: email,
        company_password: password
      });

      if (response.status === 200) {
        alert(response.data.message);
        // Handle successful login (e.g., redirect to another page)
        navigate('/company_manage');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Błąd logowania!', error);
      alert('Niepoprawne dane logowania. Spróbuj ponownie.');
    }
  };

  const Header = () => (
    <div className="flex gap-5 justify-between px-5 py-1.5 w-full text-xs text-center text-black mix-blend-darken bg-stone-200 max-md:flex-wrap max-md:max-w-full">
      <img
        loading="lazy"
        src="bookit-logo.png"
        alt="Logo"
        className="shrink-0 h-16 w-auto" 
        role = "button"
        onClick={() => navigate('/')}
      />
      <div className="flex gap-3.5 items-start my-auto">
        <button onClick={() => navigate('/logowanie')} className="justify-center px-2.5 py-3.5 bg-white rounded-md border-b border-black border-solid">
          Zaloguj się/załóż konto
        </button>
        <button onClick={() => navigate('/rejestracja_firmy')} className="justify-center px-2.5 py-3.5 bg-white rounded-md border-b border-black border-solid">
          Dodaj swoją firmę
        </button>
      </div>
    </div>
  );

  const Button = ({ children, onClick, type = 'button' }) => {
    return (
      <button type={type} onClick={onClick} className="bg-white border border-black border-solid" style={{ borderRadius: '1rem', marginLeft: "50px", width: "150px", height: "50px" }}>
        {children}
      </button>
    );
  };

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

  const Hero = () => (
    <div className="flex flex-col bg-white">
      <main className="flex flex-col self-center px-5 mt-40 w-full max-w-[1027px] max-md:mt-10 max-md:max-w-full">
        <h1 className="self-center text-5xl font-light leading-6 text-black max-md:text-4xl" style={{ marginBottom: "50px" }}>
          LOGOWANIE DLA UŻYTKOWNIKA
        </h1>
        <form onSubmit={handleUserLoginSubmit}>
          <div style={{marginLeft: "350px"}}>
          <div className="flex gap-5 self-center mt-3.5 font-light max-md:flex-wrap max-md:max-w-full">
            <Input label="Email" placeholder="Wprowadź swój email" name="email" />
          </div>
          <div className="flex flex-col gap-5 self-center mt-3.5 font-light max-md:flex-wrap max-md:max-w-full">
            <Input label="Hasło" placeholder="Wprowadź swoje hasło" name="password" type="password" />
          </div>
          </div>
          <div className="flex gap-5 max-md:flex-col max-md:gap-0" style={{ marginLeft: "500px" }}>
            <div className="flex flex grow font-light" style={{ marginTop: "40px" }}>
              <Button type="button" onClick={handleRegisterClick}>Nie masz konta? Zarejestruj się!</Button>
              <Button type="button" onClick={scrollToLoginForm}>BookIt dla firm</Button>
              <Button type="submit">Zaloguj</Button>
            </div>
          </div>
        </form>

        <h2 id="form-header" className="self-center mt-96 text-5xl font-light leading-6 text-black max-md:mt-10 max-md:max-w-full max-md:text-4xl" style={{ marginBottom: "50px", marginTop: "100px" }}>
          LOGOWANIE DLA FIRM
        </h2>
        <form onSubmit={handleCompanyLoginSubmit}>
        <div style={{marginLeft: "350px"}}>
          <div className="flex gap-5 self-center mt-3.5 font-light max-md:flex-wrap max-md:max-w-full">
            <Input label="Email" placeholder="Wprowadź swój email" name="company_email" />
          </div>
          <div className="flex flex-col gap-5 self-center mt-3.5 font-light max-md:flex-wrap max-md:max-w-full">
            <Input label="Hasło" placeholder="Wprowadź swoje hasło" name="company_password" type="password" />
          </div>
          </div>
          <div className="flex gap-5 max-md:flex-col max-md:gap-0" style={{ marginLeft: "800px" }}>
            <div className="flex flex grow font-light" style={{ height: "40px", marginTop: "40px" }}>
              <Button type="submit" style={{ width: "200px" }}>Zaloguj</Button>
            </div>
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

export default Logowanie;
