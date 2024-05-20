// JavaScript source code

import "../output.css";
import { Link } from "react-router-dom";

import React from "react";

function Header() { return ( 
    <header className="flex gap-5 justify-between px-7 py-2 w-full text-xs text-center text-black mix-blend-darken bg-stone-200 max-md:flex-wrap max-md:px-5 max-md:max-w-full"> 
        <img 
            loading="lazy" 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1881cefb472dc9fb0438a60e74e4b960e1e91330c8b9f5af952e28bc8f48cf9?apiKey=88baf2bf66c748bd80f6f382a2c28dd5&" 
            alt="Company logo" 
            className="shrink-0 max-w-full aspect-[4.35] w-[230px]" 
        /> 
        <div className="flex gap-4 items-start my-auto"> 
            <Link to="/rezerwacja-logged" className="justify-center px-7 py-1.5 bg-white rounded-md border-b border-black border-solid max-md:px-5"> Zaloguj się/załóż konto </Link> 
            <button className="justify-center px-6 py-1.5 bg-white rounded-md border-b border-black border-solid max-md:px-5"> Dodaj swoją firmę </button> 
        </div>
    </header> 
);
} 

const ServiceItem = ({ service, price, isSelected }) => {
    return (
        <div className="flex gap-2 justify-between mt-4 max-w-full w-[533px] max-md:flex-wrap max-md:mt-5">
            <div className="flex gap-2 max-md:flex-wrap max-md:max-w-full">
                <div className="justify-center items-start px-2 py-2 whitespace-nowrap rounded-lg bg-stone-200 max-md:pr-2">
                    {isSelected ? "✓" : "+"}
                </div>
                <div className="flex-auto my-auto text-xl">{service}</div>
            </div>
            <div className="pr-26 my-auto mr-26 text-right">
                {price}.<span className="text-xl">99</span><span className="text-sm"> zł</span>
            </div>
        </div>
    );
};


const Footer = () => {
    return (
      <footer className="flex flex-col items-start px-10 pt-5 pb-3.5 mt-16 w-full text-white bg-black max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between text-base">
          <div className="flex gap-5 justify-between">
            <a href="#" className="justify-center">O nas</a>
            <a href="#" className="justify-center whitespace-nowrap">Kontakt</a>
          </div>
          <a href="#" className="justify-center whitespace-nowrap">FAQ</a>
        </div>
        <div className="shrink-0 self-stretch mt-2 bg-white border border-white border-solid h-[5px] max-md:max-w-full" />
        <div className="justify-center mt-4 text-xs font-light"> © 2024 PRZ All Rights Reserved{" "} </div>
      </footer>
    );
  }

  const Rezerwacja = () => {
    const services = [
        { name: "Strzyżenie - Top Stylist", price: "79", isSelected: true },
        { name: "Strzyżenie - Premier Stylist", price: "99", isSelected: false },
        { name: "Strzyżenie - Normal", price: "39", isSelected: false },
    ];

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <Header />
            <div className="flex flex-col items-center px-20 mt-8 w-full text-3xl font-semibold text-black max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <div className="">
                    <h1 className="self-stretch text-neutral-900 max-md:mr-1 max-md:max-w-full">
                        <Link to="../testing-stuff">Wybierz usługę</Link>
                    </h1>
                    {services.map((service) => (
                        <ServiceItem
                            key={service.name}
                            service={service.name}
                            price={service.price}
                            isSelected={service.isSelected}
                        />
                    ))}
                    <div className="flex gap-5 mt-8 max-w-full w-[248px] max-md:mt-10 max-md:ml-1.5">
                        <div className="justify-center items-start px-4 py-5 whitespace-nowrap rounded-3xl bg-stone-200 max-md:pr-5">
                            +
                        </div>
                        <div className="flex-auto my-auto">Dodaj usługę</div>
                    </div>
                </div>
            </div>
            <div className="flex gap-5 justify-between mt-10 max-w-full text-2xl font-light text-center whitespace-nowrap w-[414px] max-md:mt-10 max-md:mr-1">
                <Link to="/ " className="px-7 py-1.5 bg-white border border-black border-solid rounded-[30px] max-md:px-5">
                    Cofnij
                </Link>
                <Link to="/rezerwacja2" className="px-7 py-1.5 bg-white border border-black border-solid rounded-[30px] max-md:px-5">
                    Dalej
                </Link>
            </div>
            <Footer />
        </div>
    );
};

export default Rezerwacja;

