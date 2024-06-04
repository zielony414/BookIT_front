import * as React from "react";

function SocialMediaLink({ url, platform, altText }) {
  return (
    <div className="flex gap-2.5 mt-5">
      <img
        loading="lazy"
        src={url}
        alt={altText}
        className="shrink-0 w-10 aspect-square"
      />
      <div className="flex-auto my-auto">{platform}</div>
    </div>
  );
}

function ServiceItem({ serviceName, price, serviceTime }) {
  return (
    <div className="flex gap-5 items-center py-1 pr-1.5 pl-3.5 mt-2 w-full rounded-3xl bg-stone-200 max-md:flex-wrap max-md:max-w-full">
      <div className="flex-auto self-stretch my-auto text-xl text-right">
        {serviceName}
      </div>
      <div className="self-stretch my-auto text-3xl font-semibold">
        <span className="font-medium">{price.split(".")[0]}.</span>
        <span className="text-xl font-medium">{price.split(".")[1]}</span>
        <span className="font-medium">*</span>
      </div>
      <div className="flex gap-5 self-stretch">
        <div className="flex-auto my-auto text-xl text-right">
          Czas usługi: {serviceTime}
        </div>
        <div className="justify-center items-center px-3 w-10 h-10 text-4xl font-extralight text-center whitespace-nowrap bg-white rounded-full shadow-sm">
          +
        </div>
      </div>
    </div>
  );
}

