import React, { useState, useEffect } from 'react';
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import './styles.css';

const ServicePicker = ({ companyId, onSelectService }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`https://book-it-back.vercel.app/api/services?company_id=${companyId}`);
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

  return (
    <div className="w-[542px] text-xl">
      <DropdownList
        placeholder="Usługa"
        data={services}
        textField="name"
        valueField="name"
        onChange={service => onSelectService(service)}
      />
    </div>
  );
};

export default ServicePicker;
