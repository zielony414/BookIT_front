import React, { useState }  from "react";
import "./output.css";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import { Component } from "react";

function DodajUsluge (){
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

    const Button = ({ children, onClick, type = 'button' }) => (
        <button type={type} onClick={onClick} className="bg-white border border-black border-solid" style={{ borderRadius: '1rem', width: "100px", height: "50px", marginRight: "50px" }}>
          {children}
        </button>
      );
    
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
                  ></button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    );
  };

  export default DodajUsluge;