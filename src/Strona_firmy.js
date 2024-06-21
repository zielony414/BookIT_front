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

const defaultPhotos = {
  1: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Fryzjer
  2: 'https://unsplash.com/photos/person-holding-amber-glass-bottle-0MoF-Fe0w0Ahttps://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Masaż
  3: 'https://unsplash.com/photos/a-small-dog-sitting-on-top-of-a-rock-Kcf0f_3di2U', 
  4: 'https://images.unsplash.com/photo-1643185450492-6ba77dea00f6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Uroda
  5: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Siłownia
};

const CompanyPhotos = ({ companyId }) => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.post('/api/Strona_firmy/zdjęcia', { ID: companyId });
        if (response.data.companies && response.data.companies.length > 0) {
          setPhotos(response.data.companies);
        } else {
          setPhotos([{ logo: defaultPhotos[companyId] }]);
        }
      } catch (error) {
        setPhotos([{ logo: defaultPhotos[companyId] }]);
      }
    };

    fetchPhotos();
  }, [companyId]);

  return (
    <div className="border border-black flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex grow gap-5 items-center max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        {error ? (
          <p>{error}</p>
        ) : (
          photos.map((photo, index) => (
            <img
              key={index}
              loading="lazy"
              src={photo.logo}
              alt={`Photo ${index + 1}`}
              className="self-stretch w-full aspect-[1.82] max-md:max-w-full"
            />
          ))
        )}
      </div>
    </div>
  );
};

const generateStars = (rating) => {
  // Konwertuj rating na liczbę i obsłuż przypadki brzegowe
  const parsedRating = parseFloat(rating);
  if (isNaN(parsedRating) || parsedRating < 0) {
    return null; // Można też dodać komunikat o błędzie lub inny sposób obsługi błędu
  }

  const fullStars = Math.floor(parsedRating);
  const halfStars = parsedRating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const fullStarsArray = Array.from({ length: fullStars }, (_, i) => (
    <span key={`full-${i}`} className="text-yellow-500 text-2xl">
      ★
    </span>
  ));

  const halfStarElement = halfStars === 1 ? (
    <span key="half" className="text-yellow-500 text-2xl">
      ☆
    </span>
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
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleNext = () => {
    navigate("../rezerwacja-logged", { state: { services, company_name } });
  };

  const handleServiceSelect = (selectedServices) => {
    setServices(selectedServices);
  };

  const fetchCompanyDetails = async () => {
    try {
      const response = await axios.post('https://book-it-back.vercel.app/api/Strona_firmy', { company_name });
      console.log('Otrzymana odpowiedź:', response.data[0]);
      setCompany(response.data[0]);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error connecting to the server');
    }
  };

  useEffect(() => {
    if (company_name) {
      fetchCompanyDetails();
    }
  }, [company_name]);

  console.log('Obiekt firmy', company);
  console.log('ID firmy', company.ID);


  const platforms = {
    strona: {
      baseUrl: "https://",
      iconUrl: "https://github.com/simple-icons/simple-icons/blob/develop/icons/internetarchive.svg?raw=true",
      displayText: "Website"
    },
    facebook: {
      baseUrl: "https://facebook.com",
      iconUrl: "https://github.com/simple-icons/simple-icons/blob/develop/icons/facebook.svg?raw=true",
      displayText: "Facebook"
    },
    linkedin: {
      baseUrl: "https://linkedin.com/in",
      iconUrl: "https://github.com/simple-icons/simple-icons/blob/develop/icons/linkedin.svg?raw=true",
      displayText: "LinkedIn"
    },
    instagram: {
      baseUrl: "https://instagram.com",
      iconUrl: "https://github.com/simple-icons/simple-icons/blob/develop/icons/instagram.svg?raw=true",
      displayText: "Instagram"
    },
    x: {
      baseUrl: "https://twitter.com",
      iconUrl: "https://github.com/simple-icons/simple-icons/blob/develop/icons/x.svg?raw=true",
      displayText: "Twitter (X)"
    },
    tiktok: {
      baseUrl: "https://tiktok.com/@",
      iconUrl: "https://github.com/simple-icons/simple-icons/blob/develop/icons/tiktok.svg?raw=true",
      displayText: "TikTok"
    }
  };
  

  const socialMediaData = Object.entries(platforms)
  .filter(([key]) => company[key]) // Filtruj tylko te platformy, które mają link
  .map(([key, { baseUrl, iconUrl, displayText }]) => ({
    url: baseUrl + company[key],
    iconUrl,
    displayText
  }));


  const renderSocialMediaIcons = () => {
    return socialMediaData.map((social, index) => (
      <a href={social.url} key={index} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mb-[5px]">
        <img src={social.iconUrl} alt={social.displayText} className="w-6 h-6" />
        <span className="text-blue-600 hover:underline">{social.displayText}</span>
      </a>
    ));
  };

  const hasSocialMedia = () => {
    return (
      company.facebook ||
      company.linkedin ||
      company.instagram ||
      company.x ||
      company.tiktok ||
      company.strona
    );
  };

  console.log('AVG RATING', company.avg_rating);
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
          {/*Ten div nizej wczytuje "zdjecia", opinie itd*/}
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
                      <div>{generateStars(parseFloat(company.avg_rating))}</div>
                      <div>{company.reviews_no} opinii</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*DIV POWYZEJ BEDZIE KOMPONENTNEm*/}

          {/*PONIZSZY DIV - KOMPONENT POBIERAJACY ZDJECIA*/}
            <CompanyPhotos companyId={company.ID}/>
          {/*^^^ KOMPONENT TO BEDZIE ^^^*/}
        </div>
      </div>
      <div className="self-center mt-9 w-full max-w-[1254px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col px-5 pt-2 pb-4 w-full rounded-3xl bg-stone-200 max-md:mt-10">
              <div className="text-2xl font-medium leading-6 text-center text-black">
                {hasSocialMedia() ? "Znajdź nas na naszych social mediach!" : "Brak social mediów"}
              </div>
                {hasSocialMedia() && (
                <div className="flex flex-col pr-5 pl-1.5 mt-5 text-xl leading-6 whitespace-nowrap text-zinc-800">
                  {renderSocialMediaIcons()}  
                </div>
              )}
            </div>
          </div>
          <div className=" flex flex-col ml-5 w-9/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mr-[150px] grow mt-10 text-black max-md:mt-10 max-md:max-w-full">
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
