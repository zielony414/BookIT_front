import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MyDatePicker from "../components/MyDatePicker";
import TimePicker from "../components/TimePicker";
import UserDataForm from "../components/UserDataForm";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

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

function ContactForm_logged({userId, getUserInfo, setContact, setOtherUserData}) {
  //do tej funkcji argument musi być przekazywany przez funkcję pobierająca id aktualnego usera

  const handleContactChange = (event) => {
    setContact(parseInt(event.target.value)); // Konwertowanie wartości na liczbę całkowitą
  };

  return (
    <section className="flex flex-col self-stretch font-light max-md:max-w-full">
      <div className="flex items-start max-md:flex-wrap">
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              <div className="text-3xl font-semibold text-black">Dane kontaktowe</div>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={1}
              onChange={handleContactChange}
              name="radio-buttons-group"
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                },
              }}
            >
              <FormControlLabel 
                value={1}                 
                control={<Radio />}  
                label="Użyj swoich danych:" 
                sx={{
                  '& .MuiFormControlLabel-label': {
                  fontSize: '1.3rem', 
                  },
                }}/>
              <UserDataForm userId={userId} getUserInfo={getUserInfo} />
              <FormControlLabel 
                value={0} 
                control={<Radio />} 
                label="Inne dane kontaktowe:" 
                sx={{
                  '& .MuiFormControlLabel-label': {
                  fontSize: '1.3rem', 
                  },
                }}/>              
            </RadioGroup>
          </FormControl>
      </div>    

      <div className="flex flex-col mt-5 max-md:mt-10 max-md:max-w-[sm]"> 
        <label htmlFor="email" className="text-lg leading-6 text-zinc-800 max-md:max-w-full"> Email </label>
        <input
          type="email" id="email" placeholder="Wprowadź swój email" aria-label="Wprowadź swój email"
          className="justify-center items-start px-5 py-3 mt-3 text-sm bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full"
        />
      </div>
      <div className="flex flex-col mt-8 max-md:mt-10 max-md:max-w-[sm]"> 
        <label htmlFor="phone" className="text-lg leading-6 text-zinc-800 max-md:max-w-full"> Numer telefonu </label>
        <input
          type="tel" id="phone" placeholder="Wprowadź swój numer telefonu" aria-label="Wprowadź swój numer telefonu"
          className="justify-center items-start px-5 py-3 mt-3 text-sm bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full"
        />
      </div>


    </section>
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

function Summary(props) {
  // Obliczanie sumy cen usług i czasu wykonania
  const totalSum = props.services.reduce((sum, service) => sum + service.cost, 0);
  const totalTime = props.services.reduce((totalTime, service) => totalTime + service.time_minutes, 0);

  useEffect(() => {
      props.SumUpTime(totalTime);
      props.SumUpCost(totalSum);
    }, [totalTime, totalSum, props]);

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
  const { services } = location.state || { services: [] };
  const { companyId} = location.state || {companyId: 1};
  const [userId] = useState(4);
  const [userData, setUserData] = useState(null);
  const [otherUserData, setOtherUserData] = useState(null)
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [totalTime, setTotalTime] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [isFree, setIsFree] = useState(3);
  const [contact, setContact] = useState(1)

  const handleConfirmAddBooking = async () => {
    for (const service of services) {
      const localBookingDateTime = new Date(date);
      const [hours, minutes] = time.split(':');
      localBookingDateTime.setHours(hours);
      localBookingDateTime.setMinutes(minutes);
      localBookingDateTime.setSeconds('00');
  
      const year = localBookingDateTime.getFullYear();
      const month = String(localBookingDateTime.getMonth() + 1).padStart(2, '0');
      const day = String(localBookingDateTime.getDate()).padStart(2, '0');
      const hour = String(localBookingDateTime.getHours()).padStart(2, '0');
      const minute = String(localBookingDateTime.getMinutes()).padStart(2, '0');
      const second = String(localBookingDateTime.getSeconds()).padStart(2, '0');
  
      const bookingDateTimeString = `${year}-${month}-${day} ${hour}:${minute}:${second}`;  
      
      
      const bookingData = {
        company_id: companyId,
        user_id: userId,
        service_id: service.id,
        booking_datetime: bookingDateTimeString,
        booking_date: date.toISOString().split('T')[0],
        time: time,
        totalTime: totalTime,
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
    }
  };

  const handleConfirmDaySchedule = async () => {
    //ta funkcja ogarnia UTC (strefy czasowe) zeby sie data nie cofnela do tylu przypadkiem
    const getLocalDateString = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    const bookingData = {
      company_id: companyId,
      service_ids: services.map(service => service.id),
      date: getLocalDateString(date),
      time: time,
      totalTime: totalTime,
      email: userData.email,
      total_cost: totalCost,
    };

    console.log("DATA DEBUG: ", bookingData.date)

    try {
      const response = await fetch('https://book-it-back.vercel.app/api/add_to_day_schedule', {
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
      setIsFree(data.is_free)

      console.log('Day schedule updated:', data.message, " and ", data.is_free );
    } catch (error) {
      console.error('Error updating day schedule:', error);
    }
  };

  const handleConfirm = async () => {
    {/*await handleConfirmAddBooking();*/}
    await handleConfirmDaySchedule();
  };

  const setText = (state) => {
    if (state==3) {
      return (
        <div>
          Wybierz datę i godzinę zanim potwierdzisz
        </div>
      )
    }
    if (state==1) {
      return (
        <div>
          Usługa została potwierdzona, proszę sprawdzić pocztę.
        </div>
      )
    }
    if (state==0) {
      return (
        <div>
          Wybrana data jest niedostępna. Spróbuj wybrać inną datę.
        </div>
      )
    }
  }

  const Sum = (number) => {
    setTotalTime(number);
  };

  const SumTotalCost = (number) => {
    setTotalCost(number)
  }

  const PickTime = (pickedTime) => {
    setTime(pickedTime);
  };

  const PickDate = (pickedDate) => {
    setDate(pickedDate);
  };

  const getUserInfo = (info) => {
    setUserData(info);
  };  

  return (
    <div className="flex flex-col bg-white">
      <Header />
      <main className="flex flex-col px-10 mt-8 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 justify-between items-start max-md:flex-wrap max-md:max-w-full">
          <ContactForm_logged userId={userId} getUserInfo={getUserInfo} setContact={setContact} setOtherUserData={setOtherUserData} />
          <div>
            <div className="flex flex-col items-start mt-0 text-3xl font-semibold text-black max-md:max-w-full">
              <h3 className="ml-6 font-semibold mb-5 max-md:ml-2.5">Wybierz datę</h3>
              <MyDatePicker PickDate={PickDate} />              
            </div>
            <div className="mt-8">
              <TimePicker PickTime={PickTime} />
            </div>
          </div>
          <Summary services={services} SumUpTime={Sum} SumUpCost={SumTotalCost} />          
        </div>
        <div className="flex flex-col text-right">
          <div className="flex gap-5 mb-5 justify-between self-end mr-14 max-w-full text-2xl font-light text-center text-black whitespace-nowrap w-[414px] max-md:mt-10 max-md:mr-2.5">                              
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
          <div className="mr-[60px]">
            {setText(isFree)}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Rezerwacja_logged;