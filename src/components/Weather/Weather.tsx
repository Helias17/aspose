import React, { useState, useEffect } from "react";
import { useAsync } from "react-async";
import { weatherApi } from "../../api/api";
import css from "./Weather.module.scss";
import loader from "./loader.gif";
import options from "./options.svg";
import { CityWeather } from "../../types/type";
import { WEATHER_LOCATION } from "../../constants";

const authorisedUserStorage = localStorage.getItem("xsdrz-user");
const authorisedUser = authorisedUserStorage || "";

const weatherCityStorage = localStorage.getItem("xsdrz-weather-city");
const weatherCity = authorisedUser
  ? weatherCityStorage || WEATHER_LOCATION
  : WEATHER_LOCATION;

const getWeatherData = async () => {
  return await weatherApi.getCityWeather(WEATHER_LOCATION);
};
const getWeatherCities = async () => {
  return await weatherApi.getCitiesList();
};

export const Weather = () => {
  const [currentCity, setCurrentCity] = useState(weatherCity);
  const [temperature, setTemperature] = useState(0);
  const [loading, setLoading] = useState(true);

  const [optionsVisible, setOptionsVisible] = useState(false);

  const {
    isPending: isPendingCities,
    data: dataCities,
    error: errorCities,
  } = useAsync(getWeatherCities);

  useEffect(() => {
    const fetchCityWeather = async (city: string) => {
      const response = await weatherApi.getCityWeather(city);
      return response.data[0];
    };
    fetchCityWeather(currentCity).then((cityData) => {
      setLoading(false);
      setTemperature(cityData.temp);
    });
  }, [currentCity]);

  let fullTemperature = "--°C";
  if (temperature > 0) {
    fullTemperature = `+${temperature}°C`;
  } else if (temperature < 0) {
    fullTemperature = `-${temperature}°C`;
  } else {
    fullTemperature = `0°C`;
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    setCurrentCity(selectedCity);
    setLoading(true);
    localStorage.setItem("xsdrz-weather-city", selectedCity);
  };

  return (
    <div className={css.weather}>
      {loading && <img src={loader} className={css.weather__loader} alt="" />}
      {!loading && `${currentCity} ${fullTemperature}`}
      <img
        src={options}
        alt=""
        className={css.weather__options}
        onClick={() => setOptionsVisible(!optionsVisible)}
      />
      {optionsVisible && (
        <div className={css.weather__selectWrap}>
          <select
            name="cities"
            id="cities"
            disabled={isPendingCities}
            onChange={handleCityChange}
            value={currentCity}
          >
            {dataCities &&
              dataCities.data.map((cityItem: CityWeather, index: number) => (
                <option value={cityItem.location} key={index}>
                  {cityItem.location}
                </option>
              ))}
          </select>
        </div>
      )}
    </div>
  );
};
