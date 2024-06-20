import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NewServicePicker from "./components/NewServicePicker";
import {
  CookiesProvider,
  useCookiesContext,
} from "./components/CookiesManager";

function SocialMediaLink({ url, platform, altText }) {
  return (
    <div className="flex gap-2.5 mt-5">
      <img
        loading="lazy"
        src={url}
        alt={altText}
        className="shrink-0 w-10 aspect-square"
      />
      <div className="flex-auto my-auto">{platform}</div>
    </div>
  );
}

const generateStars = (rating) => {
  // Ensure rating is a number and handle edge cases
  if (typeof rating !== 'number' || isNaN(rating) || rating < 0) {
    return null; // Or handle gracefully as per your UI/UX requirements
  }

  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  // Validate lengths to avoid invalid array creation
  const fullStarsArray = Array.from({ length: fullStars }, (_, i) => (
    <span key={`full-${i}`} className="text-yellow-500 text-2xl">
      ★
    </span>
  ));

  const halfStarElement = halfStars === 1 ? (
    <span className="text-yellow-500 text-2xl">☆</span>
  ) : null;

  const emptyStarsArray = Array.from({ length: emptyStars }, (_, i) => (
    <span key={`empty-${i}`} className="text-gray-400 text-2xl">
      ★
    </span>
  ));

  return (
    <div className="flex items-center bg-white p-0.5 rounded-lg shadow-md">
      {fullStarsArray}
      {halfStarElement}
      {emptyStarsArray}
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const { cookies, clearCookies } = useCookiesContext();
  const [authStatus, setAuthStatus] = useState({
    email: cookies.email || "",
    company_or_user: cookies.isCompany ? 1 : cookies.isUser ? 0 : null,
  });

  const handleProfileClick = () => {
    if (authStatus.company_or_user === 1) {
      navigate("/strona_zarządzania_firmą");
    } else if (authStatus.company_or_user === 0) {
      navigate("/profile-editing");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://bookit-back.vercel.app/api/wyloguj",
        {
          method: "GET",
        }
      );
      if (response.ok) {
        clearCookies();
        setAuthStatus({
          email: "",
          company_or_user: null,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
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
        onClick={() => navigate("/")}
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
            onClick={() => navigate("/logowanie")}
            className="justify-center px-2.5 py-3.5 bg-white rounded-md border-b border-black border-solid"
          >
            Zaloguj się/załóż konto
          </button>
          <button
            onClick={() => navigate("/rejestracja_firmy")}
            className="justify-center px-2.5 py-3.5 bg-white rounded-md border-b border-black border-solid"
          >
            Dodaj swoją firmę
          </button>
        </div>
      )}
    </div>
  );
};

function ServiceItem({ serviceName, price, serviceTime }) {
  return (
    <div className="flex gap-5 items-center py-1 pr-1.5 pl-3.5 mt-2 w-full rounded-3xl bg-stone-200 max-md:flex-wrap max-md:max-w-full">
      <div className="flex-auto self-stretch my-auto text-xl text-right">
        {serviceName}
      </div>
      <div className="self-stretch my-auto text-3xl font-semibold">
        <span className="font-medium">{price.split(".")[0]}.</span>
        <span className="text-xl font-medium">{price.split(".")[1]}</span>
        <span className="font-medium">*</span>
      </div>
      <div className="flex gap-5 self-stretch">
        <div className="flex-auto my-auto text-xl text-right">
          Czas usługi: {serviceTime}
        </div>
        <div className="justify-center items-center px-3 w-10 h-10 text-4xl font-extralight text-center whitespace-nowrap bg-white rounded-full shadow-sm">
          +
        </div>
      </div>
    </div>
  );
}

function Strona_firmy() {
  const location = useLocation();
  const companyInfo = location.state || {};
  const company_name = companyInfo.name;
  console.log(company_name);
  const company_id = 2;
  const [company, setCompany] = useState({
    ID: 0,
    name: "",
    description: "",
    logo: "",
    numer: "",
    city: "",
    strona: "",
    address: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    x: "",
    tiktok: "",
    avg_rating: "",
    reviews_no: 0,
  });
  console.log('CHUJ', company);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleNext = () => {
    navigate("../rezerwacja-logged", { state: { services, company_name } });
  };

  const handleServiceSelect = (selectedServices) => {
    setServices(selectedServices);
  };

  useEffect(() => {
    if (company_id) {
      axios
        .post("api/Strona_firmy", {
          company_name,
        })
        .then((response) => {
          setCompany(response.data);
        })
        .catch((error) => {
          setError("Company not found");
        });
    }
  }, [company_id]);

  const socialMediaData = [
    {
      url: "https://cdn.builder.io/api/v1/image/assets/TEMP/a29484ee2bfa9fa553e53828e419621cd30545b7d30b0bbdf2b6d98b325d584c?apiKey=d10d36f0508e433185a32e898689ca50&",
      platform: company.strona,
      altText: "Website",
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets/TEMP/3f61d1ecefcf1626754503a46a82047d1290d86e3868395a6184fadb004cbe0a?apiKey=d10d36f0508e433185a32e898689ca50&",
      platform: company.facebook,
      altText: "Facebook",
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets/TEMP/a8df4e89ff886f8f3b169db09c7371f3152dc114b3e9d168b35a04fcda517dc4?apiKey=d10d36f0508e433185a32e898689ca50&",
      platform: company.linkedin,
      altText: "LinkedIn",
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets/TEMP/c863b5fa7baa0dab9bbcd2ec292794c8c4a25bec8afcc63e440d70dc15024a00?apiKey=d10d36f0508e433185a32e898689ca50&",
      platform: company.instagram,
      altText: "Instagram",
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets/TEMP/28b0c9d290d499b97f2e895bbb54b3dcdfac9e5bdb80ec0dba14d3b9df1917f6?apiKey=d10d36f0508e433185a32e898689ca50&",
      platform: company.x,
      altText: "X",
    },
  ];

  return (
    <div className="flex flex-col bg-white">
      <Header />
      <button
        onClick={() => navigate("/Wyszukiwanie usług")}
        className="justify-center items-center px-7 py-1.5 mt-11 ml-28 max-w-full text-xl font-light text-center text-black bg-white border border-black border-solid shadow-sm rounded-[30px] w-[229px] max-md:px-5 max-md:mt-10 max-md:ml-2.5"
      >
        Wróć
      </button>
      <div className="px-20 mt-6 w-full bg-stone-200 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          {/*Ten div nizej bedzie zamieniony na komponent wczytujacy zdj, opinie itd*/}
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[41%] max-md:ml-0 max-md:w-full">
                  <img
                    src={company.logo}
                    id="logo_firmy"
                    alt="logo firmy"
                    loading="lazy"
                    className="grow w-full shadow-sm aspect-[1.08] max-md:mt-9"
                  />
                </div>
                <div className="flex flex-col ml-5 w-[59%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col self-stretch my-auto text-2xl text-black max-md:mt-10">
                    <div className="text-5xl font-medium max-md:text-4xl">
                      {company.name}
                    </div>
                    <div className="mt-2.5">
                      {company.city}, {company.address}
                    </div>
                    <div className="mt-6">tel. {company.numer}</div>
                    <div className="flex items-center gap-3 text-base">
                      <div>{generateStars(company.avg_rating)}</div>
                      <div>{company.reviews_no} opinii</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*DIV POWYZEJ BEDZIE KOMPONENTNEm*/}

          {/*PONIZSZY DIV - KOMPONENT POBIERAJACY ZDJECIA*/}
          <div className=" flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex grow gap-5 items-center max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/46f35761b4ab43fe0cd6819c7253ec2fc017fcd5bcb5d9169bf1d4edc80b25ca?apiKey=d10d36f0508e433185a32e898689ca50&"
                alt="Icon 1"
                className="shrink-0 self-stretch my-auto w-10 aspect-square"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/680537ec8ccc8a4353186a959eab1ef95fef5b649f7719c011f124817ffaee4a?apiKey=d10d36f0508e433185a32e898689ca50&"
                alt="Banner"
                className="self-stretch w-full aspect-[1.82] max-md:max-w-full"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/97b4fb2ba1237956974d1119188a8585fa741786490442361dcf10a4431bcc41?apiKey=d10d36f0508e433185a32e898689ca50&"
                alt="Icon 2"
                className="shrink-0 self-stretch my-auto w-10 aspect-square"
              />
            </div>
          </div>
          {/*^^^ KOMPONENT TO BEDZIE ^^^*/}
        </div>
      </div>
      <div className="self-center mt-9 w-full max-w-[1254px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col px-5 pt-2 pb-4 w-full rounded-3xl bg-stone-200 max-md:mt-10">
              <div className="text-2xl font-medium leading-6 text-center text-black">
                Znajdź nas na naszych social mediach!
              </div>
              <div className="flex flex-col pr-5 pl-1.5 mt-5 text-xl leading-6 whitespace-nowrap text-zinc-800">
                {socialMediaData.map((data, index) => (
                  <SocialMediaLink
                    key={index}
                    url={data.url}
                    platform={data.platform}
                    altText={data.altText}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-9/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mr-[150px] grow mt-40 text-black max-md:mt-10 max-md:max-w-full">
              <div className="">
                <NewServicePicker
                  companyId={company.ID}
                  onServiceSelect={handleServiceSelect}
                />
              </div>
              <div className="flex gap-5 mr-[110px] self-end justify-between mt-10 max-w-full text-2xl font-light text-center whitespace-nowrap w-[414px] max-md:mt-10 max-md:mr-1">
                <Link
                  to="/Wyszukiwanie usług"
                  className="px-7 py-1.5 bg-white border border-black border-solid rounded-[30px] max-md:px-5"
                >
                  Cofnij
                </Link>
                <button
                  onClick={handleNext}
                  className="px-7 py-1.5 bg-white border border-black border-solid rounded-[30px] max-md:px-5"
                >
                  Dalej
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-8 pt-5 pb-3.5 mt-14 w-full text-white bg-black max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 justify-between self-start text-base">
          <div>O nas</div>
          <div>Kontakt</div>
          <div>FAQ</div>
        </div>
        <div className="shrink-0 mt-2 bg-white border border-white border-solid h-[5px] max-md:max-w-full" />
        <div className="mt-4 text-xs font-light max-md:max-w-full">
          © 2024 PRZ All Rights Reserved
        </div>
      </div>
    </div>
  );
}

export default Strona_firmy;
