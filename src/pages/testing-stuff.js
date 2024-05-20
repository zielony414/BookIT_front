import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import TimePicker from "../components/TimePicker";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const ServicesList = ({ companyId }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch(`http://localhost:5000/api/services/${companyId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setServices(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching services:', error);
          setError(error);
          setLoading(false);
        });
    }, [companyId]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  
    return (
      <div>
        <h1>Usługi firmy o ID: {companyId}</h1>
        <ul>
          {services.map((service, index) => (
            <li key={index}>{service.service_name}</li>
          ))}
        </ul>
      </div>
    );
  };

const FetchServices = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('/api/services')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Uhhh' + res.statusText);

                }
                return res.json(); 
            })

            .then((data) => {
                setServices(data);
            })

            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []);

    return (
        <div>
            <h1>Here should be navigation items:</h1>
            <ul>
                {services.map((item, index) => (
                    <li key={index}>{item.service_name}</li>
                ))}
            </ul>
        </div>
    );
};


const Testing = () => {
    return (
        
            <div>
                <TimePicker /> 
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <FetchServices />
                <Link to="/rezerwacja">Powrot</Link>
            </div>   
            
    )
}

export default Testing;