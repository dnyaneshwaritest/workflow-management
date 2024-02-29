import React from "react";
import {Row, Col, Input, Avatar, Button, Tooltip} from "antd";
// import moment from "moment";
// import { UserOutlined } from '@ant-design/icons';
// import logo512 from "/public/logo512.png";

import "./IssueReport.css";
const {Search, TextArea} = Input;

function IssueReport (){
    
    return (
        <div>
            <h4>Bug Report</h4>
            <Button className="download-btn">Download</Button>
           <div className="bug-form">
           <Row >
            <Col span={8}>
                <label className="label">Defect No</label>
                <Input value="Trackcode 99" name="" variant="borderless" className="input-border"readOnly={true}/>
            </Col>
            <Col span={8}>
                <label className="label">Bug Title</label>
                <Input value="Issue in reset password" name="" variant="borderless" className="input-border" readOnly={true}/>
                </Col>
            <Col span={8}>
                <label className="label">Bug Type</label>
                <Input value="Functional" name="" variant="borderless" className="input-border" readOnly={true}/>
                </Col>
          </Row>
          <Row className="bug-form">
            <Col span={8}>
                <label className="label">Project Name</label>
                <Input value="Procurement" name="" variant="borderless" className="input-border"readOnly={true}/>
            </Col>
            <Col span={8}>
                <label className="label">Usecase</label>
                <Input value="Usecase 1" name="" variant="borderless" className="input-border" readOnly={true}/>
                </Col>
            <Col span={8}>
                <label className="label">Module Type</label>
                <Input value="Backend" name="" variant="borderless" className="input-border" readOnly={true}/>
                </Col>
          </Row>
          <Row className="bug-form">
            <Col span={8}>
                <label className="label">Status</label>
                <Input value="Open" name="" variant="borderless" className="input-border"/>
            </Col>
            <Col span={8}>
                <label className="label">Serverity</label>
                <Input value="Medium" name="" variant="borderless" className="input-border" readOnly={true}/>
                </Col>
            <Col span={8}>
                <label className="label">Priority</label>
                <Input value="High" name="" variant="borderless" className="input-border" readOnly={true}/>
                </Col>
          </Row>
          <Row className="bug-form">
            <Col span={8}>
                <label className="label">Issue raised date</label>
                <Input value="04/01/2024" name="" variant="borderless" className="input-border"readOnly={true}/>
            </Col>
            <Col span={8}>
                <label className="label">Start date</label>
                <Input type="date" value="" name="" variant="borderless" className="input-border" />
                </Col>
            <Col span={8}>
                <label className="label">End date</label>
                <Input type="date" value="" name="" variant="borderless" className="input-border" />
                </Col>
          </Row>
          <Row className="bug-form">
            <Col span={8}>
                <label className="label">Raised By</label>
                <Input value="Angela Moss" name="" variant="borderless" className="input-border"readOnly={true}/>
            </Col>
            <Col span={8}>
                <label className="label">Assign To</label>
                <Input value="Della Samantha" name="" variant="borderless" className="input-border" readOnly={true}/>
                </Col>
            {/* <Col span={8}>
                <label className="label">Bug Type</label>
                <Input value="Functional" name="" variant="borderless" className="input-border" readOnly={true}/>
                </Col> */}
          </Row>
          <Row className="bug-form">
            <Col span={24}>
                <label className="label">Bug Description</label><br/>
                <TextArea rows={4} value="When attempting to set up 2FA in the App Kube,
                users can input usernames and passwords without
                encountering any character limit validation." name="" variant="borderless" className="bug-description"readOnly={true}/>
            </Col>
      
         </Row>
         <Row className="bug-form">
            <Col span={24}>
                <label className="label">Attachments</label><br/>
                <Input value="" name="" variant="borderless" className="bug-description"readOnly={true}/>
            </Col>
      
         </Row>
          
           </div>
           <div className="comment-box">
            <h3>Comments</h3>
            <div>
            <Search className="search-comment"
             placeholder="search "/>
            </div>
                <div style={{paddingBottom:"20px"}}>
                <Row className="comment-window">
                    <Col span={24} >
                    <Avatar size={50}  src="../girl.jpg" className="comment-avatar"
                    // datetime={
                    //     <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    //       <span>{moment().fromNow()}</span>
                    //     </Tooltip>
                    //   }
                    />
                    <b>Angela Moss</b>
                    <b className="comment-title">Comment</b>
                    </Col>
                    <Col className="comment-line" >
                        <TextArea rows={3}
                        placeholder="Please write comment here"/>
                    </Col> 
                   
                </Row>
                </div>
               
           </div>
        </div>
    );
};
export default IssueReport;