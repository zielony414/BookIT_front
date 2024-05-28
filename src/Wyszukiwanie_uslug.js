import React, { useState, useEffect } from "react";

function Wyszukiwanie_uslug() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sorting, setSorting] = useState("Najwyższa ocena");

  useEffect(() => {
    fetchData();
    handleFilter({ preventDefault: () => {} });
  }, []);

  const fetchData = () => {
    console.log("Pobieranie danych...");
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

  const handleFilter = async (e) => {
    e.preventDefault();

    const filterData = {
      kategoria: selectedCategory,
      miasto: selectedCity,
      sortowanie: sorting,
    };

    try {
      const response = await fetch("/api/wyszukiwanie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterData),
      });

      if (response.ok) {
        const filteredData = await response.json();
        setFilteredData(filteredData.companies); // Accessing the 'companies' array
        console.log(filteredData); // Handle the filtered data
      } else {
        console.error("Failed to fetch filtered data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
              <option key={index} value={option}>
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

  const Hero = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = async () => {
      const filterData = {
        nazwa: searchTerm,
      };

      try {
        const response = await fetch("/api/wyszukiwanie_po_nazwie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filterData),
        });

        if (response.ok) {
          const filteredData = await response.json();
          setFilteredData(filteredData.companies);
          console.log('searchbar');
          console.log(filteredData);
        } else {
          console.error("Failed to fetch filtered data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleKeyDown = async (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevent the default form action (e.g. page reload)
        await handleSearch(); // Call the search function
      }
    };

    return (
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
          Odkrywaj najlepszych specjalistów wokół siebie, <br /> wszystko czego potrzebujesz w jednym miejscu
        </div>
        <form className="flex relative gap-5 px-6 py-2 mt-7 tracking-normal bg-white leading-[90%] rounded-full text-stone-200 max-md:flex-wrap w-[450px] max-w-md">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/076444189e401938838e6a6b8094a3e4bcb51ab5cdafc308724bbfb8f96bb2a8?apiKey=d10d36f0508e433185a32e898689ca50&"
            alt="Search icon"
            className="shrink-0 aspect-square w-[45px]"
            onClick={handleSearch}
            role="button"
          />
          <label htmlFor="search" className="sr-only">
            Szukaj usług lub biznesów
          </label>
          <input
            type="text"
            id="search"
            placeholder="Szukaj usług"
            aria-label="Szukaj usług"
            className="flex-grow text-black text-lg w-[350px]"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyDown={handleKeyDown} // Add onKeyDown event handler
          />
        </form>
        <section className="flex gap-5 justify-between items-center self-stretch px-10 py-px mt-10 mix-blend-overlay bg-stone-200 max-md:flex-wrap max-md:px-5">
          <article className="flex flex-col self-stretch my-auto whitespace-nowrap">
            <Dropdown
              label="Kategoria"
              value={selectedCategory}
              options={["Wszystkie", ...categories]}
              onChange={setSelectedCategory}
            />
          </article>

          <section className="flex overflow-hidden relative flex-col justify-center self-stretch px-14 py-6 whitespace-nowrap aspect-[5.77] stroke-[1px] stroke-black w-[352px] max-md:px-5">
            <article className="flex relative flex-col">
              <Dropdown
                label="Miasto"
                value={selectedCity}
                options={["Wszystkie", ...cities]}
                onChange={setSelectedCity}
              />
            </article>
          </section>

          <article className="flex flex-col self-stretch my-auto">
            <Dropdown
              label="Sortowanie"
              value={sorting}
              options={["Najwyższa ocena", "Najwięcej opinii", "Od najnowszych"]}
              onChange={setSorting}
            />
          </article>
          <button
            onClick={handleFilter}
            className="bg-white border border-black px-4 py-2 rounded"
          >
            Filtruj
          </button>
        </section>
      </div>
    );
  };

  const MidBody = () => {
    return (
      <div className="flex flex-col m-4 p-4">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div
              key={index}
              className="flex items-center md-4 bg-stone-200 rounded p-4"
              style={{ marginBottom: "20px" }}
            >
              <div className="w-50vw h-10vh flex items-center rounded"> {/* Użyj jednostek vw i vh */}
                <img
                  alt="Logo"
                  src={item.logo}
                  style={{ width: "450px", height: "auto" }} // Ustaw stały rozmiar pikselowy
                />
              </div>
              <div className="ml-4">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Kategoria: {item.category}</p>
                <p>
                  Adres: {item.city}, {item.address}
                </p>
                <p>Oceny: {item.reviews_no}</p>
                <p>Średnia ocen: {item.avg_rating}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="flex justify-center text-lg font-bold">Brak Wyników</p>
        )}
      </div>
    );
  };
  
  

  const Footer = () => {
    let cas = ''; 
    if(filteredData.length == 0 || filteredData.length == 1) cas = "flex flex-col items-start px-8 pt-5 pb-3.5 mt-auto w-full text-white bg-black max-md:px-5 max-md:max-w-full fixed bottom-0";
    else  cas = "flex flex-col items-start px-8 pt-5 pb-3.5 w-full text-white bg-black max-md:px-5 max-md:max-w-full";
    return (
      <footer className={cas}>
        <nav className="flex gap-5 justify-between text-base">
          <div className="flex gap-4">
            <NavLink>O nas</NavLink>
            <NavLink>Kontakt</NavLink>
          </div>
          <NavLink>FAQ</NavLink>
        </nav>
        <div className="shrink-0 self-stretch mt-2 bg-white border border-white border-solid h-[5px] max-md:max-w-full" />
        <div className="justify-center mt-4 text-xs font-light">
          © 2024 PRZ All Rights Reserved
        </div>
      </footer>
    );
  };
  

  return (
    <>
      <Header />
      <Hero />
      <MidBody />
      <Footer />
    </>
  );
}

export default Wyszukiwanie_uslug;
