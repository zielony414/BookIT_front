import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import NewServicePicker from "./components/NewServicePicker";

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



function Header() {
  const navigate = useNavigate();

  return ( 
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
      <button onClick={() => navigate('/profile-editing')} className="justify-center px-2.5 py-3.5 bg-white rounded-md border-b border-black border-solid">
        Email
      </button>
      <button onClick={() => navigate('/rejestracja_firmy')} className="justify-center px-2.5 py-3.5 bg-white rounded-md border-b border-black border-solid">
        Wyloguj
      </button>
    </div>
  </div> 
);
}

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
  const company_name = "Mister Dapper";
  const company_id = 1;
  const [company, setCompany] = useState({
    name: '', description: '', logo: '', numer: '', city: '', strona: '', address: '', facebook: '', instagram: '', linkedin: '', x: '', tiktok: ''
  });
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  const handleNext = () => {
    navigate('../rezerwacja-logged', { state: { services, company_id }});
  };

  const handleServiceSelect = (selectedServices) => {
    setServices(selectedServices);
  };

  const socialMediaData = [
    { url: "https://cdn.builder.io/api/v1/image/assets/TEMP/a29484ee2bfa9fa553e53828e419621cd30545b7d30b0bbdf2b6d98b325d584c?apiKey=d10d36f0508e433185a32e898689ca50&", platform: "mrdoppler.pl", altText: "Website" },
    { url: "https://cdn.builder.io/api/v1/image/assets/TEMP/3f61d1ecefcf1626754503a46a82047d1290d86e3868395a6184fadb004cbe0a?apiKey=d10d36f0508e433185a32e898689ca50&", platform: "/mister_doppler", altText: "Facebook" },
    { url: "https://cdn.builder.io/api/v1/image/assets/TEMP/a8df4e89ff886f8f3b169db09c7371f3152dc114b3e9d168b35a04fcda517dc4?apiKey=d10d36f0508e433185a32e898689ca50&", platform: "/in/misterdoppler", altText: "LinkedIn" },
    { url: "https://cdn.builder.io/api/v1/image/assets/TEMP/c863b5fa7baa0dab9bbcd2ec292794c8c4a25bec8afcc63e440d70dc15024a00?apiKey=d10d36f0508e433185a32e898689ca50&", platform: "/mr_doppler", altText: "Instagram" },
    { url: "https://cdn.builder.io/api/v1/image/assets/TEMP/28b0c9d290d499b97f2e895bbb54b3dcdfac9e5bdb80ec0dba14d3b9df1917f6?apiKey=d10d36f0508e433185a32e898689ca50&", platform: "/mr_doppler", altText: "Twitter" },
    { url: "https://cdn.builder.io/api/v1/image/assets/TEMP/a423b996c3a576e765ef76805827b651a39c2fbe713333bb2b2ba3d020908b21?apiKey=d10d36f0508e433185a32e898689ca50&", platform: "/mr_doppler", altText: "YouTube" },
    { url: "https://cdn.builder.io/api/v1/image/assets/TEMP/ac0ad10c5866d7b3ba125ce6ed1c98475328812161faf2c5d83b31e8f940126e?apiKey=d10d36f0508e433185a32e898689ca50&", platform: "/mr_doppler", altText: "Pinterest" },
  ];

  const servicesData = [
    { serviceName: "Strzyżenie brody", price: "40.00", serviceTime: "20 min" },
    { serviceName: "Strzyżenie męskie", price: "60.00", serviceTime: "45 min" },
    { serviceName: "Stylizacja włosów i brody", price: "25.00", serviceTime: "15 min" },
  ];

  const fetchCompanyDetails = async () => {
    try {
      const response = await axios.post('/api/Strona_firmy', { company_id });
      setCompany(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error connecting to the server');
    }
  };

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  return (
    <div className="flex flex-col bg-white">
      <Header />
      {company.name}
      <div className="justify-center items-center px-7 py-1.5 mt-11 ml-28 max-w-full text-xl font-light text-center text-black bg-white border border-black border-solid shadow-sm rounded-[30px] w-[229px] max-md:px-5 max-md:mt-10 max-md:ml-2.5">
        Wróć
      </div>
      <div className="px-20 mt-6 w-full bg-stone-200 max-md:px-5 max-md:max-w-full">        
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">



          {/*Ten div nizej bedzie zamieniony na komponent wczytujacy zdj, opinie itd*/}
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">  
            <div className="self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[41%] max-md:ml-0 max-md:w-full">
                  <img src={company.logo} id="logo_firmy" alt="logo firmy"
                    loading="lazy"                                        
                    className="grow w-full shadow-sm aspect-[1.08] max-md:mt-9"
                  />
                </div>
                <div className="flex flex-col ml-5 w-[59%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col self-stretch my-auto text-2xl text-black max-md:mt-10">
                    <div className="text-5xl font-medium max-md:text-4xl">
                      {company.name}
                    </div>
                    <div className="mt-2.5">{company.city}, {company.address}</div>
                    <div className="mt-6">tel. {company.numer}</div>
                    <div className="flex gap-3.5 mt-8 text-xl font-light">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9dff8c69447b2449452fd2a05979a57808a0aff7656e6036b6224d1158fcb7a?apiKey=d10d36f0508e433185a32e898689ca50&"
                        alt="Rating"
                        className="aspect-[5.56] w-[229px]"
                      />
                      <div className="my-auto">345 opinii</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*DIV POWYZEJ BEDZIE KOMPONENTNEm*/}

          {/*PONIZSZY DIV - KOMPONENT POBIERAJACY ZDJECIA*/}
          <div className="border border-black flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
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
      <div className="border border-black self-center mt-9 w-full max-w-[1254px] max-md:max-w-full">
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
            <div className=" border border-black flex flex-col grow mt-40 text-black max-md:mt-10 max-md:max-w-full">
              <div className="mr-[150px]">
                <NewServicePicker companyId={company_id} onServiceSelect={handleServiceSelect}/>
              </div>
              <div className="flex gap-5 mr-[150px] self-end justify-between mt-10 max-w-full text-2xl font-light text-center whitespace-nowrap w-[414px] max-md:mt-10 max-md:mr-1">
                <Link to="/" className="px-7 py-1.5 bg-white border border-black border-solid rounded-[30px] max-md:px-5">
                  Cofnij
                </Link>
                <button onClick={handleNext} className="px-7 py-1.5 bg-white border border-black border-solid rounded-[30px] max-md:px-5">
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