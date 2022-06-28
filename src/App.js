import './App.css';
import { Card, Button, Modal, Table } from 'antd';
import { useState, useEffect } from 'react';
import { ReloadOutlined } from '@ant-design/icons';

// CWB-A32AD779-6858-483D-888E-A6FCC549A7A9

function App() {
  const [visible, setVisible] = useState(false);
  const [dataList, setDataList] = useState([]);
  const selectionType = useState('checkbox');
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
      dataIndex: 'place',
      className: 'titleColor',
    },
    {
      title: '觀測時間',
      dataIndex: 'time',
      defaultSortOrder: 'descend',
      className: 'titleColor',
      sorter: (a, b) => a.place - b.place,
    },
    {
      title: '天氣',
      dataIndex: 'weter',
      className: 'titleColor',
    },
    {
      title: '溫度',
      dataIndex: 'temperature',
      className: 'titleColor',
      defaultSortOrder: 'descend',
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
  const data = [
    {
      key: '1',
      name: '天龍國',
      weter: '假資料',
    },
    {
      key: '2',
      name: '發財市',
      weter: '假資料',
    },
  ];

  const onChange = (filters, sorter, extra) => {
    console.log('params', filters, sorter, extra);
  };
  /*
  // 接收API
  async function getAllData() {
    const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-A32AD779-6858-483D-888E-A6FCC549A7A9`;
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    setDataList(data.locationName);
  }
  useEffect(() => {
    getAllData();
  }, []);
  console.log(dataList);
*/
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
                <Button type="primary" className="btnStyle">
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
              dataSource={data}
              onChange={onChange}
              pagination={false}
            />
          </Card>
        </div>
        <Button type="primary" onClick={() => setVisible(true)}>
          1
        </Button>
        <Modal
          title="Modal"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={600}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </div>
    </>
  );
}

export default App;
