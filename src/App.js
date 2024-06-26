import React, { useState, useEffect, useRef } from "react";
import "./output.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { CookiesProvider, useCookiesContext } from "./components/CookiesManager";

function Strona_tytulowa() {
  const [data, setData] = useState([]);
  const [imageCards, setImageCards] = useState([]);
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const { cookies, clearCookies } = useCookiesContext();

  useEffect(() => {
    const fetchData = async () => {
      console.log("Pobieranie danych...");
      try {
        const [navData, imageCardData] = await Promise.all([
          fetch("https://bookit-back.vercel.app/api/nav_items").then((res) => res.json()),
          fetch("https://bookit-back.vercel.app/api/image_cards").then((res) => res.json())
        ]);
  
        setData(navData.nav_items);
        setImageCards(imageCardData.companies || []);
      } catch (error) {
        ///console.error("Błąd pobierania danych:", error);
        console.log(error);
        setData([]);
        setImageCards([]);
      }
    };
  
    fetchData();
  }, []);
  

  const ImageCard = ({ name, logo, description, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className="relative flex flex-col items-center rounded-md overflow-hidden mb-4 w-[250px] h-[450px] group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <div className="w-full h-full flex items-center justify-center rounded-md">
                <img
                    loading="lazy"
                    src={logo}
                    alt={name}
                    className="max-w-full max-h-full object-contain rounded-md"
                />
            </div>
            {isHovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white p-4 text-center">{description}</p>
                </div>
            )}
        </div>
    );
};

  const NavLink = ({ children }) => {
    return React.createElement(
      "div",
      { className: "justify-center" },
      children
    );
  };
  const Image = ({ src, alt, className}) =>
    React.createElement("img", {
      loading: "lazy",
      src: src,
      alt: alt,
      className: className,
    });

  const Heading = ({ children, className }) =>
    React.createElement(
      "h2",
      { className: `mt-8 text-2xl font-medium text-center ${className}` },
      children
    );

  const Paragraph = ({ children, className }) =>
    React.createElement(
      "p",
      { className: `self-stretch mt-5 text-base font-light ${className}` },
      children
    );

  const Text = ({ children, className }) =>
    React.createElement(
      "div",
      { className: `text-base font-light ${className}` },
      children
    );

  const Text1 = ({ children }) => (
    <p className="self-center mt-11 text-xl font-light text-center text-black max-md:mt-10 max-md:max-w-full">
      {children}
    </p>
  );

  const Header = () => {
    const navigate = useNavigate();
    const [authStatus, setAuthStatus] = useState({
        email: cookies.email || '',
        company_or_user: cookies.isCompany ? 1 : cookies.isUser ? 0 : null,
    });

    const handleProfileClick = () => {
        if (authStatus.company_or_user === 1) {
            navigate('/strona_zarządzania_firmą');
        } else if (authStatus.company_or_user === 0) {
            navigate('/profile-editing');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('https://bookit-back.vercel.app/api/wyloguj', {
                method: 'GET',
            });
            if (response.ok) {
                clearCookies();
                setAuthStatus({
                    email: '',
                    company_or_user: null,
                });
                navigate('/');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="flex gap-5 justify-between px-5 py-1.5 w-full text-xs text-center text-black mix-blend-darken bg-stone-200 max-md:flex-wrap max-md:max-w-full">
            <img
                loading="lazy"
                src="bookit-logo.png"
                alt="Logo"
                className="shrink-0 h-16 w-auto" 
                role="button"
                onClick={() => navigate('/')}
            />
            {authStatus.company_or_user !== null ? (
                <div className="flex gap-3.5 items-start my-auto">
                    <button
                        onClick={handleProfileClick}
                        className="justify-center px-2.5 py-3.5 bg-white rounded-md border-b border-black border-solid"
                    >
                        {authStatus.email}
                    </button>
                    <button
                        onClick={handleLogout}
                        className="justify-center px-2.5 py-3.5 bg-white rounded-md border-b border-black border-solid"
                    >
                        Wyloguj
                    </button>
                </div>
            ) : (
                <div className="flex gap-3.5 items-start my-auto">
                    <button
                        onClick={() => navigate('/logowanie')}
                        className="justify-center px-2.5 py-3.5 bg-white rounded-md border-b border-black border-solid"
                    >
                        Zaloguj się/załóż konto
                    </button>
                    <button
                        onClick={() => navigate('/rejestracja_firmy')}
                        className="justify-center px-2.5 py-3.5 bg-white rounded-md border-b border-black border-solid"
                    >
                        Dodaj swoją firmę
                    </button>
                </div>
            )}
        </div>
    );
};

  const Hero = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
  
    const handleSearch = async () => {
      const filterData = {
        nazwa: searchTerm,
      };
      try {
        const response = await fetch("https://bookit-back.vercel.app/api/wyszukiwanie_po_nazwie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filterData),
        });
    
        if (response.ok) {
          const filteredData = await response.json();
          navigate('/Wyszukiwanie usług', { state: {fromHomepage: true, filteredData: filteredData.companies } });
        } else {
          console.error("Failed to fetch filtered data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    const handleKeyDown = async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        await handleSearch();
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
        <form className="flex relative gap-5 px-6 py-2 mt-7 tracking-normal bg-white leading-[90%] rounded-full text-stone-200 max-md:flex-wrap w-[450px] max-w-md" onSubmit={(e) => e.preventDefault()}>
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
            onKeyDown={handleKeyDown}
          />
        </form>
        <div className="flex justify-center items-center flex-col text-center mt-4 p-10">
          <div className="flex relative flex-col items-center self-stretch px-16 pb-2.5  w-full text-center mix-blend-overlay bg-stone-200 max-md:px-5 max-md:max-w-full">
            <div className="flex z-10 gap-5 w-full max-w-[1075px] max-md:flex-wrap max-md:max-w-full justify-center items-center ">
              {data.map((item, index) => (
                <button
                  key={index}
                  className="flex flex-col justify-center items-center gap-1.5 mt-1.5 mb-1.5"
                  onClick={() => {
                    navigate("/Wyszukiwanie usług",{ state: { fromHomepage: true, category: item }});
                  }}
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
  };
  

  const UPPBody = ({ imageCards, sliderRef }) => {
    const [isFirstImage, setIsFirstImage] = useState(true);
    const [isLastImage, setIsLastImage] = useState(false);
    const scrollAmount = 300;
    const [imageIndex, setImageIndex] = useState(0);

    const handleScroll = () => {
      const container = sliderRef.current;
      if (container) {
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        setIsFirstImage(scrollLeft === 0);
        setIsLastImage(scrollLeft + clientWidth >= scrollWidth);
      }
    };

    useEffect(() => {
      const container = sliderRef.current;
      if (container) {
        container.addEventListener("scroll", handleScroll);
        handleScroll(); // Initialize state

        return () => {
          container.removeEventListener("scroll", handleScroll);
        };
      }
    }, []);

    const scrollLeft = () => {
      const container = sliderRef.current;
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setImageIndex((prevIndex) =>
        prevIndex === 0 ? imageCards.length - 1 : prevIndex - 1
      );
      setImageCards(reorderImagesLeft);
    };

    const scrollRight = () => {
      const container = sliderRef.current;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setImageIndex((prevIndex) =>
        prevIndex === imageCards.length - 1 ? 0 : prevIndex + 1
      );
      setImageCards(reorderImagesRight);
    };

    const reorderImagesLeft = (cards) => {
      const newImageCards = [...cards];
      const lastImage = newImageCards.pop();
      newImageCards.unshift(lastImage);
      return newImageCards;
    };

    const reorderImagesRight = (cards) => {
      const newImageCards = [...cards];
      const firstImage = newImageCards.shift();
      newImageCards.push(firstImage);
      return newImageCards;
    };

    return (
      <section className="flex gap-5 items-center justify-center px-8 py-6 text-base font-medium text-black bg-stone-200 max-md:flex-wrap max-md:px-5">
        <div className="flex justify-center flex-grow">
          <button
            className="justify-center px-2 py-1 bg-white rounded-md border-b border-black border-solid"
            onClick={scrollLeft}
            style={{ visibility: isFirstImage ? "visible" : "visible" }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
        <div
          className="flex overflow-x-scroll"
          ref={sliderRef}
          style={{ scrollSnapType: "x mandatory" }}
        >
          {imageCards && imageCards.length > 0 ? (
            imageCards.map((card, index) => (
              <ImageCard
                key={index}
                name={card.name}
                logo={card.logo}
                description={card.description}
                style={{ order: (index + imageIndex) % imageCards.length }}
                onClick={() => navigate("/Strona wyboru usług",{ state: { name: card.name}})}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="flex justify-center flex-grow">
          <button
            className="justify-center px-2 py-1 bg-white rounded-md border-b border-black border-solid"
            onClick={scrollRight}
            style={{ visibility: isLastImage ? "visible" : "visible" }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </section>
    );
  };

  const DOWNBody = () => (
    <div className="flex flex-col items-center">
      <div className="self-center mt-32 text-5xl font-light text-center text-black max-md:mt-10 max-md:max-w-full max-md:text-4xl">
        <span className="font-semibold">
          Nie czekaj, sprawdź nasze oferty już dziś
        </span>{" "}
      </div>
      <div className="self-center mt-32 text-5xl font-light text-center text-black max-md:mt-10 max-md:max-w-full max-md:text-4xl">
        <span className="font-semibold">
          <Text>
            Na pewno się nie zawiedziesz, minimalistyczny wygląd i wiele <br />
            funkcjonalności dają możliwość łatwego wyboru
            <br /> odpowiedniej oferty dla Ciebie !!!
          </Text>
        </span>{" "}
      </div>
      <h1 className="self-center mt-10 text-2xl font-medium text-black">
        Rezerwacja na 2 sposoby
      </h1>
      <div
        className="flex flex-row justify-center mt-5"
        style={{ width: "100%", maxWidth: "1200px" }}
      >
        {" "}
        {/* Zmieniona szerokość kontenera */}
        <div
          className="flex flex-col items-center px-5 text-black"
          style={{ width: "50%" }}
        >
          {" "}
          {/* Pierwsza kolumna */}
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fd033e2b33d86e4e9c425a7c8757b1ed8d3d8060e66aee01d6842e77c731edb3?apiKey=d10d36f0508e433185a32e898689ca50&"
            alt="Image description"
            className="aspect-[1.82] w-full mb-3"
          />
          <Heading>Na miejscu</Heading>
          <Paragraph>
            Poprzez informacje zawarte w opisach firm i oferowanych przez nie
            usług możliwa jest również rezerwacja przez telefon czy u nich na
            miejscu.
          </Paragraph>
        </div>
        <div
          className="flex flex-col items-center px-5 text-black"
          style={{ width: "50%" }}
        >
          {" "}
          {/* Druga kolumna */}
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c1e24f77a6e1a43d96ec512ee1ec521c90f91f376b31d8e542ee7125ee7c4?apiKey=d10d36f0508e433185a32e898689ca50&"
            alt="Strona WWW"
            className="aspect-[1.82] w-full mb-3"
          />
          <h2 className="mt-1.5 text-2xl font-medium text-center">
            Strona WWW
          </h2>
          <Text1>
            Poprzez intuicyjne panele rezewacji łatwo umówisz potrzebną dla
            Ciebie usługę z pośród różnych ofert zarejestrowanych przez nas
            firm.
          </Text1>
        </div>
      </div>
    </div>
  );

  const Footer = () => {
    return (
      <div className="flex flex-col items-start px-10 pt-5 pb-3.5 mt-8 w-full text-white bg-black max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between text-base">
          <div className="flex gap-5 justify-between">
            <a href="#" className="justify-center">O nas</a>
            <a href="#" className="justify-center whitespace-nowrap">Kontakt</a>
          </div>
          <a href="#" className="justify-center whitespace-nowrap">FAQ</a>
        </div>
        <div className="shrink-0 self-stretch mt-2 bg-white border border-white border-solid h-[5px] max-md:max-w-full" />
        <div className="justify-center mt-4 text-xs font-light"> © 2024 PRZ All Rights Reserved{" "} </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Hero data={data} />
      <UPPBody imageCards={imageCards} sliderRef={sliderRef} />
      <DOWNBody />
      <Footer />
    </>
  );
}

export default Strona_tytulowa;
