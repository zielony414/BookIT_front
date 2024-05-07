import React, { useState, useEffect } from "react";
import "./output.css";

function App() {
  const [data, setData] = useState([]);
  const [imageCards, setImageCards] = useState([]);

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
      .then((data) => {
        setImageCards(data);
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

  const Image1 = ({ src, alt }) =>
    React.createElement("img", {
      loading: "lazy",
      src: src,
      alt: alt,
      className: "max-w-full aspect-[1.16] w-[175px]",
    });

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

  const ImageCard = ({ imageSrc, imageAlt, description }) => (
    <div className="flex flex-col">
      <img
        loading="lazy"
        src={imageSrc}
        alt={imageAlt}
        className="w-full shadow-lg aspect-[1.06]"
      />
      <p className="mt-2">{description}</p>
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
      <div className="flex justify-center">
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

  const UPPBody = () => (
    <section className="flex gap-5 justify-between items-end px-8 py-6 text-base font-medium text-black bg-stone-200 max-md:flex-wrap max-md:px-5">
      <div className="flex flex-col self-stretch">
        <div className="flex gap-5 justify-between">
          <img
            loading="lazy"
            src="URL_DO_FLASKA/STAR_ICON_URL"
            alt="Star icon"
            className="shrink-0 my-auto aspect-[0.97] w-[30px]"
          />
          <div className="flex flex-col">
            <h2 className="self-start ml-4 max-md:ml-2.5">
              Najlepiej oceniane:
            </h2>
            <img
              loading="lazy"
              src="URL_DO_FLASKA/TOP_RATED_IMAGE_URL"
              alt="Top rated image"
              className="mt-3.5 w-full shadow-lg aspect-[1.06]"
            />
          </div>
        </div>
        <p className="mt-2 max-md:mr-2.5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pulvinar
          ipsum orci, eget ullamcorper lectus cursus nec.
        </p>
      </div>
      {imageCards.map((card, index) => (
        <ImageCard
          key={index}
          imageSrc={card.imageSrc}
          imageAlt={card.imageAlt}
          description={card.description}
        />
      ))}
      <img
        loading="lazy"
        src="URL_DO_FLASKA/STAR_ICON_URL"
        alt="Star icon"
        className="shrink-0 self-stretch my-auto aspect-[0.97] w-[30px]"
      />
    </section>
  );

  const DOWNBody = () => (
    <div className="flex flex-col items-center">
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
      <div className="self-center mt-32 text-5xl font-light text-center text-black max-md:mt-10 max-md:max-w-full max-md:text-4xl">
        <span className="font-semibold">
          Nie czekaj, sprawdź nasze oferty już dziś
        </span>{" "}
      </div>
      <div className="self-center mt-32 text-5xl font-light text-center text-black max-md:mt-10 max-md:max-w-full max-md:text-4xl">
        <span className="font-semibold">
          <Text>
            Na pewno się nie zawiedziesz, minimalistyczny wygląd i wiele <br />
            funkcjonalności dają możliwość łatwego wyboru<br /> odpowiedniej oferty
            dla Ciebie !!!
          </Text>
        </span>{" "}
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
