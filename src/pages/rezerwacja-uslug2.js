import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MyDatePicker from "../components/MyDatePicker";
import TimePicker from "../components/TimePicker";


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
        <button onClick={() => navigate('/logowanie')} className="justify-center px-2.5 py-3.5 bg-white rounded-md border-b border-black border-solid">
          Zaloguj się/załóż konto
        </button>
        <button onClick={() => navigate('/rejestracja_firmy')} className="justify-center px-2.5 py-3.5 bg-white rounded-md border-b border-black border-solid">
          Dodaj swoją firmę
        </button>
      </div>
    </div>
);
}

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

function ContactForm_logged({ setName, setEmail, setPhone }) {
    return (
      <section className="flex flex-col self-stretch font-light max-md:max-w-full">      
        <h3 className="text-3xl font-semibold text-black">Dane kontaktowe</h3>      
        <div className="flex flex-col mt-[10px] max-md:mt-10 max-md:max-w-[sm]"> {/* Lub max-w-[md] */}
          <label htmlFor="name" className="text-lg leading-6 text-zinc-800 max-md:max-w-full"> Imię </label>
          <input
          type="text"
          id="name"
          placeholder="Wprowadź swoje imię"
          aria-label="Wprowadź swoje imię"
          className="justify-center items-start px-5 py-3 mt-1 text-sm bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full"
          onChange={(e) => setName(e.target.value)}
        />
        </div>
  
        <div className="flex flex-col mt-8 max-md:mt-10 max-md:max-w-[sm]"> {/* Lub max-w-[md] */}
          <label htmlFor="email" className="text-lg leading-6 text-zinc-800 max-md:max-w-full"> Email </label>
          <input
            type="email" 
            id="email" 
            placeholder="Wprowadź swój email" 
            aria-label="Wprowadź swój email"
            className="justify-center items-start px-5 py-3 mt-1 text-sm bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-8 max-md:mt-10 max-md:max-w-[sm]"> {/* Lub max-w-[md] */}
          <label htmlFor="phone" className="text-lg leading-6 text-zinc-800 max-md:max-w-full"> Numer telefonu </label>
          <input
            type="tel" 
            id="phone" 
            placeholder="Wprowadź swój numer telefonu" 
            aria-label="Wprowadź swój numer telefonu"
            className="justify-center items-start px-5 py-3 mt-1 text-sm bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </section>
    );
}

function Summary(props) {
    // Obliczanie sumy cen usług i czasu wykonania
    const totalSum = props.services.reduce((sum, service) => sum + service.cost, 0);
    const totalTime = props.services.reduce((totalTime, service) => totalTime + service.time_minutes, 0);

    useEffect(() => {
        props.SumUpTime(totalTime);
      }, [totalTime, props]);
  
    return (
      <div className="w-[350px]">
        <h5 className="self-end text-center text-3xl font-semibold max-md:mr-2.5">Podsumowanie:</h5>
        {props.services.map((service) => (
          <div key={service.name} className="flex text-xl justify-between">
            <span>{service.name}</span>
            <span className="font-bold">{service.time_minutes}min  {service.cost}zł</span>
          </div>
        ))}
        <div className="shrink-0 mt-4 mb-4 h-0.5 border border-solid bg-stone-300 bg-opacity-70 border-stone-300 border-opacity-70" />
        <h2 className="self-end text-2xl font-semibold max-md:mr-2.5">Łączny czas: {totalTime}min</h2>
        <h2 className="self-end text-2xl font-semibold max-md:mr-2.5">Suma: {totalSum}zł</h2>      
      </div>
    );
  }

const Rezerwacja_logged = () => {
  const location = useLocation();
  const companyId = 1;
  const { services } = location.state || { services: [] };

  const [sum, setSum] = useState(0);
  const [time, setTime] = useState();
  const [totalTime, setTotaltime] = useState();
  const [date, setDate] = useState(new Date());

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');


  const handleConfirm = async () => {
    const bookingData = {
      company_id: companyId,
      user_id: 1,  // przykładowy user_id
      service_id: 1,  
      booking_time: services.time,
      confirm_mail: 1,
      reminder_mail: 1,
      confirm_sms: 1,
      reminder_sms: 1,
    };

    try {
      const response = await fetch('https://book-it-back.vercel.app/api/add_booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Booking confirmed:', data);
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  const Sum = (number) => {
    setSum(number);
  }

  const SumUpTime = (totalTime) => {
    setTotaltime(totalTime)
  }

  const PickTime = (pickedTime) => {
    setTime(prevTime => pickedTime)
  }

  const PickDate = (pickedDate) => {
    setDate(prevDate => pickedDate)
  }
 
  return (
    <div className="flex flex-col bg-white">
      <Header />
      <main className="flex flex-col px-10 mt-8 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 justify-between items-start max-md:flex-wrap max-md:max-w-full">
          <div>
            <ContactForm_logged setName={setName} setEmail={setEmail} setPhone={setPhone}/>
            Czas: {totalTime}     
          </div>
          <div>
            <div className="flex flex-col items-start mt-0 text-3xl font-semibold text-black max-md:max-w-full"> 
              <h3 className="ml-6 font-semibold mb-5 max-md:ml-2.5">Wybierz datę</h3> 
              <MyDatePicker PickDate={PickDate} />          
            </div> 
            <div className="mt-8">
                <TimePicker PickTime={PickTime} />
            </div>
            Czas: {time} <br />
            Data: {date.toDateString()}        
          </div>
          <Summary services={services} SumUpTime={SumUpTime} />
        </div>
        <div className="flex gap-5 mb-10 justify-between self-end mr-14 max-w-full text-2xl font-light text-center text-black whitespace-nowrap w-[414px] max-md:mt-10 max-md:mr-2.5">
          <Link to="/rezerwacja" 
            className="justify-center items-center px-7 py-1.5 bg-white border border-black border-solid rounded-[30px] max-md:px-5"> 
              Cofnij 
          </Link>
          <button 
            onClick={handleConfirm}
            className="justify-center px-7 py-1.5 bg-white border border-black border-solid rounded-[30px] max-md:px-5"> 
              Zatwierdź 
          </button>
        </div>
      </main>      
      <Footer />
    </div>
  );
}

export default Rezerwacja_logged;