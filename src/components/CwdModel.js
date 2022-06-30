import { Modal, Table } from 'antd';
import { AppContext } from '../App';
import './CwdModel.css';

function CwbModel() {
  return (
    <>
      <AppContext.Consumer>
        {(value) => (
          <Modal
            centered
            visible={value.visible}
            onCancel={() => value.setVisible(false)}
            width={700}
            footer={null}
            className="weatherCard"
          ></Modal>
        )}
      </AppContext.Consumer>
    </>
  );
}
export default CwbModel;
