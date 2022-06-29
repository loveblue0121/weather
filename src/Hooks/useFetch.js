import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/*
'WDSD' 風速
'TEMP' 溫度(攝氏)
'CITY' 縣市
'TOWN' 鄉鎮
'obsTime' 觀測時間
'Weather' 天氣現象描述
*/

const axiosCurrentWeather = ({ authorizationKey }) => {
  // console.log(authorizationKey,"authorizationKey")
  // console.log(locationName,"locationName")
  return axios
    .get(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authorizationKey}`
    )
    .then((response) => {
      const locationData = response.data.records.location[1];

      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (['WDSD', 'TEMP', 'Weather'].includes(item.elementName)) {
            neededElements[item.elementName] = item.elementValue;
          }
          return neededElements;
        },
        {}
      );
      const weather = locationData.parameter.reduce((neededElements, item) => {
        if (['CITY', 'TOWN'].includes(item.parameterName)) {
          neededElements[item.parameterName] = item.parameterValue;
        }
        return neededElements;
      }, {});
      // console.log('locationData:', locationData);
      return {
        obsTime: locationData.time.obsTime,
        locationName: locationData.locationName,
        temperature: weatherElements.TEMP,
        windSpeed: weatherElements.WDSD,
        city: weather.CITY,
        town: weather.TOWN,
        weather: weatherElements.Weather,
      };
    });
};

const useFetch = ({ locationName, cityName, authorizationKey }) => {
  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: '',
    temperature: 0,
    windSpeed: 0,
    description: '',
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: '',
    isLoading: true,
    city: '',
    town: '',
  });

  const axiosData = useCallback(async () => {
    setWeatherElement((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    const [currentWeather] = await Promise.all([
      axiosCurrentWeather({ authorizationKey }),
    ]);

    setWeatherElement({
      ...currentWeather,
      isLoading: false,
    });
  }, [authorizationKey]);

  useEffect(() => {
    axiosData();
  }, [axiosData]);

  return [weatherElement, axiosData];
};

export default useFetch;
