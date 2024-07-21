import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import SearchImage from "../assets/search-icon.png";
import ClearWeather from "../assets/clear-weather.png";
import Cloud from "../assets/cloud.png";
import Drizzle from "../assets/drizzle.png";
import Humidity from "../assets/humidity.png";
import Rain from "../assets/rain.png";
import Snow from "../assets/snow.png";
import Wind from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": ClearWeather,
    "01n": ClearWeather,
    "02d": Cloud,
    "02n": Cloud,
    "03d": Cloud,
    "03n": Cloud,
    "04d": Drizzle,
    "04n": Drizzle,
    "09d": Rain,
    "09n": Rain,
    "010d": Rain,
    "010n": Rain,
    "013d": Snow,
    "013n": Snow,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Please Enter city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || ClearWeather;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {}
  };

  useEffect(() => {
    search("Kolkata");
  }, []);

  return (
    <div className="weather">
      <div className="serach-bar">
        <input ref={inputRef} type="text" placeholder="Search...." />
        <img
          src={SearchImage}
          alt=""
          className="search-image"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      <img src={weatherData.icon} alt="" className="weather-image" />
      <p className="tempreture">{weatherData.temperature}°C</p>
      <p className="city">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={Humidity} alt="" className="humi-img" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={Wind} alt="" className="wind-img" />
          <div>
            <p>{weatherData.windspeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