function MyComponent() {
  const socialMediaData = [
    { url: "https://cdn.builder.io/api/v1/image/assets/TEMP/a29484ee2bfa9fa553e53828e419621cd30545b7d30b0bbdf2b6d98b325d584c?apiKey=d10d36f0508e433185a32e898689ca50&", platform: "mrdoppler.pl", altText: "Website" },
    { url: "https://cdn.builder.io/api/v1/image/assets/TEMP/3f61d1ecefcf1626754503a46a82047d1290d86e3868395a6184fadb004cbe0a?apiKey=d10d36f0508e433185a32e898689ca50&", platform: "/mister_doppler", altText: "Facebook" },
    { url: "https://cdn.builder.io/api/v1/image/assets/TEMP/a8df4e89ff886f8f3b169db09c7371f3152dc114b3e9d168b35a04fcda517dc4?apiKey=d10d36f0508e433185a32e898689ca50&", platform: "/in/misterdoppler", altText: "LinkedIn" },
    { url: "https://cdn.builder.io/api/v1/image/assets/TEMP/c863b5fa7baa0dab9bbcd2ec292794c8c4a25bec8afcc63e440d70dc15024a00?apiKey=d10d36f0508e433185a32e898689ca50&", platform: "/mr_doppler", altText: "Instagram" },
    { url: "https://cdn.builder.io/api/v1/image/assets/TEMP/28b0c9d290d499b97f2e895bbb54b3dcdfac9e5bdb80ec0dba14d3b9df1917f6?apiKey=d10d36f0508e433185a32e898689ca50&", platform: "/mr_doppler", altText: "Twitter" },
    { url: "https://cdn.builder.io/api/v1/image/assets/TEMP/a423b996c3a576e765ef76805827b651a39c2fbe713333bb2b2ba3d020908b21?apiKey=d10d36f0508e433185a32e898689ca50&", platform: "/mr_doppler", altText: "YouTube" },
    { url: "https://cdn.builder.io/api/v1/image/assets/TEMP/ac0ad10c5866d7b3ba125ce6ed1c98475328812161faf2c5d83b31e8f940126e?apiKey=d10d36f0508e433185a32e898689ca50&", platform: "/mr_doppler", altText: "Pinterest" },
  ];

  const servicesData = [
    { serviceName: "Strzyżenie brody", price: "40.00", serviceTime: "20 min" },
    { serviceName: "Strzyżenie męskie", price: "60.00", serviceTime: "45 min" },
    { serviceName: "Stylizacja włosów i brody", price: "25.00", serviceTime: "15 min" },
  ];

  return (
    <div className="flex flex-col bg-white">
      <div className="flex gap-5 justify-between py-3 pr-16 pl-6 w-full mix-blend-darken bg-stone-200 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 text-xl tracking-normal leading-5 text-stone-200 max-md:flex-wrap max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/57979c604e163f9651267074746ac10da0b6cc1fc2881f563528b9f2623d807a?apiKey=d10d36f0508e433185a32e898689ca50&"
            alt="Logo"
            className="shrink-0 aspect-[4] basis-0 grow-0 w-fit"
          />
          <div className="flex flex-auto gap-5 self-start px-3.5 py-1 mt-4 bg-white rounded-[50px] max-md:flex-wrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a376cc7832fed1c23014fb9f867bba7da6cbeb6c82d0cad6381eb3d9bb730d6?apiKey=d10d36f0508e433185a32e898689ca50&"
              alt="Search Icon"
              className="shrink-0 aspect-[0.95] w-[43px]"
            />
            <div className="flex-auto my-auto max-md:max-w-full">
              Szukaj usług lub biznesów
            </div>
          </div>
        </div>
        <div className="justify-center px-4 py-1.5 my-auto text-xs text-center text-black bg-white rounded-md border-b border-black border-solid">
          Zalogowany użytkownik
        </div>
      </div>
      <div className="justify-center items-center px-7 py-1.5 mt-11 ml-28 max-w-full text-xl font-light text-center text-black bg-white border border-black border-solid shadow-sm rounded-[30px] w-[229px] max-md:px-5 max-md:mt-10 max-md:ml-2.5">
        Wróć
      </div>
      <div className="px-20 mt-6 w-full bg-stone-200 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[41%] max-md:ml-0 max-md:w-full">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b17665d36b8fab533b946b2472da719128e4dec638c85eb69b51e96c3e3cdc58?apiKey=d10d36f0508e433185a32e898689ca50&"
                    alt="Profile Picture"
                    className="grow w-full shadow-sm aspect-[1.08] max-md:mt-9"
                  />
                </div>
                <div className="flex flex-col ml-5 w-[59%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col self-stretch my-auto text-2xl text-black max-md:mt-10">
                    <div className="text-5xl font-medium max-md:text-4xl">
                      Mister Dappler
                    </div>
                    <div className="mt-2.5">Rzeszów, ul. Staroniwska 41A</div>
                    <div className="mt-6">tel. 529 285 952</div>
                    <div className="flex gap-3.5 mt-8 text-xl font-light">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9dff8c69447b2449452fd2a05979a57808a0aff7656e6036b6224d1158fcb7a?apiKey=d10d36f0508e433185a32e898689ca50&"
                        alt="Rating"
                        className="aspect-[5.56] w-[229px]"
                      />
                      <div className="my-auto">345 opinii</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex grow gap-5 items-center max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/46f35761b4ab43fe0cd6819c7253ec2fc017fcd5bcb5d9169bf1d4edc80b25ca?apiKey=d10d36f0508e433185a32e898689ca50&"
                alt="Icon 1"
                className="shrink-0 self-stretch my-auto w-10 aspect-square"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/680537ec8ccc8a4353186a959eab1ef95fef5b649f7719c011f124817ffaee4a?apiKey=d10d36f0508e433185a32e898689ca50&"
                alt="Banner"
                className="self-stretch w-full aspect-[1.82] max-md:max-w-full"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/97b4fb2ba1237956974d1119188a8585fa741786490442361dcf10a4431bcc41?apiKey=d10d36f0508e433185a32e898689ca50&"
                alt="Icon 2"
                className="shrink-0 self-stretch my-auto w-10 aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="self-center mt-9 w-full max-w-[1254px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col px-5 pt-2 pb-4 w-full rounded-3xl bg-stone-200 max-md:mt-10">
              <div className="text-2xl font-medium leading-6 text-center text-black">
                Znajdź nas na naszych social mediach!
              </div>
              <div className="flex flex-col pr-5 pl-1.5 mt-5 text-xl leading-6 whitespace-nowrap text-zinc-800">
                {socialMediaData.map((data, index) => (
                  <SocialMediaLink
                    key={index}
                    url={data.url}
                    platform={data.platform}
                    altText={data.altText}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-9/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow mt-56 text-black max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-col ml-16 max-w-full w-[613px]">
                {servicesData.map((service, index) => (
                  <ServiceItem
                    key={index}
                    serviceName={service.serviceName}
                    price={service.price}
                    serviceTime={service.serviceTime}
                  />
                ))}
                <div className="flex gap-5 self-end px-5 mt-28 max-w-full text-xl w-[607px] max-md:flex-wrap max-md:mt-10">
                  <div className="flex-auto my-auto text-right">
                    *Cena usługi jest przybliżona
                  </div>
                  <div className="grow justify-center px-2.5 py-1.5 font-light text-center bg-white border border-black border-solid shadow-sm rounded-[30px] w-fit">
                    Przejdź do podsumowania
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-8 pt-5 pb-3.5 mt-14 w-full text-white bg-black max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 justify-between self-start text-base">
          <div>O nas</div>
          <div>Kontakt</div>
          <div>FAQ</div>
        </div>
        <div className="shrink-0 mt-2 bg-white border border-white border-solid h-[5px] max-md:max-w-full" />
        <div className="mt-4 text-xs font-light max-md:max-w-full">
          © 2024 PRZ All Rights Reserved
        </div>
      </div>
    </div>
  );
}

export default MyComponent;