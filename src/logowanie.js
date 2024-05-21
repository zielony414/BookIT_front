import * as React from "react";
import { useNavigate } from 'react-router-dom';


function Logowanie(){

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
const Header = () => (
    <div className="flex gap-5 justify-between px-5 py-1.5 w-full text-xs text-center text-black mix-blend-darken bg-stone-200 max-md:flex-wrap max-md:max-w-full" style={{ marginBottom: "100px" }}>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5de238929a006710f45648794a40a0622297cdbc516015bb550d2db71268e5c?apiKey=d10d36f0508e433185a32e898689ca50&"
        alt="Logo"
        className="shrink-0 max-w-full aspect-[4.17] w-[262px]"
      />
      <div className="flex gap-3.5 items-start my-auto">
        <button className="justify-center px-2.5 py-1.5 bg-white rounded-md border-b border-black border-solid">
          Zaloguj się/załóż konto
        </button>
        <button className="justify-center px-2.5 py-1.5 bg-white rounded-md border-b border-black border-solid">
          Dodaj swoją firmę
        </button>
      </div>
    </div>
  );

  const Button = ({ children, onClick }) => {
    return (
      <button onClick={onClick} className="bg-white border border-black border-solid" style={{borderRadius: '1rem', marginLeft: "50px", width: "150px", height: "50px"}}>
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

  const Input = ({ label, placeholder }) => {
    return (
      <div className="flex flex-col flex-1 max-md:max-w-full">
        <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px"}}>
          {label}
        </label>
        <input
          type="text"
          className="justify-center items-start px-4 py-3 mt-1.5 text-sm bg-white border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full"
          placeholder={placeholder}
          style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px" , marginLeft: "50px"}} 
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
        <div className="flex gap-5 self-center mt-3.5 font-light max-md:flex-wrap max-md:max-w-full">
          <Input label="Email" placeholder="Wprowadź swój email" />
        </div>
        <div className="flex flex-col gap-5 self-center mt-3.5 font-light max-md:flex-wrap max-md:max-w-full">
          <Input label="Haslo" placeholder="Wprowadź swoje hasło" />
        </div>
          <div className="flex gap-5 max-md:flex-col max-md:gap-0" style={{marginLeft: "500px"}}>
              <div className="flex flex grow font-light" style={{ marginTop: "40px"}}>
                <Button onClick={handleRegisterClick}>Nie masz konta? 
                  Zarejestruj się!
                </Button>
                <Button onClick={scrollToLoginForm}>BookIt dla firm</Button>
                <Button>Zaloguj</Button>
              </div>
          </div>
       
        <h2 id="form-header" className="self-center mt-96 text-5xl font-light leading-6 text-black max-md:mt-10 max-md:max-w-full max-md:text-4xl"style={{ marginBottom: "50px", marginTop: "100px" }}>
          LOGOWANIE DLA FIRM
        </h2>
        <div className="flex gap-5 self-center mt-3.5 font-light max-md:flex-wrap max-md:max-w-full">
          <Input label="Email" placeholder="Wprowadź swój email" />
        </div>
        <div className="flex gap-5 self-center mt-3.5 font-light max-md:flex-wrap max-md:max-w-full">
          <Input label="Haslo" placeholder="Wprowadź swoje hasło" />
        </div>
        <div className="flex gap-5 max-md:flex-col max-md:gap-0" style={{marginLeft: "800px"}}>
              <div className="flex flex grow font-light" style={{height: "40px", marginTop: "40px"}}>
                <Button style={{ width: "200px" }}>Zaloguj</Button>
              </div>
          </div>
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

};
export default Logowanie;