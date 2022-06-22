import { Button, Form, Modal, Radio, Space, TimePicker } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";

const ModalChooseAction = ({
  isModalVisible,
  iniStyle,
  onCancel,
  onChangeStyle,
}) => {
  const [isTouch, setIsTouch] = useState(false);

  const onFinish = (values) => {
    onChangeStyle(values);
  };

  const onChangeOptionCheckPoint = (e) => {
    setIsTouch(e.target.value);
  };

  return (
    <>
      <Modal
        title="Choose Options"
        visible={isModalVisible}
        onCancel={onCancel}
        footer={false}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={iniStyle}
        >
          <Form.Item label="Color" name="color">
            <Radio.Group>
              <Radio value="#ff0000">Red</Radio>
              <Radio value="#52c41a">Green</Radio>
              <Radio value="#0059ff">Blue</Radio>
              <Radio value="#faad14">Yeallow</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Action" name="action">
            <Radio.Group onChange={onChangeOptionCheckPoint}>
              <Radio value={true}>Touch</Radio>
              <Radio value={false}>Set time</Radio>
            </Radio.Group>
          </Form.Item>

          {!isTouch && (
            <Form.Item label="Time check" name="time">
              <TimePicker showNow={false} format="mm:ss" />
            </Form.Item>
          )}

          <Form.Item
            wrapperCol={{
              offset: { sm: 24, md: 8, lg: 6 },
              span: 16,
            }}
          >
            <Space>
              <Button onClick={onCancel}>Save</Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

ModalChooseAction.propTypes = {
  isModalVisible: PropTypes.bool,
  onCancel: PropTypes.func,
  iniStyle: PropTypes.object,
  onChangeStyle: PropTypes.func,
};

export default ModalChooseAction;
