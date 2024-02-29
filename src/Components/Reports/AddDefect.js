import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import "./AddDefect.css";

import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const AddDefect = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  return (
    <>
     <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 9,
        }}
        // layout="horizontal"
        // disabled={componentDisabled}
        style={{
          maxWidth: "100%",
          maxheight:"100%",
          background:"white",
          paddingLeft:"20%"
          
          
        }}
      >
       
        <Form.Item label="Defect Id" >
          <Input  type='text' placeholder='Trackcode 99' />
        </Form.Item>
        <Form.Item label="Bug Title">
          <Input type='text' placeholder='2 Factor Authentication(2FA) OTP Validation Failuer' />
        </Form.Item>
        <Form.Item label="Bug Desciption">
          <TextArea rows={4} placeholder='Bug Description' />
        </Form.Item>
        <Form.Item label="Bug Type">
          <Select  placeholder="Select">
            <Select.Option value="demo">Functional Bugs</Select.Option>
            <Select.Option value="demo">Logical Bugs</Select.Option>
            <Select.Option value="demo">Unit Level Bugs</Select.Option>
            <Select.Option value="demo">System Level Integration Bugs</Select.Option>
            <Select.Option value="demo">Security Bugs</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Raised By">
          <Input type='text' placeholder='Angel' />
        </Form.Item>
        <Form.Item label="Priority">
          <Select  placeholder="Select">
            <Select.Option value="">Critical</Select.Option>
            <Select.Option value="">High</Select.Option>
            <Select.Option value="">Medium</Select.Option>
            <Select.Option value="">Low</Select.Option>
         </Select>
        </Form.Item>
        <Form.Item label="Status">
          <Select  placeholder="Select">
            <Select.Option value="">Open</Select.Option>
            <Select.Option value="">Fix</Select.Option>
            <Select.Option value="">Close</Select.Option>
            <Select.Option value="">Reopen</Select.Option>
         </Select>
         </Form.Item>
         <Form.Item label="Module Type">
          <Select  placeholder="Select">
            <Select.Option value="">Backend</Select.Option>
            <Select.Option value="">Fronted</Select.Option>
            <Select.Option value="">Designers</Select.Option>
          </Select>
        
        </Form.Item>
        <Form.Item label="Project">
          <Input type='text' placeholder='Procurement' />
        </Form.Item>
        <Form.Item label="Assign to">
          <Input type='text' placeholder='Benny Kenn'  />
        </Form.Item>
        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>
        </Form>
      <Form.Item >
          <Button className='form-btn' style={{alignItems:"center"}}>Submit</Button>
        </Form.Item>
    </>
  );
};
export default AddDefect;