import './App.css';
import { Card, Button, Modal, Table } from 'antd';
import { useState, useEffect } from 'react';
import {
  ReloadOutlined,
  ExportOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import React, { createContext } from 'react';
import { CSVLink, CSVDownload } from 'react-csv';

export const AppContext = createContext();
const AUTHORIZATION_KEY = process.env.REACT_APP_AUTHORIZATION_KEY;

function App() {
  const [visible, setVisible] = useState(false);
  const [dataList, setDataList] = useState([]);
  const selectionType = useState('checkbox');
  const [isSelect, setIsSelect] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const cityList = [
    { text: '臺北市', value: '臺北市' },
    { text: '新北市', value: '新北市' },
    { text: '桃園市', value: '桃園市' },
    { text: '臺中市', value: '臺中市' },
    { text: '臺南市', value: '臺南市' },
    { text: '高雄市', value: '高雄市' },
    { text: '宜蘭縣', value: '宜蘭縣' },
    { text: '新竹縣', value: '新竹縣' },
    { text: '苗栗縣', value: '苗栗縣' },
    { text: '彰化縣', value: '彰化縣' },
    { text: '南投縣', value: '南投縣' },
    { text: '雲林縣', value: '雲林縣' },
    { text: '嘉義縣', value: '嘉義縣' },
    { text: '屏東縣', value: '屏東縣' },
    { text: '花蓮縣', value: '花蓮縣' },
    { text: '臺東縣', value: '臺東縣' },
    { text: '澎湖縣', value: '澎湖縣' },
    { text: '嘉義市', value: '嘉義市' },
    { text: '新竹市', value: '新竹市' },
    { text: '基隆市', value: '基隆市' },
  ];

  // const [weatherElement, axiosData] = useFetch({
  //   authorizationKey: AUTHORIZATION_KEY,
  // });

  //API
  useEffect(() => {
    fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${AUTHORIZATION_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const dataListCount = data.records.location;
        setDataList(dataListCount);
      });
  }, []);

  //表格標頭
  const columns = [
    {
      title: '縣市',
      dataIndex: 'name',
      filters: cityList,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      width: '15%',
    },
    {
      title: '地區',
      dataIndex: 'town',
      width: '15%',
    },
    {
      title: '觀測時間',
      dataIndex: 'time',
      sorter: (a, b) => a.town - b.town,
    },
    {
      title: '天氣',
      dataIndex: 'weather',
      width: '12%',
    },
    {
      title: '溫度',
      dataIndex: 'temperature',
      sorter: (a, b) => a.temperature - b.temperature,
    },
    {
      title: '風速',
      dataIndex: 'windy',
      width: '10%',
    },
    {
      title: '',
      dataIndex: 'info',
    },
  ];
  /*
'WDSD' 風速
'TEMP' 溫度(攝氏)
'CITY' 縣市
'TOWN' 鄉鎮
'obsTime' 觀測時間
'Weather' 天氣現象描述
*/
  //表格內資料
  const lastData = dataList.map((v, i) => {
    return {
      key: i,
      name: v.parameter[0].parameterValue,
      town: v.parameter[2].parameterValue,
      time: moment(v.time.obsTime).format('YYYY/MM/DD HH:mm'),
      weather:
        v.weatherElement[20].elementValue === '-99'
          ? '無數據'
          : v.weatherElement[20].elementValue,
      temperature:
        v.weatherElement[3].elementValue === '-99'
          ? '無數據'
          : Math.round(v.weatherElement[3].elementValue),
      windy:
        v.weatherElement[2].elementValue === '-99'
          ? '無數據'
          : v.weatherElement[2].elementValue + 'm/h',
      info: (
        <div className="tooltip" onClick={() => setVisible(true)}>
          <ProfileOutlined className="fileIcon" />
          <span className="tooltiptext">更多資訊</span>
        </div>
      ),
    };
  });

  //CheckBox
  const onChange = (filters, sorter, extra) => {
    console.log('params', filters, sorter, extra);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setIsSelect(true);
      setSelectData(selectedRows);
      console.log('選擇的index:', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };
  //ref
  function reLoad() {
    window.location.reload();
  }

  return (
    <>
      {/* <AppContext.Provider value={visible}> */}
      <div className="background">
        <div className="box">
          <Card
            className="card"
            bodyStyle={{ padding: '0' }}
            style={{
              width: 1300,
            }}
          >
            <div className="top">
              <h1 className="titleName">即時天氣</h1>
              <div className="btn">
                <Button
                  type="primary"
                  className="btnStyle"
                  icon={<ExportOutlined />}
                >
                  {!isSelect ? (
                    <CSVLink data={lastData} filename="weatherCsvFile">
                      Export
                    </CSVLink>
                  ) : (
                    <CSVLink data={selectData} filename="weatherCsvFile">
                      Export
                    </CSVLink>
                  )}
                </Button>

                <Button
                  type="primary"
                  className="btnStyle"
                  icon={<ReloadOutlined />}
                  onClick={() => reLoad()}
                >
                  Refresh
                </Button>
              </div>
            </div>
            <Table
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              columns={columns}
              dataSource={lastData}
              onChange={onChange}
              pagination={false}
            />
          </Card>
        </div>
        <Modal
          centered
          visible={visible}
          onCancel={() => setVisible(false)}
          width={700}
          footer={null}
          className="weatherCard"
          bodyStyle={{ padding: 200 }}
        ></Modal>

        {/* <CwbModel /> */}
      </div>
      {/* </AppContext.Provider> */}
    </>
  );
}

export default App;
