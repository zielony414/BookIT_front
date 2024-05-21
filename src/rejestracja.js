import React from "react";
import "./output.css";


function Rejestracja(){
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

const Button = ({ children }) => {
  return (
    <button className="bg-white border border-black border-solid" style={{borderRadius: '1rem', width: "100px", height: "50px", marginRight: "50px"}}>
      {children}
    </button>
  );
};

const Header = () => (
  <div className="flex gap-5 justify-between px-5 py-1.5 w-full text-xs text-center text-black mix-blend-darken bg-stone-200 max-md:flex-wrap max-md:max-w-full" style={{ marginBottom: "50px" }}>
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
    <main className="flex flex-col self-center px-5 mt-40 w-full max-w-[1027px] max-md:mt-10 max-md:max-w-full">
        <h1 className="self-center text-5xl font-light leading-6 text-black max-md:text-4xl" style={{ marginBottom: "50px" }}>
          REJESTRACJA
        </h1>
        <div className="flex gap-5 self-center mt-14 font-light max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <Input label="Imię" placeholder="Wprowadź swoje imię" />
          <Input label="Nazwisko" placeholder="Wprowadź swoje nazwisko" />
        </div>
        <div className="flex gap-5 self-center mt-3.5 font-light max-md:flex-wrap max-md:max-w-full">
          <Input label="Email" placeholder="Wprowadź swój email" />
          <Input label="Numer telefonu" placeholder="Wprowadź swój numer telefonu" />
        </div>
        <div className="flex gap-5 self-center mt-3.5 font-light max-md:flex-wrap max-md:max-w-full">
          <Input label="Haslo" placeholder="Wprowadź swoje hasło" />
          <Input label="Powtórz hasło" placeholder="Powtórz swoje hasło" />
        </div>
        <div className="flex gap-5 self-center mt-3.5 font-light max-md:flex-wrap max-md:max-w-full">
        <Input label="Miasto" placeholder="Wprowadź miasto, w którym mieszkasz" />
          <div className="flex flex-col flex-1 max-md:max-w-full">
            <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{marginLeft: "50px"}}>
              Płeć
            </label>
            <div className="justify-center items-start px-4 py-3 mt-1.5 text-sm bg-white border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full" style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px" , marginLeft: "50px"}} >
              <div className="flex justify-between text-zinc-400">
                Wprowadź swoją płeć
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/26422612adb9f6525956774648aabfcf27532fbce63df40aceb5d4ef6af1d014?apiKey=fa72ebbe438d43ed95dbc11d9e8b3cf8&"
                  alt="Arrow down"
                  className="shrink-0 self-start w-5 aspect-[2.22] fill-black"
                  style={{marginTop: "7px", marginRight: "10px",  cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
          </div>
        <div className="self-center mt-3.5 max-md:max-w-full" style={{marginBottom: "100px"}}>
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col grow font-light max-md:mt-10 max-md:max-w-full">
                  <div className="self-start mt-10 leading-[120%]">
                    Akceptuje wszelkie umowy i warunki*
                  </div>
                  <div className="self-start mt-5 leading-6">
                    Wyrażam chęć na przesyłanie korespondencji na adres mailowy*
                  </div>
              </div>
              <div className="flex flex-col grow font-light" style={{width: "100px", height: "80px", marginTop: "30px", marginLeft: "50px"}}>
                <Button>Dalej</Button>
              </div>
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
export default Rejestracja;


