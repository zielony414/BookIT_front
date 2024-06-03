import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Wyszukiwanie_uslug() {
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [sorting, setSorting] = useState("Najwyższa ocena");
  const [isFromHomepage, setIsFromHomepage] = useState(0);
  const [isCategorySelected, setIsCategorySelected] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let data = location.state?.filteredData || [];
    setFilteredResults(data);
    console.log("Wyszukiwanie usług");
    if (location.state?.fromHomepage && location.state?.category) {
      setIsCategorySelected(1);
      setIsFromHomepage(1);
      setSelectedCategory(location.state.category);
      console.log(location.state.category);
      handleFilter({ preventDefault: () => {} }, location.state.category);
    }
  }, [location.state]);

  

  useEffect(() => {
    const checkFilteredData = async () => {
      console.log("Sprawdzanie danych...");
      console.log("isFromHomepage:", isFromHomepage);
    console.log("isCategorySelected:", isCategorySelected);
    console.log("selectedCategory:", selectedCategory);
    console.log(location.state.category);

      if (
        !isCategorySelected &&
        !isFromHomepage &&
        !location.state &&
        filteredResults.length === 0
      ) {
        await new Promise((resolve) => setTimeout(resolve, 0)); // Opóźnienie wykonania sprawdzenia
        handleFilter({ preventDefault: () => {} });
      }
    };

    checkFilteredData();
  }, [filteredResults, location.state]);

  useEffect(() => {
    if (isFromHomepage === 0 && isCategorySelected === 0) {
      fetchData();
    }
  }, [isFromHomepage, isCategorySelected]);

  const fetchData = () => {
    console.log("Pobieranie danych...");
    Promise.all([
      fetch("/api/strona_wyszukiwania_kategorie").then((res) => res.json()),
      fetch("/api/strona_wyszukiwania_miasta").then((res) => res.json()),
    ])
      .then(([categoriesData, citiesData]) => {
        setCategories(categoriesData.categories);
        setCities(citiesData.cities);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleFilter = async (e, categoryFromHome = null) => {
    e.preventDefault(); // Prevent the default form action (e.g. page reload)

    const filterData = {
      kategoria: categoryFromHome || selectedCategory,
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
        console.log(filteredData); // Handle the filtered data

        // Update the filtered results state
        setFilteredResults(filteredData.companies);

        // Navigate to the search results page with the filtered data as state
        navigate("/Wyszukiwanie usług", {
          state: { filteredData: filteredData.companies },
        });
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
          setFilteredResults(filteredData.companies);
          console.log("searchbar");
          console.log(filteredData);

          // Navigate to the search results page with the filtered data as state
          navigate("/Wyszukiwanie usług", {
            state: { filteredData: filteredData.companies },
          });
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
          Odkrywaj najlepszych specjalistów wokół siebie, <br /> wszystko czego
          potrzebujesz w jednym miejscu
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
              options={[
                "Najwyższa ocena",
                "Najwięcej opinii",
                "Od najnowszych",
              ]}
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

  const MidBody = ({ filteredData }) => {
    const generateStars = (rating) => {
      const fullStars = Math.floor(rating);
      const halfStars = rating % 1 !== 0 ? 1 : 0;
      const emptyStars = 5 - fullStars - halfStars;
      return (
        <div className="flex items-center">
          {[...Array(fullStars)].map((_, i) => (
            <span key={`full-${i}`} className="text-yellow-500">
              ★
            </span>
          ))}
          {halfStars === 1 && <span className="text-yellow-500">☆</span>}
          {[...Array(emptyStars)].map((_, i) => (
            <span key={`empty-${i}`} className="text-gray-400">
              ★
            </span>
          ))}
        </div>
      );
    };

    return (
      <div className="flex flex-col m-4 p-4">
        {filteredResults.length > 0 ? (
          filteredResults.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center mb-8 p-8 rounded bg-stone-200 max-md:p-5"
            >
              <section className="flex gap-5 max-md:flex-col max-md:gap-0 w-full">
                <figure className="flex flex-col max-md:ml-0 max-md:w-full rounded mr-4">
                  <img
                    src={item.logo}
                    alt="Company logo"
                    className="grow shrink-0 max-w-full shadow-lg aspect-[1.06] w-[229px] max-md:mt-8"

                  />
                </figure>
                <div className="flex flex-col w-4/5 max-md:ml-0 max-md:w-full">
                  <div className="flex gap-5 mr-8">
                    {/* First Column */}
                    <div className="flex flex-col gap-3 w-1/2">
                      <h1 className="text-3xl font-medium">{item.name}</h1>
                      <div className="flex items-center gap-2 text-xl">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2d1ecd326255b82c2ece04b5eaa6aba202a956783c93e13939df9af7ba141e9?apiKey=d10d36f0508e433185a32e898689ca50&"
                          alt="Location icon"
                          className="shrink-0 w-6 aspect-square"
                        />
                        <div className="flex-auto my-auto">
                          {item.city} {item.address}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-base">
                        <div>{item.reviews_no} opinii</div>
                        <div>{generateStars(item.avg_rating)}</div>
                      </div>
                      <div className="flex flex-col text-xl whitespace-nowrap">
                        <div>Kategoria: {item.category}</div>
                      </div>
                    </div>
                    {/* Second Column */}
                    <div className="flex flex-col gap-3 w-1/2">
                      <div className="flex-auto text-base font-medium max-md:max-w-full text-center">
                        {item.description}
                      </div>
                      <div className="flex flex-col flex-1 justify-center self-end mt-6 text-2xl font-medium text-center">
                        <button className="justify-center px-10 py-3.5 bg-white rounded-[30px] max-md:px-5">
                          Zarezerwuj wizytę
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))
        ) : (
          <p className="flex justify-center text-lg font-bold">Brak Wyników</p>
        )}
      </div>
    );
  };

  const Footer = () => {
    let cas = "";
    if (filteredResults.length === 0 || filteredResults.length === 1)
      cas =
        "flex flex-col items-start px-8 pt-5 pb-3.5 mt-auto w-full text-white bg-black max-md:px-5 max-md:max-w-full fixed bottom-0";
    else
      cas =
        "flex flex-col items-start px-8 pt-5 pb-3.5 w-full text-white bg-black max-md:px-5 max-md:max-w-full";
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
      <MidBody filteredResults={filteredResults} />
      <Footer />
    </>
  );
}

export default Wyszukiwanie_uslug;
