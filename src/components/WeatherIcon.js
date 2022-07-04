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
  const nowTime = moment(new Date()).format('YYYY-MM-DD HH:mm');
  const [time, setTime] = useState({});
  const [tomorrow, setTomorrow] = useState({});

  // 日出日沒API
  useEffect(() => {
    fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=${AUTHORIZATION_KEY}&locationName=${cityName}&timeFrom=${today}&timeTo=${dayAfterTomorrow}`
    )
      .then((response) => response.json())
      .then((data) => {
        // const dataList = data.records.locations.location;
        const tomorrow = data.records.locations.location[0].time[1];
        const date = data.records.locations.location[0].time[0];
        const day =
          data.records.locations.location[0].time[0].parameter[1]
            .parameterValue;
        const night =
          data.records.locations.location[0].time[0].parameter[5]
            .parameterValue;

        const todayTimeRange = {
          date: date.dataTime,
          day: date.dataTime + ' ' + day,
          night: date.dataTime + ' ' + night,
        };
        const tomorrowTimeRange = {
          date: tomorrow.dataTime,
          day: tomorrow.dataTime + ' ' + day,
          night: tomorrow.dataTime + ' ' + night,
        };
        setTime(todayTimeRange);
        setTomorrow(tomorrowTimeRange);
      });
  }, [props]);
  // 設定要顯示的icon
  var icon;
  const range = moment(nowTime).isBetween(time.night, tomorrow.day); // 設定今晚日落到明早日出前的時段

  if (weather === '晴' && !range) {
    //晴天白天
    icon = weatherIcons.day.isClear;
  } else if (weather === '晴' && range) {
    //晴天晚上
    icon = weatherIcons.night.isClear;
  } else if ((weather === '陰' || weather === '多雲') && !range) {
    //陰天白天
    //多雲白天 (沒有多雲圖片故用陰天圖片代替)

    icon = weatherIcons.day.isCloudy;
  } else if ((weather === '陰' || weather === '多雲') && range) {
    //陰天晚上
    //多雲晚上 (沒有多雲圖片故用陰天圖片代替)
    icon = weatherIcons.night.isCloudy;
  } else if ((weather === '陰有靄' || weather === '陰有霾') && !range) {
    //陰有霾有靄白天
    icon = weatherIcons.day.isCloudyFog;
  } else if ((weather === '陰有靄' || weather === '陰有霾') && range) {
    //陰有霾有靄晚上
    icon = weatherIcons.night.isCloudyFog;
  } else if ((weather === '晴有雨' || weather === '陰有雨') && !range) {
    //晴有雨白天
    icon = weatherIcons.day.isPartiallyClearWithRain;
  } else if ((weather === '晴有雨' || weather === '陰有雨') && range) {
    //晴有雨晚上
    icon = weatherIcons.night.isPartiallyClearWithRain;
  } else if ((weather === '晴有靄' || weather === '晴有霾') && !range) {
    //晴有靄有霾白天
    icon = weatherIcons.day.isFog;
  } else if ((weather === '晴有靄' || weather === '晴有霾') && range) {
    //晴有靄有霾晚上
    icon = weatherIcons.night.isFog;
  } else if (weather === '有雷' && !range) {
    //有雷白天
    icon = weatherIcons.day.isThunderstorm;
  } else if (weather === '有雷' && range) {
    //有雷晚上
    icon = weatherIcons.night.isThunderstorm;
  } else if ((weather === '多雲有霾' || weather === '多雲有靄') && !range) {
    //多雲有霾多雲有靄白天
    icon = weatherIcons.day.isCloudyFog;
  } else if ((weather === '多雲有霾' || weather === '多雲有靄') && range) {
    //多雲有霾多雲有靄晚上
    icon = weatherIcons.night.isCloudyFog;
  }

  return (
    <>
      <div className="bigIcon">{icon}</div>
    </>
  );
}

export default WeatherIcon;
