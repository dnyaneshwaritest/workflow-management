import React from "react";
import { Breadcrumb, Tabs } from 'antd';
import { Link} from "react-router-dom";
import IssueList from "./IssueList";
import AddDefect from "./AddDefect";
import IssueReport from "./IssueReport";
import Breadcrumbs from "../Breadcrumbs";
import "./BugManagement.css";


function BugManagement (){
    return(
        <div className="breadcrumb">
             {/* <Breadcrumb>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href="">Issue Tracker</a>
    </Breadcrumb.Item>
    
    <Breadcrumb.Item>Issue List</Breadcrumb.Item>
  </Breadcrumb> */}
   <Breadcrumbs/>
        <h3 className="tittle">Bug Management</h3>
        <Tabs defaultActiveKey="1" >
       
    <Tabs.TabPane tab={<Link to="/allbugs">All Bugs</Link> } key="1" >
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