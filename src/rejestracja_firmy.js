import React, { useState }  from "react";
import "./output.css";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import { Component } from "react";
import DodajUsluge from "./Dodaj_usluge";


function Rejestracja_firmy(){

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const scrollToNext = (headerId) => {
      const element = document.getElementById(headerId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.error('Element with ID ' + headerId + ' not found.');
      }
    };
  
    const [formData, setFormData] = useState({
      email: '',
      companyName: '',
      password: '',
      confirmPassword: '',
      phone: '',
      NIP: '',
      description: '',
      termsAccepted: false,
      newsletterAccepted: false,
      website: '',
      facebook: '',
      titok: '',
      linkedin: '',
      instagram: '',
      twitter: '',
      street: '',
      city: '',
      code: '',
      stacjonarnie: false,
      mobilnie: false,
      workingHours: {
        monday: { checked: false, open: '00:00', close: '00:00' },
        tuesday: { checked: false, open: '00:00', close: '00:00' },
        wednesday: { checked: false, open: '00:00', close: '00:00' },
        thursday: { checked: false, open: '00:00', close: '00:00' },
        friday: { checked: false, open: '00:00', close: '00:00' },
        saturday: { checked: false, open: '00:00', close: '00:00' },
        sunday: { checked: false, open: '00:00', close: '00:00' },
      },
    });
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      const [day, time] = name.split('_');
      if (time) {
        setFormData((prevData) => ({
          ...prevData,
          workingHours: {
            ...prevData.workingHours,
            [day]: {
              ...prevData.workingHours[day],
              [time]: value,
            },
          },
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
        }));
      }
    };
  
    const handleCheckboxChange = (day) => (e) => {
      const { checked } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        workingHours: {
          ...prevData.workingHours,
          [day]: {
            ...prevData.workingHours[day],
            checked: checked,
          },
        },
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (formData.password !== formData.confirmPassword) {
        setError('Hasła nie są takie same.');
        setMessage(null);
        return;
      }
  
      try {
        const response = await fetch('/api/user_registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message);
          setError(null);
          navigate('/logowanie');
        } else {
          setError(data.error);
          setMessage(null);
        }
      } catch (err) {
        console.error('Błąd połączenia z serwerm!', error);
        alert('An error occurred during login. Please try again.');
      }
    };


    const daysOfWeek = [
      { name: 'poniedzialek', label: 'Poniedziałek' },
      { name: 'wtorek', label: 'Wtorek' },
      { name: 'sroda', label: 'Środa' },
      { name: 'czwartek', label: 'Czwartek' },
      { name: 'piatek', label: 'Piątek' },
      { name: 'sobota', label: 'Sobota' },
      { name: 'niedziela', label: 'Niedziela' },
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

    const handleTimeChange = (day, type, value) => {
      setFormData({
        ...formData,
        workingHours: {
          ...formData.workingHours,
          [day]: {
            ...formData.workingHours[day],
            [type]: value,
          },
        },
      });
    };

    const [isDataTrue, setIsDataTrue] = useState(false); // Definicja stanu isDataTrue

  

    const Button = ({ children, onClick, type = 'button' }) => (
        <button type={type} onClick={onClick} className="bg-white border border-black border-solid" style={{ borderRadius: '1rem', width: "100px", height: "50px", marginRight: "50px" }}>
          {children}
        </button>
      );

      const InputField = ({ label, placeholder, name, type = "text" }) => {
        return (
          <div className="flex flex-col flex-1 max-md:max-w-full">
            <label className="text-lg leading-6 text-zinc-800 max-md:max-w-full" style={{ marginLeft: "50px" }}>
              {label}
            </label>
            <input
              name={name}
              type={type}
              className="justify-center items-start px-4 py-3 mt-1.5 text-sm bg-white border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full"
              placeholder={placeholder}
              style={{ borderRadius: '0.5rem', width: '350px', marginRight: "50px", marginLeft: "50px" }} 
            />
          </div>
        );
      };


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
    <div className="flex gap-5 justify-between px-5 py-1.5 w-full text-xs text-center text-black mix-blend-darken bg-stone-200 max-md:flex-wrap max-md:max-w-full" style={{ marginBottom: "100px" }}>
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

  const DodajUsluge = () => {
    const [services, setServices] = useState([]);
    const [serviceName, setServiceName] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(30);
    const [price, setPrice] = useState(0);
    const [isApproximate, setIsApproximate] = useState(false);
    const [isExact, setIsExact] = useState(false);
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
        const response = await fetch('/api/add_service', {
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
          setIsApproximate(false);
          setIsExact(false);
          navigate('/logowanie'); // Replace with the desired route after adding the service
        } else {
          setError(data.error);
          setMessage(null);
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
                style={{marginLeft: "50px", marginRight: "50px"}}
              />
                <input
                type="text"
                value={serviceType}
                onChange={handleServiceTypeChange}
                placeholder="Typ usługi"
                className="mb-4 p-2 rounded-lg border border-gray-400"
                style={{marginLeft: "50px", marginRight: "50px"}}
              />
              <textarea
                value={serviceDescription}
                onChange={handleServiceDescriptionChange}
                placeholder="Opis"
                className="mb-4 p-2 rounded-lg border border-gray-400"
                style={{marginLeft: "50px", marginRight: "50px"}}
              />
                <div className="flex gap-5 justify-between mt-5 max-md:flex-wrap">
                  <div className="flex flex-col text-xl font-light leading-6 text-black" style={{marginLeft: "50px", marginRight: "30px", marginBottom: "20px"}}>
                    <div>Czas trwania:</div>
                    <div className="mt-2 text-sm leading-6"style={{marginLeft: "50px", marginRight: "20px", marginBottom: "50px"}}>*minimum 30 min</div>
                    <div className="mt-12 max-md:mt-10">Cena za usługę:</div>
                  </div>
                  <div className="flex flex-col text-xl leading-6 text-black whitespace-nowrap">
                  <div className="flex gap-2 items-center">
                  <div>
                    <div className="font-light leading-6 text-black">godz.</div>
                    <div className="flex flex-col justify-center items-center self-start py-1 bg-white rounded-xl border border-black border-solid" style={{ width: "50px", marginBottom: "5px" }}>
                      {hours}
                    </div>
                  </div>
                  <div>
                    <div className="font-light leading-6 text-black">min</div>
                    <div className="flex flex-col justify-center items-center self-start py-1 bg-white rounded-xl border border-black border-solid" style={{ width: "50px", marginBottom: "5px" }}>
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
                    <div className="flex items-center mt-2" style={{marginTop: "30px"}}>
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
                    style={{ borderRadius: '1rem', width: "100px", height: "50px", marginLeft: "120px", marginBottom: "10px", marginRight: "10px" }}
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

const Hero = () => (
    <div className="flex flex-col pb-20 bg-white">
      <main className="flex flex-col items-center self-center px-5 mt-36 w-full max-w-[1130px] max-md:mt-10 max-md:max-w-full">
        <h1 className="text-5xl font-light text-center text-black max-md:text-4xl">
          DODAJ FIRMĘ
        </h1>
        <div style={{marginLeft: "50px"}}>
        <form className="self-stretch mt-8">
        <div className="flex gap-5 mt-4 max-md:flex-col max-md:gap-0">
          <InputField label="Email" id="email" type="email" placeholder="Email" />
          <InputField label="Nazwa firmy" id="companyName" placeholder="Nazwa firmy" />
          </div>
          <div className="flex gap-5 mt-4 max-md:flex-col max-md:gap-0">
          <InputField label="Hasło" name="password" placeholder="Wprowadź swoje hasło" type="password" />
            <InputField label="Powtórz hasło" name="confirmPassword" placeholder="Powtórz swoje hasło" type="password" />
          </div>
          <div className="flex gap-5 mt-4 max-md:flex-col max-md:gap-0">
          <InputField label="Telefon" id="phone" placeholder="Numer telefonu" />
            <InputField label="NIP" id="nip" placeholder="NIP" />
          </div>
          <div className="flex gap-5 mt-4 max-md:flex-col max-md:gap-0">
          <InputField label="Opis" id="description" placeholder="Powiedz kilka słów o twojej firmie" />
          </div>
          <div className="self-center mt-5 max-md:max-w-full" style={{ marginBottom: "50px" }}>
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col grow font-light max-md:mt-10 max-md:max-w-full">
                <div className="flex items-center mt-5 leading-[120%]">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="mr-2"
                    style={{marginRight: "10px"}}
                  />
                  Akceptuję wszelkie umowy i warunki*
                </div>
                <div className="flex items-center mt-5 leading-6">
                  <input
                    type="checkbox"
                    name="newsletterAccepted"
                    checked={formData.newsletterAccepted}
                    onChange={handleChange}
                    className="mr-2"
                    style={{marginRight: "10px"}}
                  />
                  Wyrażam chęć na przesyłanie korespondencji na adres mailowy*
                </div>
              </div>
              <div className="flex flex-col grow font-light" style={{ width: "100px", height: "80px", marginTop: "30px", marginLeft: "50px" }}>
                <Button onClick={() => scrollToNext('daj_sie_znalezc')} type='button'>Dalej</Button>
              </div>
            </div>
          </div>
        </form>
        </div>


        <h2 id="daj_sie_znalezc" className="mt-20 text-5xl font-light text-center text-black max-md:mt-10 max-md:text-4xl" style={{marginTop: "80px"}}>
          DAJ SIĘ ZNALEŹĆ
        </h2>
        <div style={{marginLeft: "50px"}}>
        <form className="self-stretch mt-8">
        <div className="flex gap-5 mt-4 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col gap-5 mt-4 max-md:flex-col max-md:gap-0">
          <InputField label="Ulica i numer" id="street" type="street" placeholder="Ulica i numer lokalu" />
          <InputField label="Miejscowość" id="city" placeholder="Miejscowość" />
          <InputField label="Kod pocztowy" name="code" placeholder="Kod pocztowy" type="code" />
          </div>
          <div className="self-center mt-5 max-md:max-w-full" >
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col grow font-light max-md:mt-10 max-md:max-w-full">
                <div className="flex items-center mt-5 leading-[120%]">
                  <input
                    type="checkbox"
                    name="stacjonarnie"
                    checked={formData.stacjonarnie}
                    onChange={handleChange}
                    className="mr-2"
                    style={{marginRight: "10px"}}
                  />
                  Stacjonarnie
                </div>
                <div className="flex items-center mt-5 leading-6">
                  <input
                    type="checkbox"
                    name="mobilnie"
                    checked={formData.mobilnie}
                    onChange={handleChange}
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
            <InputField label="Strona Internetowa" id="Website" placeholder="website" />
            <InputField label="Facebook" id="facebook" placeholder="Facebook" />
            </div>
            <div className="flex gap-5 mt-4 max-md:flex-col max-md:gap-0">
            <InputField label="Tiktok" id="tiktok" placeholder="Tiktok" />
            <InputField label="Linkedin" id="linkedin" placeholder="Linkedin" />
            </div>
            <div className="flex gap-5 mt-4 max-md:flex-col max-md:gap-0">
            <InputField label="Instagram" id="instagram" placeholder="Instagram" />
            <InputField label="Twitter" id="twitter" placeholder="Twitter" />
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
        <form onSubmit={handleSubmit}>
          <div className="self-center mt-5 max-md:max-w-full" style={{ marginBottom: "50px" }}>
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col grow font-light max-md:mt-10 max-md:max-w-full">
                {daysOfWeek.map((day) => (
                  <div className="flex items-center mt-5 leading-6" key={day.name}>
                    <input
                      type="checkbox"
                      name={`${day.name}_checked`}
                      checked={formData.workingHours[day.name]?.checked || false}
                      onChange={handleCheckboxChange(day.name)}
                      className="mr-2"
                      style={{ marginRight: "10px" }}
                    />
                    <span className="mr-2">{day.label}</span>
                    <select
                      className="mr-2 p-1 rounded-lg border border-gray-400"
                      name={`${day.name}_open`}
                      value={formData.workingHours[day.name]?.open || '00:00'}
                      onChange={(e) => handleTimeChange(day.name, 'open', e.target.value)}
                    >
                      {generateTimeOptions().map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    -
                    <select
                      className="ml-2 p-1 rounded-lg border border-gray-400"
                      name={`${day.name}_close`}
                      value={formData.workingHours[day.name]?.close || '00:00'}
                      onChange={(e) => handleTimeChange(day.name, 'close', e.target.value)}
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
        </form>
      </section>
        <div className="flex flex-col grow font-light" style={{ width: "100px", height: "80px", marginTop: "30px", marginLeft: "50px" }}>
            <Button onClick={() => scrollToNext('dodaj_usluge')} type='button'>Dalej</Button>
        </div>
        <DodajUsluge />
        <div className="flex flex-col grow font-light" style={{ width: "100px", height: "80px", marginTop: "30px", marginLeft: "50px" }}>
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
      <div className="mt-20 text-2xl font-light leading-6 text-black max-md:mt-10 max-md:max-w-full flex items-center">
        <input
          type="checkbox"
          checked={isDataTrue}
          onChange={(e) => setIsDataTrue(e.target.checked)}
          className="mr-2"
        />
        Zatwierdzam, że podane dane są prawdziwe
      </div>
        <div className="flex gap-5 justify-between mt-16 max-w-full text-2xl font-light text-center text-black whitespace-nowrap w-[823px] max-md:flex-wrap max-md:mt-10">
          <button
            className="justify-center px-7 py-1.5 bg-white border border-black border-solid rounded-[30px] max-md:px-5"
            tabIndex="0"
          >
            Zakończ
          </button>
        </div>
      </main>
    </div>
    
    );


    return (
        <>
          <Header />
          <Hero />
          <Footer />
        </>
      );
}



export default Rejestracja_firmy;