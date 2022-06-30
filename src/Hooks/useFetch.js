import React, { useState, useEffect, useCallback } from 'react';
import axios, { Axios } from 'axios';

/*
'WDSD' 風速
'TEMP' 溫度(攝氏)
'CITY' 縣市
'TOWN' 鄉鎮
'obsTime' 觀測時間
'Weather' 天氣現象描述
*/
const axiosCurrentWeather = ({ authorizationKey }) => {
  return axios
    .get(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authorizationKey}`
    )
    .then((response) => {
      const locationData = response.data.records.location;
      // console.log('locationData:', locationData);

      // const weatherElements = locationData.weatherElement.reduce(
      //   (neededElements, item) => {
      //     if (['WDSD', 'TEMP', 'Weather'].includes(item.elementName)) {
      //       neededElements[item.elementName] = item.elementValue;
      //     }
      //     return neededElements;
      //   },
      //   {}
      // );
      // const weather = locationData.parameter.reduce((neededElements, item) => {
      //   if (['CITY', 'TOWN'].includes(item.parameterName)) {
      //     neededElements[item.parameterName] = item.parameterValue;
      //   }
      //   return neededElements;
      // }, {});
      // console.log('locationData:', locationData);
      return locationData;
    });
};

const useFetch = ({ authorizationKey }) => {
  // const [weatherElement, setWeatherElement] = useState({
  //   observationTime: new Date(),
  //   locationName: '',
  //   temperature: 0,
  //   windSpeed: 0,
  //   description: '',
  //   weatherCode: 0,
  //   rainPossibility: 0,
  //   comfortability: '',
  //   isLoading: true,
  //   city: '',
  //   town: '',
  // });
  const [weatherElement, setWeatherElement] = useState([]);

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
