import * as React from "react";
import MyDatePicker from "../components/MyDatePicker";
import TimePicker from "../components/TimePicker";
import { Link } from "react-router-dom";

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

function ContactForm() { 
    return ( 
    <section className="flex flex-col self-stretch font-light max-md:max-w-full"> 
        <h2 className="text-3xl font-semibold text-neutral-900 max-md:max-w-full"> Dane kontaktowe </h2> 
        <div className="flex flex-col mt-4 max-md:mt-10 max-md:max-w-full"> 
            <label htmlFor="name" className="text-lg leading-6 text-zinc-800 max-md:max-w-full"> Imię </label> 
            <input 
                type="text" id="name" placeholder="Wprowadź swoje imię" aria-label="Wprowadź swoje imię" 
                className="justify-center items-start px-5 py-3 mt-3 text-sm bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full" 
            /> 
        </div> 
        <div className="flex flex-col mt-8 max-md:mt-10 max-md:max-w-full">
            <label htmlFor="email" className="text-lg leading-6 text-zinc-800 max-md:max-w-full"> Email </label> 
            <input 
                type="email" id="email" placeholder="Wprowadź swój email" aria-label="Wprowadź swój email" 
                className="justify-center items-start px-5 py-3 mt-3 text-sm bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full" 
            /> 
        </div> 
        <div className="flex flex-col mt-8 max-md:mt-10 max-md:max-w-full"> 
            <label htmlFor="phone" className="text-lg leading-6 text-zinc-800 max-md:max-w-full"> Numer telefonu </label> 
            <input 
                type="tel" id="phone" placeholder="Wprowadź swój numer telefonu" aria-label="Wprowadź swój numer telefonu" 
                className="justify-center items-start px-5 py-3 mt-3 text-sm bg-white rounded-xl border border-solid border-zinc-400 text-zinc-400 max-md:pr-5 max-md:max-w-full" 
            /> 
        </div> 
    </section> 
    );
} 


{/* zmienic na prawdziwy kalendarz */}
function DatePickerz() { 
    const days = Array.from({ length: 31 }, (_, i) => i + 1); 
    return ( 
        <div className="flex flex-col items-start mt-0 text-3xl font-semibold text-black max-md:max-w-full"> 
            <h3 className="ml-6 mb-5 max-md:ml-2.5">Wybierz datę</h3> 
            <MyDatePicker />
            <div className="mt-4 text-xl">
                <TimePicker />
            </div>
        </div> 
    );
} 

function Summary() { 
    return ( 
    <section className="flex flex-col mt-0 text-black"> 
        <h2 className="self-end mr-11 text-3xl font-semibold text-right max-md:mr-2.5"> Podsumowanie </h2> 
        <div className="flex gap-5 justify-between mt-20 max-md:mt-10"> 
            <div className="flex flex-col self-start mt-1.5 text-xl text-right"> 
                <div className="self-end">Haircut - Top Stylist</div> 
                <div className="mt-6">Haircut - Premier Stylist</div> 
            </div> 
            <div className="flex flex-col text-3xl font-semibold"> 
                <div> 
                    <span className="font-medium">79.</span> 
                    <span className="text-xl font-medium">99zł</span> 
                </div> 
                <div className="mt-6"> 
                    <span className="font-medium">99.</span> 
                    <span className="text-xl font-medium">99zł</span> 
                </div> 
            </div> 
        </div> 
        <div className="shrink-0 mt-9 h-0.5 border border-solid bg-stone-300 bg-opacity-70 border-stone-300 border-opacity-70" /> 
        <div className="flex gap-5 justify-between self-end mt-3.5 text-right"> 
            <div className="my-auto text-xl font-bold">Suma:</div> 
            <div className="text-3xl font-semibold"> 
                <span className="font-medium">179.</span> 
                <span className="text-xl font-medium">98zł</span> 
            </div> 
        </div> 
    </section> 
    );
} 
  
  const Footer = () => {
    return (
      <footer className="flex flex-col items-start px-10 pt-5 pb-3.5 mt-8 w-full text-white bg-black max-md:px-5 max-md:max-w-full">
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
  
  const Rezerwacja2 = () => {
    return (
      <div className="flex flex-col bg-white">
        <Header />
        <main className="flex flex-col px-12 mt-8 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 justify-between items-start max-md:flex-wrap max-md:max-w-full">
            <ContactForm />
            <DatePickerz />
            <Summary />
          </div>
          <div className="flex gap-5 justify-between self-end mt-16 mr-14 max-w-full text-2xl font-light text-center text-black whitespace-nowrap w-[414px] max-md:mt-10 max-md:mr-2.5">
            <Link to="/rezerwacja" className="justify-center items-center px-7 py-1.5 bg-white border border-black border-solid rounded-[30px] max-md:px-5"> Cofnij </Link>
            <Link to="/ " className="justify-center px-7 py-1.5 bg-white border border-black border-solid rounded-[30px] max-md:px-5"> Zatwierdź </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  export default Rezerwacja2;