import React, { useState, useEffect, useRef } from "react";
import "./output.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [data, setData] = useState([]);
  const [imageCards, setImageCards] = useState([]);
  const sliderRef = useRef(null);
  const scrollAmount = 100;

  useEffect(() => {
    fetch("/api/nav_items") // Poprawiony endpoint
      .then((res) => res.json())
      .then((data) => {
        setData(data.nav_items); // Ustaw tablicę danych
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/image_cards")
      .then((res) => res.json())
      .then((imageCards) => {
        if (imageCards && imageCards.companies) {
          setImageCards(imageCards.companies); // Ustaw tablicę z danymi firm
        } else {
          setImageCards([]); // Ustaw pustą tablicę w przypadku braku danych
        }
        console.log(imageCards);
      })
      .catch((error) => {
        console.error("Error fetching image cards:", error);
        setImageCards([]); // Ustaw pustą tablicę w przypadku błędu
      });
  }, []);

  const ImageCard = ({ name, logo, description }) => {
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
      >
        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-md">
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
  const Image = ({ src, alt, className }) =>
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
    <div className="flex overflow-hidden relative flex-col items-center px-5 pt-8 pb-16 w-full text-xl text-black min-h-[391px] max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/10fbef2836b96a649d95600569a3c9f1049330147f43590e33d4d81ff4c7ccd4?apiKey=d10d36f0508e433185a32e898689ca50&"
        alt="Background"
        className="object-cover absolute inset-0 size-full"
      />
      <div className="relative text-5xl font-medium text-center max-md:max-w-full max-md:text-4xl">
        Zarezerwuj to co potrzebujesz
      </div>
      <div className="relative mt-3.5 text-2xl font-light text-center max-md:max-w-full">
        Odkrywaj najlepszych specjalistów wokół siebie, <br /> wszystko czego
        potrzebujesz w jednym miejscu
      </div>
      <form className="flex relative gap-5 px-3.5 py-1 mt-7 tracking-normal bg-white leading-[90%] rounded-[50px] text-stone-200 max-md:flex-wrap">
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
          placeholder="Szukaj usług lub biznesów"
          aria-label="Szukaj usług lub biznesów"
          className="flex-auto my-auto max-md:max-w-full text-black"
        />
      </form>
      <div className="flex justify-center, flex-col, text-center p-25">
        <div className="flex relative flex-col items-center self-stretch px-16 pb-2.5 mt-10 w-full text-center mix-blend-overlay bg-stone-200 max-md:px-5 max-md:max-w-full">
          <div className="flex z-10 gap-5 w-full max-w-[1075px] max-md:flex-wrap max-md:max-w-full">
            {data.map((data, index) => (
              <button
                key={index}
                className="flex flex-col items-center gap-1.5"
              >
                <p>{data}</p>
                <span className="text-xs font-light">{data.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const UPPBody = () => {
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
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // Initialize state
  
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    const scrollLeft = () => {
      const container = sliderRef.current;
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setImageIndex((prevIndex) => (prevIndex === 0 ? imageCards.length - 1 : prevIndex - 1));
    };
  
    const scrollRight = () => {
      const container = sliderRef.current;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setImageIndex((prevIndex) => (prevIndex === imageCards.length - 1 ? 0 : prevIndex + 1));
    };
  
    const reorderImages = () => {
      const newImageCards = [...imageCards];
      const firstImage = newImageCards[0];
      for (let i = 0; i < newImageCards.length - 1; i++) {
        newImageCards[i] = newImageCards[i + 1];
      }
      newImageCards[newImageCards.length - 1] = firstImage;
      return newImageCards;
    };
  
    return (
      <section className="flex gap-5 items-center justify-center px-8 py-6 text-base font-medium text-black bg-stone-200 max-md:flex-wrap max-md:px-5">
        <div className="flex justify-center flex-grow">
          <button
            className="justify-center px-2 py-1 bg-white rounded-md border-b border-black border-solid"
            onClick={() => { scrollLeft(); setImageCards(reorderImages()); }}
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
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="flex justify-center flex-grow">
          <button
            className="justify-center px-2 py-1 bg-white rounded-md border-b border-black border-solid"
            onClick={() => { scrollRight(); setImageCards(reorderImages()); }}
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
      <UPPBody />
      <DOWNBody />
      <Footer />
    </>
  );
}

export default App;
