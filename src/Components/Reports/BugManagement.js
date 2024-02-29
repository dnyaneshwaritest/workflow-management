import React from "react";
import { Breadcrumb, Tabs } from 'antd';
import { Link} from "react-router-dom";
import IssueList from "./IssueList";
import AddDefect from "./AddDefect";
import IssueReport from "./IssueReport";
import "./BugManagement.css";


function BugManagement (){
    return(
        <div >
             <Breadcrumb>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href="">Issue Tracker</a>
    </Breadcrumb.Item>
    
    <Breadcrumb.Item>Issue List</Breadcrumb.Item>
  </Breadcrumb>
        <h3 className="tittle">Bug Management</h3>
        <Tabs defaultActiveKey="1" >
       
    <Tabs.TabPane tab={<Link to="/issuelist">Issue List</Link> } key="1" >
      {/* <IssueList /> */}
    </Tabs.TabPane>
   
    
    {/* <Tabs.TabPane tab="Add Defect" key="2">
      Content of Tab Pane 2
    </Tabs.TabPane> */}
    <Tabs.TabPane tab={<Link to="/issuereport">Issue Report</Link>}key="3" >
      {/* <IssueReport/> */}
      
    </Tabs.TabPane>
  </Tabs>
        </div>
    );

};
export default BugManagement;