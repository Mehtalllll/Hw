import { useQuery } from '@tanstack/react-query';

import { FetchOpencageDataReq } from './Api/OpencageData.api';
import { ClassNames } from './utils/Classnamess';
import SearchInput from './components/SearchInput';
import React from 'react';
import { usedebounce } from './Hook/debounce';
import { FetchOpenweathermap } from './Api/openweatherma.api';
import MyMap from './components/Map';

function App() {
  const [search, setsearch] = React.useState<string>();
  const [lat, setlat] = React.useState<number>();
  const [lon, setlon] = React.useState<number>();
  const debouncedSearch = usedebounce(`${search}`, 500);
  const openCage = useQuery({
    queryKey: [`Town-Api`],
    queryFn: () => FetchOpencageDataReq({ city: `${debouncedSearch}` }),
    enabled: !!debouncedSearch && !!search,
  });
  React.useEffect(() => {
    setlat(openCage.data?.results[0].geometry.lat);
    setlon(openCage.data?.results[0].geometry.lng);
    return () => {
      setlat(0);
      setlon(0);
    };
  }, [openCage.isSuccess, openCage.data]);

  const openWeatherma = useQuery({
    queryKey: [`Town-weather`],
    queryFn: () =>
      FetchOpenweathermap({
        lat: `${openCage.data?.results[0].geometry.lat}`,
        lon: `${openCage.data?.results[0].geometry.lng}`,
      }),
    enabled: !!debouncedSearch && !!search,
  });
  console.log(openWeatherma.data);

  const searchOnchangeHandler: React.ChangeEventHandler<
    HTMLInputElement
  > = el => {
    setsearch(el.target.value);
  };

  return (
    <div className="w-full h-screen mx-auto container bg-slate-300">
      <div className="w-full bg-slate-400 h-16 flex justify-center p-4 ">
        <div className=" w-full h-10 flex justify-center space-x-[2px] ">
          <SearchInput
            onChange={el => searchOnchangeHandler(el)}
            type="text"
            placeholder="Select the desired location"
            src="./public/search.svg"
            className={ClassNames(
              'rounded-md max-w-[800px] w-full h-9 px-2 border-2 border-slate-900',
            )}
          />
        </div>
      </div>
      <div className="flex flex-row w-full p-2 gap-x-2 ">
        <section className="bg-slate-500 w-full h-48 overflow-hidden text-white p-2 flex flex-col text-sm gap-y-1">
          <p className="text-2xl text-yellow-400">
            Native Name:
            <span className="text-white">
              {openCage.data?.results[0].components.country}
            </span>
          </p>
          <p className="text-sm text-yellow-400">
            Capital:
            <span className="text-white">
              {openCage.data?.results[0].components.city}
            </span>
          </p>
          <p className="text-sm text-yellow-400">
            Region:
            <span className="text-white">
              {openCage.data?.results[0].components.continent}
            </span>
          </p>
          <p className="text-sm text-yellow-400">
            population:
            <span className="text-white">
              {openCage.data?.results[0].annotations.Mercator.x}
            </span>
          </p>
          <p className="text-xs font-semibold text-yellow-400">
            Time zone:
            <span className="text-white">
              {openCage.data?.timestamp.created_http}
            </span>
          </p>
          <p className="text-xs font-semibold text-yellow-400">
            Time zone:
            <span className="text-white">
              {openCage.data?.timestamp.created_http}
            </span>
          </p>
        </section>
        <section className="bg-slate-500 w-full h-48 flex flex-col justify-start ">
          <p className="bg-slate-700 h-16 text-white text-xl w-full flex items-center justify-center font-semibold ">
            Caling Code
          </p>
          <p className="bg-yellow-400 h-full text-6xl flex justify-center items-center">
            {openCage.data?.results[0].annotations.callingcode}
          </p>
        </section>
        <section className="bg-slate-500 w-full h-48 flex justify-center items-center">
          <img
            src={openCage.data?.results[0].annotations.flag}
            alt={openCage.data?.results[0].annotations.flag}
          />
        </section>
      </div>
      <div className="p-2 flex flex-row gap-x-2">
        <section className="bg-slate-500 w-4/12 h-48 text-white p- flex flex-col text-sm gap-y-1">
          <div className="flex justify-center flex-col items-center gap-y-2">
            <p className="bg-slate-700 text-yellow-400 w-full h-10 font-semibold text-lg text-center flex items-center justify-center">
              CAPITAL WEATHER REPORT
            </p>
            <p className="text-blue-900 font-bold text-5xl">
              {openWeatherma.data?.weather[0].icon}
            </p>
            <p className="text-yellow-400 font-semibold">
              {openWeatherma.data?.weather[0].description}
            </p>
          </div>
          <div>
            <p className="px-2 text-lg">
              Wind Speed: {openWeatherma.data?.wind.speed}
            </p>
            <p className="px-2 text-lg">
              Temperature: {openWeatherma.data?.main.temp}
            </p>
          </div>
        </section>
        <section className="w-8/12 h-48 border-2 border-slate-900 flex flex-col ">
          {lat && lon ? <MyMap lat={lat} lon={lon} /> : <p>Loading map...</p>}
        </section>
      </div>
    </div>
  );
}
export default App;
