import axios from 'axios';

interface IOpenCageReq {
  lat: string;
  lon: string;
}
interface IOpenCageResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export const FetchOpenweathermap = async ({
  lat,
  lon,
}: IOpenCageReq): Promise<IOpenCageResponse> => {
  const response = await axios.get<IOpenCageResponse>(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        lat: lat,
        lon: lon,
        appid: `8366ff31af694bda371db1d368fb8c57`,
      },
    },
  );
  return response.data;
};
