import { ReactComponent as DayCloudy } from '../images/day-cloudy.svg';
import { ReactComponent as DayFog } from '../images/day-fog.svg';
import { ReactComponent as DayThunderstorm } from '../images/day-thunderstorm.svg';
import { ReactComponent as DayCloudyFog } from '../images/day-cloudy-fog.svg';
import { ReactComponent as DayClear } from '../images/day-clear.svg';
import { ReactComponent as DayPartiallyClearWithRain } from '../images/day-partially-clear-with-rain.svg';
import { ReactComponent as NightClear } from '../images/night-clear.svg';
import { ReactComponent as NightCloudy } from '../images/night-cloudy.svg';
import { ReactComponent as NightCloudyFog } from '../images/night-cloudy-fog.svg';
import { ReactComponent as NightFog } from '../images/night-fog.svg';
import { ReactComponent as NightThunderstorm } from '../images/night-thunderstorm.svg';
import { ReactComponent as NightPartiallyClearWithRain } from '../images/night-partially-clear-with-rain.svg';
import { useEffect, useState } from 'react';
import moment from 'moment';

const AUTHORIZATION_KEY = process.env.REACT_APP_AUTHORIZATION_KEY;

// 定義日夜使用的icon
const weatherIcons = {
  day: {
    isThunderstorm: <DayThunderstorm />,
    isClear: <DayClear />,
    isCloudyFog: <DayCloudyFog />,
    isCloudy: <DayCloudy />,
    isFog: <DayFog />,
    isPartiallyClearWithRain: <DayPartiallyClearWithRain />,
  },
  night: {
    isThunderstorm: <NightThunderstorm />,
    isClear: <NightClear />,
    isCloudyFog: <NightCloudyFog />,
    isCloudy: <NightCloudy />,
    isFog: <NightFog />,
    isPartiallyClearWithRain: <NightPartiallyClearWithRain />,
  },
};

function WeatherIcon(props) {
  const { weather, cityName } = props;
  const today = moment(new Date()).format('YYYY-MM-DD');
  const dayadd = moment(new Date(), 'YYYY-MM-DD').add(2, 'days');
  const dayAfterTomorrow = moment(dayadd).format('YYYY-MM-DD');
  const nowTime = moment(new Date()).format('HH:mm');
  const [time, setTime] = useState({});

  // 日出日沒API
  useEffect(() => {
    fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=${AUTHORIZATION_KEY}&locationName=${cityName}&timeFrom=${today}&timeTo=${dayAfterTomorrow}`
    )
      .then((response) => response.json())
      .then((data) => {
        // const dataList = data.records.locations.location[0].time[0].parameter;
        const day =
          data.records.locations.location[0].time[0].parameter[1]
            .parameterValue;
        const night =
          data.records.locations.location[0].time[0].parameter[5]
            .parameterValue;

        const timeRange = {
          day: day,
          night: night,
        };
        setTime(timeRange);
      });
  }, [props]);

  // 設定要顯示的icon
  var icon;

  if (weather === '晴' && nowTime <= time.night) {
    //晴天白天
    icon = weatherIcons.day.isClear;
  } else if (weather === '晴' && nowTime >= time.night) {
    //晴天晚上
    icon = weatherIcons.night.isClear;
  } else if (weather === '陰' && nowTime <= time.night) {
    //陰天白天
    icon = weatherIcons.day.isCloudy;
  } else if (weather === '陰' && nowTime >= time.night) {
    //陰天晚上
    icon = weatherIcons.night.isCloudy;
  } else if (weather === '陰有霾' && nowTime <= time.night) {
    //陰有霾白天
    icon = weatherIcons.day.isCloudyFog;
  } else if (weather === '陰有霾' && nowTime >= time.night) {
    //陰有霾晚上
    icon = weatherIcons.night.isCloudyFog;
  } else if (weather === '多雲' && nowTime <= time.night) {
    //多雲白天 (沒有多雲圖片故用陰天圖片代替)
    icon = weatherIcons.day.isCloudy;
  } else if (weather === '多雲' && nowTime >= time.night) {
    //多雲晚上 (沒有多雲圖片故用陰天圖片代替)
    icon = weatherIcons.night.isCloudy;
  } else if (weather === '晴有雨' && nowTime <= time.night) {
    //晴有雨白天
    icon = weatherIcons.day.isPartiallyClearWithRain;
  } else if (weather === '晴有雨' && nowTime >= time.night) {
    //晴有雨晚上
    icon = weatherIcons.night.isPartiallyClearWithRain;
  } else if (weather === '陰有雨' && nowTime <= time.night) {
    //陰有雨白天 (沒有陰有雨圖片故用情有雨代替)
    icon = weatherIcons.day.isPartiallyClearWithRain;
  } else if (weather === '陰有雨' && nowTime >= time.night) {
    //陰有雨晚上 (沒有陰有雨圖片故用情有雨代替)
    icon = weatherIcons.night.isPartiallyClearWithRain;
  } else if (weather === '晴有霾' && nowTime <= time.night) {
    //晴有霾白天
    icon = weatherIcons.day.isFog;
  } else if (weather === '晴有霾' && nowTime >= time.night) {
    //晴有霾晚上
    icon = weatherIcons.night.isFog;
  }

  return (
    <>
      <div className="bigIcon">{icon}</div>
    </>
  );
}

export default WeatherIcon;
