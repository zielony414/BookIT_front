import React, { useState }  from "react";
import "./output.css";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import { Component } from "react";


function Rejestracja_firmy(){

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [company, setCompany] = useState([]);
    const [email, setEmail] = useState('');
    const [company_name, setCompanyName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [nip, setNip] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [termsAccepted, setTermsAccepted] = useState('');
    const [newsletterAccepted, setNewsletterAccepted] = useState('');
    const [link_page, setLinkPage] = useState('');
    const [facebook, setFacebook] = useState('');
    const [tt, setTiktok] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [street_number, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [post_code, setCode] = useState('');
    const [stacjonarnie, setStacjonarnie] = useState(true);
    const [mobilnie, setMobilnie] = useState(false);
    const [monday_open, setMondayOpen] = useState('');
    const [monday_close, setMondayClose] = useState('');
    const [tuesday_open, setTuesdayOpen] = useState('');
    const [tuesday_close, setTuesdayClose] = useState('');
    const [wednesday_open, setWednesdayOpen] = useState('');
    const [wednesday_close, setWednesdayClose] = useState('');
    const [thursday_open, setThursdayOpen] = useState('');
    const [thursday_close, setThursdayClose] = useState('');
    const [friday_open, setFridayOpen] = useState('');
    const [friday_close, setFridayClose] = useState('');
    const [saturday_open, setSaturdayOpen] = useState('');
    const [saturday_close, setSaturdayClose] = useState('');
    const [sunday_open, setSundayOpen] = useState('');
    const [sunday_close, setSundayClose] = useState('');
    const [mondayIsOpen, setMondayIsOpen] = useState(false);
    const [tuesdayIsOpen, setTuesdayIsOpen] = useState(false);
    const [wednesdayIsOpen, setWednesdayIsOpen] = useState(false);
    const [thursdayIsOpen, setThursdayIsOpen] = useState(false);
    const [fridayIsOpen, setFridayIsOpen] = useState(false);
    const [saturdayIsOpen, setSaturdayIsOpen] = useState(false);
    const [sundayIsOpen, setSundayIsOpen] = useState(false);

  const handleChange = (setter) => (e) => {
    if (e.target.value.length <= 45) {
      setter(e.target.value);
    }
    
};

const handleEmailChange = handleChange(setEmail);
const handleCompanyNameChange = handleChange(setCompanyName);
const handlePasswordChange = handleChange(setPassword);
const handleConfirmPasswordChange = handleChange(setConfirmPassword);
const handlePhoneChange = handleChange(setPhone);
const handleNipChange = handleChange(setNip);
const handleTypeChange = handleChange(setType);
const handleDescriptionChange = handleChange(setDescription);
const handleLinkPageChange = handleChange(setLinkPage);
const handleFacebookChange = handleChange(setFacebook);
const handleTiktokChange = handleChange(setTiktok);
const handleLinkedinChange = handleChange(setLinkedin);
const handleInstagramChange = handleChange(setInstagram);
const handleTwitterChange = handleChange(setTwitter);
const handleStreetNumberChange = handleChange(setStreet);
const handleCityChange = handleChange(setCity);
const handlePostCodeChange = handleChange(setCode);


const handleStacjonarnieChange = () => {
  setStacjonarnie(!stacjonarnie);
  if (!stacjonarnie) {
    setMobilnie(false);
  }
};

const handleMobilnie = () => {
  setMobilnie(!mobilnie);
  if (!mobilnie) {
    setStacjonarnie(false);
  }
};

const handleToggle = (setter) => () => {
  setter((prev) => !prev);
};

const handleTermsAcceptedChange = handleToggle(setTermsAccepted);
const handleNewsletterAcceptedChange = handleToggle(setNewsletterAccepted);

const handleSubmit = async () => {
  const newCompany = {
      email: email,
      company_name: company_name,
      password: password,
      confirmPassword: confirmPassword,
      phone: phone,
      nip: nip,
      description: description,
      termsAccepted: termsAccepted,
      newsletterAccepted: newsletterAccepted,
      link_page: link_page,
      facebook: facebook,
      tiktok: tt,
      linkedin: linkedin,
      instagram: instagram,
      twitter: twitter,
      street_number: street_number,
      city: city,
      type: type,
      post_code: post_code,
      stacjonarnie: stacjonarnie,
      mobilnie: mobilnie,
      monday_open: monday_open,
      monday_close: monday_close,
      tuesday_open: tuesday_open,
      tuesday_close: tuesday_close,
      wednesday_open: wednesday_open,
      wednesday_close: wednesday_close,
      thursday_open: thursday_open,
      thursday_close: thursday_close,
      friday_open: friday_open,
      friday_close: friday_close,
      saturday_open: saturday_open,
      saturday_close: saturday_close,
      sunday_open: sunday_open,
      sunday_close: sunday_close,
  };

  try {
      const response = await fetch('/api/strona_rejestracji_firmy/create', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCompany),
      });

      const data = await response.json();
      if (response.ok) {
          console.log('Form submitted successfully:', data);
          alert('Dane poprawne. Kontynuuj');
          // Reset form fields if needed
          
      } else {
          console.error('Error submitting form:', data.error);
          alert('Niepoprawne dane. Sprawdź wypełnione pola.');
      }
  } catch (error) {
      console.error('An error occurred while submitting the form:', error);
  }
};

const handleFinish = () => {
  navigate('/logowanie');
};

  
    const scrollToNext = (headerId) => {
      const element = document.getElementById(headerId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.error('Element with ID ' + headerId + ' not found.');
      }
    };
  

    const handleCheckboxChange = (setter) => () => {
        setter((prev) => !prev);
      
    };

    
    const daysOfWeek = [
      { name: 'monday', label: 'Poniedziałek', open: monday_open, close: monday_close, isOpen: mondayIsOpen, setOpen: setMondayOpen, setClose: setMondayClose, setIsOpen: setMondayIsOpen },
      { name: 'tuesday', label: 'Wtorek', open: tuesday_open, close: tuesday_close, isOpen: tuesdayIsOpen, setOpen: setTuesdayOpen, setClose: setTuesdayClose, setIsOpen: setTuesdayIsOpen },
      { name: 'wednesday', label: 'Środa', open: wednesday_open, close: wednesday_close, isOpen: wednesdayIsOpen, setOpen: setWednesdayOpen, setClose: setWednesdayClose, setIsOpen: setWednesdayIsOpen },
      { name: 'thursday', label: 'Czwartek', open: thursday_open, close: thursday_close, isOpen: thursdayIsOpen, setOpen: setThursdayOpen, setClose: setThursdayClose, setIsOpen: setThursdayIsOpen },
      { name: 'friday', label: 'Piątek', open: friday_open, close: friday_close, isOpen: fridayIsOpen, setOpen: setFridayOpen, setClose: setFridayClose, setIsOpen: setFridayIsOpen },
      { name: 'saturday', label: 'Sobota', open: saturday_open, close: saturday_close, isOpen: saturdayIsOpen, setOpen: setSaturdayOpen, setClose: setSaturdayClose, setIsOpen: setSaturdayIsOpen },
      { name: 'sunday', label: 'Niedziela', open: sunday_open, close: sunday_close, isOpen: sundayIsOpen, setOpen: setSundayOpen, setClose: setSundayClose, setIsOpen: setSundayIsOpen },
    ];

    const generateTimeOptions = () => {
      const options = [];
      for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 30) {
          const hour = h.toString().padStart(2, '0');
          const minute = m.toString().padStart(2, '0');
          options.push(`${hour}:${minute}`);
        }
      }
      return options;
    };

 
    const [isDataTrue, setIsDataTrue] = useState(false); // Definicja stanu isDataTrue

  

    const Button = ({ children, onClick, type = 'button' }) => (
        <button type={type} onClick={onClick} className="bg-white border border-black border-solid" style={{ borderRadius: '1rem', width: "100px", height: "50px", marginRight: "50px" }}>
          {children}
        </button>
      );


      const Footer = () => (
        <footer className="flex flex-col items-start px-8 pt-5 pb-3.5 mt-24 w-full text-white bg-black max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <nav className="flex gap-5 justify-between text-base">
            <div className="flex gap-4">
              <div>O nas</div>
              <div>Kontakt</div>
            </div>
            <div>FAQ</div>
          </nav>
          <div className="shrink-0 self-stretch mt-2 bg-white border border-white border-solid h-[5px] max-md:max-w-full"></div>
          <div className="justify-center mt-4 text-xs font-light">
            © 2024 PRZ All Rights Reserved
          </div>
        </footer>
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

  const DodajUsluge = () => {
    const [services, setServices] = useState([]);
    const [serviceName, setServiceName] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(30);
    const [price, setPrice] = useState(0);
    const [isApproximate, setIsApproximate] = useState(false);
    const [isExact, setIsExact] = useState(true);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
  
    const navigate = useNavigate();


    
    const handleApproximateChange = () => {
      setIsApproximate(!isApproximate);
      if (!isApproximate) {
        setIsExact(false);
      }
    };
  
    const handleExactChange = () => {
      setIsExact(!isExact);
      if (!isExact) {
        setIsApproximate(false);
      }
    };

    const handleServiceNameChange = (e) => {
      if (e.target.value.length <= 45) {
        setServiceName(e.target.value);
      }
    };
  
    const handleServiceTypeChange = (e) => {
      if (e.target.value.length <= 45) {
        setServiceType(e.target.value);
      }
    };
  
    const handleServiceDescriptionChange = (e) => {
      if (e.target.value.length <= 255) {
        setServiceDescription(e.target.value);
      }
    };

    const handleAddService = async () => {
      const newService = {
        name: serviceName,
        type: serviceType,
        description: serviceDescription,
        duration: hours * 60 + minutes,
        price: price,
        isApproximate: isApproximate,
        isExact: isExact,
      };

      try {
        const response = await fetch('/api/strona_rejestracji_firmy/usługa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newService),
        });
  
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message);
          setError(null);
          // Clear form fields
          setServiceName('');
          setServiceType('');
          setServiceDescription('');
          setHours(0);
          setMinutes(30);
          setPrice(0);
          setServices([...services, newService]);
        } else {
          setError(data.error);
          setMessage(null);
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Błąd połączenia z serwerem!', error);
        alert('An error occurred while adding the service. Please try again.');
      }
    };

    const decrementMinutes = () => {
      if (minutes === 30) {
        setMinutes(0);
        setHours(hours + 1);
      } else {
        setMinutes(minutes + 30);
      }
    };

  
    const handleRemoveService = (indexToRemove) => {
      setServices(services.filter((_, index) => index !== indexToRemove));
    };
    const incrementMinutes = () => {
      if (minutes === 0) {
        if (hours > 0) {
          setMinutes(30);
          setHours(hours - 1);
        }
      } else {
        setMinutes(minutes - 30);
      }
    };
    
    return (
      <>
        <h2 id="dodaj_usluge" className="mt-24 text-5xl font-light text-center text-black max-md:mt-10 max-md:text-4xl">
          DODAJ USŁUGĘ
        </h2>
        <div className="mt-16 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <section className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow px-5 pt-3 pb-20 mx-auto w-full text-base font-light leading-6 text-black rounded-3xl bg-stone-200 max-md:px-5 max-md:mt-8">
                <div className="self-center text-center">Twoje usługi</div>
                {services.map((service, index) => (
                  <div
                key={index}
                className="flex gap-5 justify-between items-start px-3.5 py-5 mt-5 bg-white rounded-xl border border-solid border-zinc-400"
              >
                <div className="my-auto">{service.name}</div>
                <button onClick={() => handleRemoveService(index)} className="shrink-0 self-start w-6 aspect-square">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/842d74c43b07986af21c788d92c781964afae42d5a25aec53862274319acd1de?apiKey=fa72ebbe438d43ed95dbc11d9e8b3cf8&"
                    alt="Service Icon"
                  />
                </button>
              </div>
                ))}
              </div>
            </section>
            <section className="flex flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow px-14 pt-8 pb-4 w-full rounded-3xl bg-stone-200 max-md:px-5 max-md:mt-8 max-md:max-w-full">
              <input
                type="text"
                value={serviceName}
                onChange={handleServiceNameChange}
                placeholder="Nazwa usługi"
                className="mb-4 p-2 rounded-lg border border-gray-400"
                style={{marginLeft: "20px", marginRight: "20px"}}
              />
                <input
                type="text"
                value={serviceType}
                onChange={handleServiceTypeChange}
                placeholder="Typ usługi"
                className="mb-4 p-2 rounded-lg border border-gray-400"
                style={{marginLeft: "20px", marginRight: "20px"}}
              />
              <textarea
                value={serviceDescription}
                onChange={handleServiceDescriptionChange}
                placeholder="Opis"
                className="mb-4 p-2 rounded-lg border border-gray-400"
                style={{marginLeft: "20px", marginRight: "20px"}}
              />
                <div className="flex gap-5 justify-between mt-5 max-md:flex-wrap">
                  <div className="flex flex-col text-xl font-light leading-6 text-black" style={{ width: "150px",marginRight: "30px", marginBottom: "20px"}}>
                    <div>Czas trwania:</div>
                    <div className="mt-2 text-sm leading-6"style={{marginRight: "20px", marginBottom: "0px"}}>*minimum 30 min</div>
                    <div className="mt-12 max-md:mt-10">Cena za usługę:</div>
                  </div>
                  <div className="flex flex-col text-xl leading-6 text-black whitespace-nowrap">
                  <div className="flex gap-2 items-center">
                  <div>
                    <div className="font-light leading-6 text-black">godz.</div>
                    <div className="flex flex-col justify-center items-center self-start py-1 bg-white rounded-xl border border-black border-solid" style={{ width: "50px", marginBottom: "50px" }}>
                      {hours}
                    </div>
                  </div>
                  <div>
                    <div className="font-light leading-6 text-black">min</div>
                    <div className="flex flex-col justify-center items-center self-start py-1 bg-white rounded-xl border border-black border-solid" style={{ width: "50px", marginBottom: "50px" }}>
                      {minutes}
                    </div>
                  </div>
                </div>

                    <div className="mt-9 font-light leading-6 text-black" >cena</div>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="justify-center items-start px-3.5 py-0.5 mt-1 bg-white rounded-xl border border-black border-solid"
                      style={{width: "100px", marginBottom: "30px"}}
                    />
                  </div>
                  
                  <div className="flex flex-col mt-5">
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={decrementMinutes}
                        className="shrink-0 aspect-square w-[34px] flex justify-center items-center border border-black border-solid rounded-lg"
                      style={{width: "30px", height: "30px"}}>
                        +
                      </button>

                      <button
                        type="button"
                        onClick={incrementMinutes}
                        className="shrink-0 aspect-square w-[34px] flex justify-center items-center border border-black border-solid rounded-lg"
                        style={{width: "30px", height: "30px"}}>
                        -
                      </button>
                    </div>
                    <div className="flex items-center mt-2" style={{marginTop: "100px"}}>
                    <input
                      type="checkbox"
                      checked={isApproximate}
                      onChange={handleApproximateChange}
                      className="mr-2"
                    />
                    <label>Przybliżona cena</label>
                  </div>
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      checked={isExact}
                      onChange={handleExactChange}
                      className="mr-2"
                    />
                    <label>Dokładna cena</label>
                  </div>
                  <button
                    onClick={handleAddService}
                    className="bg-white border border-black border-solid font-light text-center"
                    style={{ borderRadius: '1rem', width: "100px", height: "50px", marginLeft: "120px", marginBottom: "10px", marginRight: "10px", marginTop: "10px" }}
                  > Dodaj </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    );
  };


