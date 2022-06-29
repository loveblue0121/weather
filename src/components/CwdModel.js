import { Modal, Table } from 'antd';
import { AppContext } from '../App';

function CwbModel() {
  return (
    <>
      <AppContext.Consumer>
        {/* <Modal
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
        </Modal> */}
      </AppContext.Consumer>
    </>
  );
}
export default CwbModel;
