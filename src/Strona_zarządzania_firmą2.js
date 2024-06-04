import React, { useState, useEffect } from "react";
import "./Strona_zarządzania_firmą.css";
import Calendar from 'react-calendar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Strona_zarządzania_firmą2() {
  const [hours, setHours] = useState({
    monday_start: '',
    monday_end: '',
    tuesday_start: '',
    tuesday_end: '',
    wensday_start: '',
    wensday_end: '',
    thursday_start: '',
    thursday_end: '',
    friday_start: '',
    friday_end: '',
    saturday_start: '',
    saturday_end: '',
    sunday_start: '',
    sunday_end: ''
  });
  const [checkboxes, setCheckboxes] = useState({
    monday: false,
    tuesday: false,
    wensday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  });
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [newDate, setNewDate] = useState(new Date());
  const [newTime, setNewTime] = useState('12:00');
  const company_id = 3;
  const navigate = useNavigate();

  const fetchCompanyHours = async () => {
    try {
      const response = await axios.post('https://book-it-back.vercel.app/api/Strona_zarządzania_firmą2', { company_id });
      setHours(response.data);
      updateCheckboxes(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error connecting to the server');
    }
  };

  const fetchReservations = async (date) => {
    try {
      const response = await axios.post('https://book-it-back.vercel.app/api/Strona_zarządzania_firmą/reservations', { company_id, date });
      setReservations(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error fetching reservations');
      setReservations([]);
    }
  };

  const handleDateChange = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    console.log('Fetching reservations for:', formattedDate);
    fetchReservations(formattedDate);
  };

  const updateCheckboxes = (hours) => {
    setCheckboxes({
      monday: hours.monday_start !== hours.monday_end,
      tuesday: hours.tuesday_start !== hours.tuesday_end,
      wensday: hours.wensday_start !== hours.wensday_end,
      thursday: hours.thursday_start !== hours.thursday_end,
      friday: hours.friday_start !== hours.friday_end,
      saturday: hours.saturday_start !== hours.saturday_end,
      sunday: hours.sunday_start !== hours.sunday_end
    });
  };

  useEffect(() => {
    fetchCompanyHours();
  }, []);

  const handleHourChange = (day, type, value) => {
    setHours(prevHours => ({
      ...prevHours,
      [`${day}_${type}`]: value
    }));
  };

  const saveHours = async () => {
    try {
      console.log('Saving hours:', hours);
      await axios.post('https://book-it-back.vercel.app/api/update_company_hours', { company_id, hours });
      alert('Godziny pracy zostały zapisane');
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error saving hours');
    }
  };

  const handleCheckboxChange = (day) => {
    setCheckboxes(prevCheckboxes => {
      const newCheckboxes = { ...prevCheckboxes, [day]: !prevCheckboxes[day] };
      if (!newCheckboxes[day]) {
        setHours(prevHours => ({
          ...prevHours,
          [`${day}_start`]: '00:00',
          [`${day}_end`]: '00:00'
        }));
      }
      return newCheckboxes;
    });
  };

  const handleReservationClick = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveClick = async () => {
    try {
      const updatedReservation = {
        ...selectedReservation,
        booking_time: `${newDate.toISOString().split('T')[0]} ${newTime}`,
      };
      await axios.post('https://book-it-back.vercel.app/api/update_reservation', { reservation: updatedReservation});
      alert('Rezerwacja została zmieniona');
      setIsModalOpen(false);
      fetchReservations(newDate);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error updating reservation');
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete('https://book-it-back.vercel.app/api/delete_reservation', { data: { id_rezerwacji: selectedReservation.id_rezerwacji } });
      alert('Rezerwacja została usunięta');
      setSelectedReservation(null);
      fetchReservations(newDate);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error deleting reservation');
    }
  };


  const Header = () => (
    <header className="flex gap-5 justify-between px-7 py-2 w-full text-xs text-center text-black mix-blend-darken bg-stone-200 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <img
        loading="lazy"
        src="bookit-logo.png"
        alt="Logo"
        className="shrink-0 h-16 w-auto" 
        role = "button"
        onClick={() => navigate('/')}
      />
    </header>
  );

  const Body = () => (
    <div>
      <div id="calosc">
        <div id="kalendarz">
          <Calendar onClickDay={handleDateChange} />
          <div id="godzina_wpisania">
            <div className="godziny_do_wpisania_checkbox">
              <input type="checkbox" className="dni" id="myCheckbox_poniedziałek" checked={checkboxes.monday} onChange={() => handleCheckboxChange('monday')} />
              <input type="checkbox" className="dni" id="myCheckbox_wtorek" checked={checkboxes.tuesday} onChange={() => handleCheckboxChange('tuesday')} />
              <input type="checkbox" className="dni" id="myCheckbox_środa" checked={checkboxes.wensday} onChange={() => handleCheckboxChange('wensday')} />
              <input type="checkbox" className="dni" id="myCheckbox_czwartek" checked={checkboxes.thursday} onChange={() => handleCheckboxChange('thursday')} />
              <input type="checkbox" className="dni" id="myCheckbox_piątek" checked={checkboxes.friday} onChange={() => handleCheckboxChange('friday')} />
              <input type="checkbox" className="dni" id="myCheckbox_sobota" checked={checkboxes.saturday} onChange={() => handleCheckboxChange('saturday')} />
              <input type="checkbox" className="dni" id="myCheckbox_niedziela" checked={checkboxes.sunday} onChange={() => handleCheckboxChange('sunday')} />
            </div>
            <div className="godziny_do_wpisania_text">
              <label className="dni" htmlFor="myCheckbox_poniedziałek"> Poniedziałek</label>
              <label className="dni" htmlFor="myCheckbox_wtorek"> Wtorek</label>
              <label className="dni" htmlFor="myCheckbox_środa"> Środa</label>
              <label className="dni" htmlFor="myCheckbox_czwartek"> Czwartek</label>
              <label className="dni" htmlFor="myCheckbox_piątek"> Piątek</label>
              <label className="dni" htmlFor="myCheckbox_sobota"> Sobota</label>
              <label className="dni" htmlFor="myCheckbox_niedziela"> Niedziela</label>
            </div>
            <div>
              <div className="checkbox-container">
                <input type="time" className="godziny" value={hours.monday_start} onChange={(e) => handleHourChange('monday', 'start', e.target.value)} />
                <p>-</p>
                <input type="time" className="godziny" value={hours.monday_end} onChange={(e) => handleHourChange('monday', 'end', e.target.value)} />
              </div>
              <div className="checkbox-container">
                <input type="time" className="godziny" value={hours.tuesday_start} onChange={(e) => handleHourChange('tuesday', 'start', e.target.value)} />
                <p>-</p>
                <input type="time" className="godziny" value={hours.tuesday_end} onChange={(e) => handleHourChange('tuesday', 'end', e.target.value)} />
              </div>
              <div className="checkbox-container">
                <input type="time" className="godziny" value={hours.wensday_start} onChange={(e) => handleHourChange('wensday', 'start', e.target.value)} />
                <p>-</p>
                <input type="time" className="godziny" value={hours.wensday_end} onChange={(e) => handleHourChange('wensday', 'end', e.target.value)} />
              </div>
              <div className="checkbox-container">
                <input type="time" className="godziny" value={hours.thursday_start} onChange={(e) => handleHourChange('thursday', 'start', e.target.value)} />
                <p>-</p>
                <input type="time" className="godziny" value={hours.thursday_end} onChange={(e) => handleHourChange('thursday', 'end', e.target.value)} />
              </div>
              <div className="checkbox-container">
                <input type="time" className="godziny" value={hours.friday_start} onChange={(e) => handleHourChange('friday', 'start', e.target.value)} />
                <p>-</p>
                <input type="time" className="godziny" value={hours.friday_end} onChange={(e) => handleHourChange('friday', 'end', e.target.value)} />
              </div>
              <div className="checkbox-container">
                <input type="time" className="godziny" value={hours.saturday_start} onChange={(e) => handleHourChange('saturday', 'start', e.target.value)} />
                <p>-</p>
                <input type="time" className="godziny" value={hours.saturday_end} onChange={(e) => handleHourChange('saturday', 'end', e.target.value)} />
              </div>
              <div className="checkbox-container">
                <input type="time" className="godziny" value={hours.sunday_start} onChange={(e) => handleHourChange('sunday', 'start', e.target.value)} />
                <p>-</p>
                <input type="time" className="godziny" value={hours.sunday_end} onChange={(e) => handleHourChange('sunday', 'end', e.target.value)} />
              </div>
            </div>
          </div>
          <div id="przyciski">

            <button type="button" className="zapis" onClick={saveHours}>ZAPISZ</button>
            <button type="button" className="zapis" onClick={() => navigate('/zarzadzaj_firma')}>COFNIJ</button>
          </div>
        </div>

        <div id="uslugi6">
          <div id="uslugi2">
            <div id="usługi3">
              {reservations.length > 0 ? reservations.map((res, index) => (
                <button
                  key={index}
                  className={`uslugi42 ${selectedReservation === res ? 'selected' : ''}`}
                  onClick={() => handleReservationClick(res)}
                >
                  <p className="uslugi_napisy">{res.category} {res.booking_time}</p>
                  <p className="uslugi_napisy">{res.service_name}</p>
                  <p className="uslugi_napisy">Czas trwania: {res.execution_time}</p>
                </button>
              )) : (
                <p className="uslugi4">Brak rezerwacji</p>
              )}
            </div>
          </div>
        </div>

        {selectedReservation && (
          <div id="szczegoly">
            <div id="back">
              <div id="gora_szczegol">
                <a id="godzina">{selectedReservation.booking_time}</a>
              </div>
              <p className="napis_tytul">Email:</p>
              <p className="napis_reszta">{selectedReservation.email}</p>
              <p className="napis_tytul">Numer tel:</p>
              <p className="napis_reszta">{selectedReservation.sms}</p>
              <p className="napis_tytul">Rodzaj usługi:</p>
              <p className="napis_reszta">{selectedReservation.service_name}</p>
              <p className="napis_tytul">Opis usługi:</p>
              <p className="napis_reszta">{selectedReservation.opis}</p>
              <div id="przyciski_szczegoly">
                <button type="button" className="przycisk_szczegol" onClick={handleEditClick}>Zmień termin</button>
                <button type="button" className="przycisk_szczegol" onClick={handleDeleteClick}>Anuluj rezerwację</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h2>Zmień termin rezerwacji</h2>
            <div>
              <label>Nowa data:    </label>
              <input type="date" value={newDate.toISOString().split('T')[0]} onChange={(e) => setNewDate(new Date(e.target.value))} />
            </div>
            <div>
              <label>Nowa godzina:    </label>
              <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} />
            </div>
            <button type="button" onClick={handleSaveClick} id="zmiana_terminu">Zapisz zmiany</button>
          </div>
        </div>
      )}
    </div>
  );

  const Footer = () => (
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

  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

export default Strona_zarządzania_firmą2;