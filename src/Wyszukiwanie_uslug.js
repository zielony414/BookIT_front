import React, { useState, useEffect} from "react";
import "./output.css";

function Wyszukiwanie_uslug() {

  useEffect(() => {
    fetchData();
  }, []); // Pusta tablica zależności sprawia, że useEffect zostanie wywołany tylko raz

  const fetchData = () => {
    console.log("Pobieranie danych..."); // Dodany console.log
    Promise.all([
      fetch("/api/nav_items").then((res) => res.json()),
      fetch("/api/strona_wyszukiwania_kategorie").then((res) => res.json()),
      fetch("/api/strona_wyszukiwania_miasta").then((res) => res.json()),
    ])
      .then(([navItemsData, categoriesData, citiesData]) => {
        setData(navItemsData.nav_items);
        setCategories(categoriesData.categories);
        setCities(citiesData.cities);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const NavLink = ({ children }) => {
    return <div className="justify-center">{children}</div>;
  };

  const Dropdown = ({ label, value, options, onChange }) => (
    <div>
      <div className="flex gap-5 justify-between">
        <label className="text-base text-black">{label}:</label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm font-light text-zinc-800"
        >
          {options && options.length > 0 ? (
            options.map((option, index) => (
              <option 
                key={index} 
                value={option}>
                {option}
              </option>
            ))
          ) : (
            <option value="">Brak opcji</option>
          )}
        </select>
      </div>
    </div>
  );
  

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
      <div className="flex justify-center items-center flex-col text-center mt-10">
        <div className="flex relative flex-col items-center self-stretch px-16 pb-2.5  w-full text-center mix-blend-overlay bg-stone-200 max-md:px-5 max-md:max-w-full">
          <div className="flex z-10 gap-5 w-full max-w-[1075px] max-md:flex-wrap max-md:max-w-full justify-center items-center ">
            {data &&
              data.map((item, index) => (
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
      <section className="flex gap-5 justify-between items-center self-stretch px-10 py-px mt-10 mix-blend-overlay bg-stone-200 max-md:flex-wrap max-md:px-5">
        <article className="flex flex-col self-stretch my-auto whitespace-nowrap">
          <Dropdown
            label="Kategoria"
            value={categories}
            options={categories}
            onChange={setCategories}
          />
        </article>

        <section className="flex overflow-hidden relative flex-col justify-center self-stretch px-14 py-6 whitespace-nowrap aspect-[5.77] stroke-[1px] stroke-black w-[352px] max-md:px-5">
          <article className="flex relative flex-col">
            <Dropdown
              label="Miasto"
              value={cities}
              options={cities}
              onChange={setCities}
            />
          </article>
        </section>

        <article className="flex flex-col self-stretch my-auto">
          <Dropdown
            label="Sortowanie"
            value={sorting}
            options={["Najwyższa ocena", "Najwięcej opinii", "Wyróżnione", "Cena: od najniższej", "Cena: od najwyższej"]}
            onChange={setSorting}
          />
        </article>
      </section>
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