return(
  <>
  <Header />
 <div className="flex flex-col pb-20 bg-white">
      <main className="flex flex-col items-center self-center px-5 mt-36 w-full max-w-[1130px] max-md:mt-10 max-md:max-w-full">
        <h1 className="text-5xl font-light text-center text-black max-md:text-4xl">
          DODAJ FIRMĘ
        </h1>
        <div style={{marginLeft: "50px"}}>
          <div className="flex gap-5 mt-4 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col flex-1 max-md:max-w-full">
                  <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                    Email
                  </label>
                  <input className="mb-4 p-2 rounded-lg border border-gray-400"
                    type="email" value={email} onChange={handleEmailChange} placeholder="Email"
                    style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }} 
                  />
                </div>
                <div className="flex flex-col flex-1 max-md:max-w-full">
                  <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                    Nazwa Firmy
                  </label>
                  <input className="mb-4 p-2 rounded-lg border border-gray-400"
                    type="text" value={company_name} onChange={handleCompanyNameChange} placeholder="Nazwa Firmy"
                    style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }} 
                  />
                </div>
          </div>
          <div className="flex gap-5 mt-4 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                  Hasło (min. 8 znaków)
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={password} onChange={handlePasswordChange} type="password" placeholder="Hasło" 
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }}/>
            </div>
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                  Powtórz hasło
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={confirmPassword} onChange={handleConfirmPasswordChange} type="password" placeholder="Powtórz hasło"
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }}/>
            </div>
          </div>
          
          <div className="flex gap-5 mt-4 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                  Telefon
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={phone} onChange={handlePhoneChange} type="text" placeholder="Telefon"                
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }}/>
            </div>
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                  NIP
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={nip} onChange={handleNipChange} type="text" placeholder="NIP"                
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }}/>
            </div>
            
          </div>
          <div className="flex gap-5 mt-4 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                  Opis
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={description} onChange={handleDescriptionChange} type="text" placeholder="Opis"               
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }}/>
            </div>
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                  Kategoria firmy
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={type} onChange={handleTypeChange} type="text" placeholder="Kategoria"                
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }}/>
            </div>
          </div>
          <div className="self-center mt-5 max-md:max-w-full" style={{ marginBottom: "50px" }}>
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col grow font-light max-md:mt-10 max-md:max-w-full">
                <div className="flex items-center mt-5 leading-[120%]">
                <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={handleTermsAcceptedChange}
                      className="mr-2"
                    />
                    <label>Akceptuję wszelkie umowy i warunki</label>
                </div>
                <div className="flex items-center mt-5 leading-6">
                  <input
                    type="checkbox"
                    name="newsletterAccepted"
                    checked={newsletterAccepted}
                    onChange={handleNewsletterAcceptedChange}
                    className="mr-2"
                    style={{marginRight: "10px"}}
                  />
                  Wyrażam chęć na przesyłanie korespondencji na adres mailowy
                </div>
              </div>
              <div className="flex flex-col grow font-light" style={{ width: "100px", height: "80px", marginTop: "30px", marginLeft: "50px" }}>
                <Button onClick={() => scrollToNext('daj_sie_znalezc')} type='button'>Dalej</Button>
              </div>
            </div>
          </div>
        
        </div>


        <h2 id="daj_sie_znalezc" className="mt-20 text-5xl font-light text-center text-black max-md:mt-10 max-md:text-4xl" style={{marginTop: "80px"}}>
          DAJ SIĘ ZNALEŹĆ
        </h2>
        <div style={{marginLeft: "50px"}}>
        <form className="self-stretch mt-8">
        <div className="flex gap-5 mt-4 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col gap-5 mt-4 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                  Ulica i numer
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={street_number} onChange={handleStreetNumberChange} type="street" placeholder="Ulica i numer"               
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }}/>
            </div>
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                  Miejscowość
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={city} onChange={handleCityChange} type="text" placeholder="Miejscowość"               
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }}/>
            </div>
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                  Kod pocztowy
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={post_code} onChange={handlePostCodeChange} type="code" placeholder="Kod pocztowy"               
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }}/>
            </div>
          </div>
          <div className="self-center mt-5 max-md:max-w-full" >
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col grow font-light max-md:mt-10 max-md:max-w-full">
                <div className="flex items-center mt-5 leading-[120%]">
                  <input
                    type="checkbox"
                    name="stacjonarnie"
                    checked={stacjonarnie}
                    onChange={handleStacjonarnieChange}
                    className="mr-2"
                    style={{marginRight: "10px"}}
                  />
                  Stacjonarnie
                </div>
                <div className="flex items-center mt-5 leading-6">
                  <input
                    type="checkbox"
                    name="mobilnie"
                    checked={mobilnie}
                    onChange={handleMobilnie}
                    className="mr-2"
                    style={{marginRight: "10px"}}
                  />
                 Świadczę usługi mobilne
                </div>
              </div>
            </div>
          </div>
          </div>
        </form>
        </div>
        <div style={{marginLeft: "50px"}}>
        <section className="mt-9 w-full max-w-[1014px] max-md:max-w-full">
            <div className="flex gap-5 mt-4 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                  Strona Internetowa
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={link_page} onChange={handleLinkPageChange} type="text" placeholder="Strona Internetowa"               
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }}/>
            </div>
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                  Facebook
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={facebook} onChange={handleFacebookChange} type="text" placeholder="Facebook"               
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }}/>
            </div>
            </div>
            <div className="flex gap-5 mt-4 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                  TikTok
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={tt} onChange={handleTiktokChange} type="text" placeholder="TikTok"               
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }}/>
            </div>
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                  Linkedin
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={linkedin} onChange={handleLinkedinChange} type="text" placeholder="Linkedin"               
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }}/>
            </div>
            </div>
            <div className="flex gap-5 mt-4 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                  Instagram
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={instagram} onChange={handleInstagramChange} type="text" placeholder="Instagram"               
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }}/>
            </div>
            <div className="flex flex-col flex-1 max-md:max-w-full">
              <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
                  X
                </label>
              <input className="mb-4 p-2 rounded-lg border border-gray-400"
                value={twitter} onChange={handleTwitterChange} type="text" placeholder="X"               
                style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }}/>
            </div>
            </div>
        </section>
        </div>
        <div className="flex flex-col grow font-light" style={{ width: "100px", height: "80px", marginTop: "30px", marginLeft: "50px" }}>
            <Button onClick={() => scrollToNext('godziny_otwarcia')} type='button'>Dalej</Button>
        </div>
        <h2 id="godziny_otwarcia" className="mt-60 text-5xl font-light text-center text-black max-md:mt-10 max-md:max-w-full max-md:text-4xl" style={{ marginTop: "100px" }}>
        GODZINY OTWARCIA
      </h2>
      <section className="flex flex-col items-center px-16 pt-3.5 pb-7 mt-10 max-w-full text-xl leading-6 text-black whitespace-nowrap rounded-3xl bg-stone-200 w-[710px] max-md:px-5 max-md:mt-10">
          <div className="self-center mt-5 max-md:max-w-full" style={{ marginBottom: "50px" }}>
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col grow font-light max-md:mt-10 max-md:max-w-full">
              {daysOfWeek.map((day) => (
                <div className="flex items-center mt-5 leading-6" key={day.name}>
                  <input
                    type="checkbox"
                    name={`${day.name}_checked`}
                    checked={day.isOpen}
                    onChange={handleCheckboxChange(day.setIsOpen)}
                    className="mr-2"
                    style={{ marginRight: "10px" }}
                  />
                  <span className="mr-2">{day.label}</span>
                  <select
                    className="mr-2 p-1 rounded-lg border border-gray-400"
                    name={`${day.name}_open`}
                    value={day.open}
                    onChange={handleChange(day.setOpen)}
                  >
                    {generateTimeOptions().map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  -
                  <select
                    className="ml-2 p-1 rounded-lg border border-gray-400"
                    name={`${day.name}_close`}
                    value={day.close}
                    onChange={handleChange(day.setClose)}
                  >
                    {generateTimeOptions().map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              ))}
              </div>
            </div>
          </div>
          <button
            className="justify-center px-7 py-1.5 font-light bg-white border border-black border-solid rounded-[30px] max-md:px-5"
            tabIndex="0" onClick={handleSubmit}
          >
            Zatwierdź dane
          </button>
      </section>
        
        <div className="flex flex-col grow font-light" style={{ width: "100px", height: "80px", marginTop: "30px", marginLeft: "500px" }}>
            <Button onClick={() => scrollToNext('dodaj_zdjecia')} type='button'>Dalej</Button>
        </div>
        

        <h2 id="dodaj_zdjecia" className="mt-72 text-5xl font-light text-center text-black max-md:mt-10 max-md:text-4xl" style={{ marginTop: "100px" }}>
        DODAJ ZDJĘCIA
      </h2>
      <div style={{marginTop: "15px"}}>
        Dodaj pierwsze zdjęcie jako logo twojej firmy
      </div>
      <div className="flex flex-col items-center px-16 pt-3.5 pb-7 mt-10 max-w-full text-xl leading-6 text-black whitespace-nowrap rounded-3xl bg-stone-200 w-[710px] max-md:px-5 max-md:mt-10">
      <ImageUpload />
      </div>
      <div className="flex flex-col grow font-light" style={{ width: "100px", height: "80px", marginTop: "30px", marginLeft: "50px" }}>
        <Button onClick={() => scrollToNext('dodaj_usluge')} type='button'>Dalej</Button>
        </div>
      <DodajUsluge />

        <div className="flex gap-5 justify-between mt-16 max-w-full text-2xl font-light text-center text-black whitespace-nowrap w-[823px] max-md:flex-wrap max-md:mt-10">
          <button
            className="justify-center px-7 py-1.5 bg-white border border-black border-solid rounded-[30px] max-md:px-5"
            tabIndex="0" style={{marginLeft: "350px"}} onClick={handleFinish}
          >
            Zakończ
          </button>
        </div>

      </main>
    </div>
<Footer />
  </>
);

}



export default Rejestracja_firmy;