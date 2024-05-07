import React, { useState, useEffect } from 'react'
import './output.css'

function App() {

  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  const header = () =>( <div className="flex gap-5 justify-between px-5 py-1.5 w-full text-xs text-center text-black mix-blend-darken bg-stone-200 max-md:flex-wrap max-md:max-w-full">
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5de238929a006710f45648794a40a0622297cdbc516015bb550d2db71268e5c?apiKey=d10d36f0508e433185a32e898689ca50&"
      alt="Logo"
      className="shrink-0 max-w-full aspect-[4.17] w-[262px]" />
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

  const categories = () => (
    <div className="flex relative flex-col items-center self-stretch px-16 pb-2.5 mt-10 w-full text-center mix-blend-overlay bg-stone-200 max-md:px-5 max-md:max-w-full">
      <div className="flex z-10 gap-5 w-full max-w-[1075px] max-md:flex-wrap max-md:max-w-full">
       
      </div>
    </div>
  );

  const hero = () => (<div className="flex overflow-hidden relative flex-col items-center px-5 pt-8 pb-16 w-full text-xl text-black min-h-[391px] max-md:max-w-full">
  <img
    loading="lazy"
    src="https://cdn.builder.io/api/v1/image/assets/TEMP/10fbef2836b96a649d95600569a3c9f1049330147f43590e33d4d81ff4c7ccd4?apiKey=d10d36f0508e433185a32e898689ca50&"
    alt="Background"
    className="object-cover absolute inset-0 size-full"
  />
  <div className="relative text-5xl font-medium text-center max-md:max-w-full max-md:text-4xl">
    Zarezerwuj to co potrzebujesz
  </div>
  <div className="relative mt-3.5 text-2xl font-light text-center max-md:max-w-full">
    Odkrywaj najlepszych specjalistów wokół siebie, <br /> wszystko czego
    potrzebujesz w jednym miejscu
  </div>
  <form className="flex relative gap-5 px-3.5 py-1 mt-7 tracking-normal bg-white leading-[90%] rounded-[50px] text-stone-200 max-md:flex-wrap">
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/076444189e401938838e6a6b8094a3e4bcb51ab5cdafc308724bbfb8f96bb2a8?apiKey=d10d36f0508e433185a32e898689ca50&"
      alt="Search icon"
      className="shrink-0 aspect-square w-[45px]"
    />
    <label htmlFor="search" className="sr-only">
      Szukaj usług lub biznesów
    </label>
    <input
      type="text"
      id="search"
      placeholder="Szukaj usług lub biznesów"
      aria-label="Szukaj usług lub biznesów"
      className="flex-auto my-auto max-md:max-w-full"
    />
  </form>
</div>
);
  return (
    <>
      {header()}
      {hero()}
      {categories()}
    </>
  );
}

export default App;