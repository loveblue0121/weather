import { Modal, Table } from 'antd';
import { AppContext } from './CardBox';
import { useState, useEffect } from 'react';
import './CwdModal.css';
import { ReactComponent as AirFlow } from '../images/airFlow.svg';
import { ReactComponent as Rain } from '../images/rain.svg';
import WeatherIcon from './WeatherIcon';

const AUTHORIZATION_KEY = process.env.REACT_APP_AUTHORIZATION_KEY;

function CwbModel(props) {
  const { cityName, weather } = props;
  const [rain, setRain] = useState();
  const [cityWeather, setCityWeather] = useState([]);
  //表格標題
  const columns = [
    {
      title: '時段',
      dataIndex: 'time',
      key: 'time',
      width: '14%',
    },
    {
      title: '天氣狀況',
      dataIndex: 'weather',
      key: 'weather',
      width: '28%',
    },
    {
      title: '降雨機率',
      dataIndex: 'rain',
      key: 'rain',
      align: 'center',
      width: '15%',
    },
    {
      title: '最低溫',
      dataIndex: 'min',
      key: 'min',
      align: 'center',
      width: '12%',
    },
    {
      title: '最高溫',
      dataIndex: 'max',
      key: 'max',
      align: 'center',
      width: '12%',
    },
    {
      title: '天氣描述',
      dataIndex: 'info',
      key: 'info',
    },
  ];

  // API
  useEffect(() => {
    fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${AUTHORIZATION_KEY}&locationName=${cityName}`
    )
      .then((response) => response.json())
      .then((data) => {
        const list = data.records.location;

        // 表格內容
        //今天白天
        const tbodyData = list.map((v, i) => {
          setRain(v.weatherElement[1].time[0].parameter.parameterName);
          return {
            key: 0,
            time: '今天白天',
            weather: v.weatherElement[0].time[0].parameter.parameterName,
            rain: v.weatherElement[1].time[0].parameter.parameterName + '%',
            min: v.weatherElement[2].time[0].parameter.parameterName,
            max: v.weatherElement[4].time[0].parameter.parameterName,
            info: v.weatherElement[3].time[0].parameter.parameterName,
          };
        });
        //今天晚上
        const todayNight = list.map((v, i) => {
          return {
            key: 1,
            time: '今天晚上',
            weather: v.weatherElement[0].time[1].parameter.parameterName,
            rain: v.weatherElement[1].time[1].parameter.parameterName + '%',
            min: v.weatherElement[2].time[1].parameter.parameterName,
            max: v.weatherElement[4].time[1].parameter.parameterName,
            info: v.weatherElement[3].time[1].parameter.parameterName,
          };
        });
        //明天白天
        const tomorrow = list.map((v, i) => {
          return {
            key: 2,
            time: '明天白天',
            weather: v.weatherElement[0].time[2].parameter.parameterName,
            rain: v.weatherElement[1].time[2].parameter.parameterName + '%',
            min: v.weatherElement[2].time[2].parameter.parameterName,
            max: v.weatherElement[4].time[2].parameter.parameterName,
            info: v.weatherElement[3].time[2].parameter.parameterName,
          };
        });
        const tbody = tbodyData.concat(todayNight, tomorrow);
        setCityWeather(tbody);
      });
  }, [props]);

  return (
    <>
      <AppContext.Consumer>
        {(value) => (
          <Modal
            centered
            visible={value.visible}
            onCancel={() => value.setVisible(false)}
            width={900}
            footer={null}
            className="weatherCard"
            maskTransitionName=""
          >
            <div className="location">
              <p>{value.city}</p>
              <p>{value.town}</p>
            </div>

            <p className="description">{value.weather}</p>

            <div className="currentWeather">
              {value.temp === '儀器故障' ? (
                <div className="temperature">故障</div>
              ) : (
                <div className="temperature">
                  {value.temp}
                  <div className="celsius">°C</div>
                </div>
              )}
              <div className="current">
                <div className="block">
                  <div className="flexBox">
                    <AirFlow className="icon" />
                    <p className="windAndRain">{value.wind}</p>
                  </div>
                  <div className="flexBox">
                    <Rain className="rainIcon" />
                    <p className="windAndRain">{rain}%</p>
                  </div>
                </div>
              </div>
            </div>
            <WeatherIcon weather={weather} cityName={cityName} />

            <Table
              columns={columns}
              dataSource={cityWeather}
              pagination={false}
              className="modalTable"
            />
          </Modal>
        )}
      </AppContext.Consumer>
    </>
  );
}
export default CwbModel;
