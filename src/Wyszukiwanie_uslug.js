import React, { useState, useEffect, useRef } from "react";
import "./output.css";

function Wyszukiwanie_uslug() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/nav_items") // Poprawiony endpoint
      .then((res) => res.json())
      .then((data) => {
        setData(data.nav_items); // Ustaw tablicę danych
        console.log(data);
      });
  }, []);

  const NavLink = ({ children }) => {
    return React.createElement(
      "div",
      { className: "justify-center" },
      children
    );
  };

  const Header = () => (
    <div className="flex gap-5 justify-between px-5 py-1.5 w-full text-xs text-center text-black mix-blend-darken bg-stone-200 max-md:flex-wrap max-md:max-w-full">
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

  const Hero = () => (
    <div className="flex overflow-hidden relative flex-col items-center px-5 pt-8 pb-16 w-full text-xl text-black min-h-[450px] max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/10fbef2836b96a649d95600569a3c9f1049330147f43590e33d4d81ff4c7ccd4?apiKey=d10d36f0508e433185a32e898689ca50&"
        alt="Background"
        className="object-cover absolute inset-0 w-full h-full"
      />
      <div className="relative text-5xl font-medium text-center max-md:max-w-full max-md:text-4xl">
        Zarezerwuj to co potrzebujesz
      </div>
      <div className="relative mt-3.5 text-2xl font-light text-center max-md:max-w-full">
        Odkrywaj najlepszych specjalistów wokół siebie, <br /> wszystko czego
        potrzebujesz w jednym miejscu
      </div>
      <form className="flex relative gap-5 px-6 py-2 mt-7 tracking-normal bg-white leading-[90%] rounded-full text-stone-200 max-md:flex-wrap w-[450px] max-w-md">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/076444189e401938838e6a6b8094a3e4bcb51ab5cdafc308724bbfb8f96bb2a8?apiKey=d10d36f0508e433185a32e898689ca50&"
          alt="Search icon"
          className="shrink-0 aspect-square w-[45px]"
        />
        <label htmlFor="search" className="sr-only">
          Szukaj usług lub biznesów
        </label>
        <input
          type="text"
          id="search"
          placeholder="Szukaj usług dzięki lokalizacji"
          aria-label="Szukaj usług dzięki lokalizacji"
          className="flex-grow text-black text-lg w-[350px]"
        />
      </form>
      <div className="flex justify-center items-center flex-col text-center p-10 mt-10">
        <div className="flex relative flex-col items-center self-stretch p-10 px-16 pb-2.5  w-full text-center mix-blend-overlay bg-stone-200 max-md:px-5 max-md:max-w-full">
          <div className="flex z-10 gap-5 w-full max-w-[1075px] max-md:flex-wrap p-10 max-md:max-w-full justify-center items-center ">
            {data.map((item, index) => (
              <button
                key={index}
                className="flex flex-col justify-center items-center gap-1.5 mt-1.5 mb-1.5"
              >
                <p className="text-lg">{item}</p>
                <span className="text-xs font-light">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Footer = () => {
    return React.createElement(
      "footer",
      {
        className:
          "flex flex-col items-start px-8 pt-5 pb-3.5 mt-24 w-full text-white bg-black max-md:px-5 max-md:mt-10 max-md:max-w-full",
      },
      React.createElement(
        "nav",
        { className: "flex gap-5 justify-between text-base" },
        React.createElement(
          "div",
          { className: "flex gap-4" },
          React.createElement(NavLink, null, "O nas"),
          React.createElement(NavLink, null, "Kontakt")
        ),
        React.createElement(NavLink, null, "FAQ")
      ),
      React.createElement("div", {
        className:
          "shrink-0 self-stretch mt-2 bg-white border border-white border-solid h-[5px] max-md:max-w-full",
      }),
      React.createElement(
        "div",
        { className: "justify-center mt-4 text-xs font-light" },
        "© 2024 PRZ All Rights Reserved "
      )
    );
  };
  return (
    <>
      <Header />
      <Hero />
      <Footer />
    </>
  );
}
export default Wyszukiwanie_uslug;
