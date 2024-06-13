import React, { useState, useEffect } from 'react';

const NewServicePicker = ({ companyId, onServiceSelect }) => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`https://bookit-back.vercel.app/api/services?company_id=${companyId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${data.error}`);
        }

        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [companyId]);

  const handleServiceToggle = (service) => {
    setSelectedServices((prevSelectedServices) => {
      const isSelected = prevSelectedServices.includes(service);
      const updatedSelectedServices = isSelected ? prevSelectedServices.filter(s => s !== service) : [...prevSelectedServices, service];

      // Notify parent component about the selected services
      onServiceSelect(updatedSelectedServices);

      return updatedSelectedServices;
    });
  };

  return (
    <div className="flex flex-col items-end gap-3">
      {services.map((service) => (
        <div key={service.name} className="mt-1 mb-1 bg-stone-200 flex justify-between items-center rounded-full p-2 w-auto">
          <div className="flex-grow text-left pl-4 mr-4">
            {service.name}
          </div>
          <div className="font-bold w-20 text-center">
            {service.cost}zł
          </div>
          <div className="w-48 text-center">
            czas wykonania: {service.time_minutes}min
          </div>
          <button
            className={`bg-white text-gray-500 font-bold rounded-full p-[3px] w-[34px] mr-4 ${selectedServices.includes(service) ? 'bg-white text-black' : 'bg-white text-gray-500'}`}
            onClick={() => handleServiceToggle(service)}
          >
            {selectedServices.includes(service) ? '✓' : '+'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default NewServicePicker;
