import './App.css';
import { Card, Button, Modal, Table } from 'antd';
import { useState, useEffect } from 'react';
import {
  ReloadOutlined,
  createFromIconfontCN,
  ExportOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import useFetch from './Hooks/useFetch';
import CwbModel from './components/CwdModel';
import React, { createContext } from 'react';

export const AppContext = createContext();
const AUTHORIZATION_KEY = process.env.REACT_APP_AUTHORIZATION_KEY;

function App() {
  const [visible, setVisible] = useState(false);
  const [dataList, setDataList] = useState([]);
  const selectionType = useState('checkbox');
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  });

  const [weatherElement, axiosData] = useFetch({
    authorizationKey: AUTHORIZATION_KEY,
  });
  // console.log(weatherElement);

  //表格標頭
  const columns = [
    {
      title: '縣市',
      dataIndex: 'name',
      className: 'titleColor',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: '地區',
      dataIndex: 'town',
      className: 'titleColor',
    },
    {
      title: '觀測時間',
      dataIndex: 'time',
      className: 'titleColor',
      sorter: (a, b) => a.town - b.town,
    },
    {
      title: '天氣',
      dataIndex: 'weather',
      className: 'titleColor',
    },
    {
      title: '溫度',
      dataIndex: 'temperature',
      className: 'titleColor',
      sorter: (a, b) => a.temperature - b.temperature,
    },
    {
      title: '風速',
      dataIndex: 'windy',
      className: 'titleColor',
    },
    {
      title: '',
      dataIndex: 'info',
      className: 'titleColor',
    },
  ];
  //表格內資料
  const formData = [
    {
      key: '1',
      name: weatherElement.city,
      town: weatherElement.town,
      time: weatherElement.obsTime,
      weather: weatherElement.weather,
      temperature: weatherElement.temperature,
      windy: weatherElement.windSpeed + 'm/h',
      info: <ProfileOutlined className="fileIcon" />,
    },
  ];

  const onChange = (filters, sorter, extra) => {
    console.log('params', filters, sorter, extra);
  };

  //CheckBox
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

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
                  Export
                </Button>
                <Button
                  type="primary"
                  className="btnStyle"
                  icon={<ReloadOutlined />}
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
              dataSource={formData}
              onChange={onChange}
              pagination={false}
            />
          </Card>
        </div>
        <Button onClick={() => setVisible(true)}>1</Button>
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
