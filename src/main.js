import React, {useState} from "react";
import BugManagement from "./Components/Reports/BugManagement";
import AddDefect from "./Components/Reports/AddDefect";
import "./main.css";
import {
    SettingOutlined,
    ProjectOutlined,
    AccountBookOutlined,
    TeamOutlined,
    CarryOutOutlined,
    BellOutlined
  } from '@ant-design/icons';
  import { Breadcrumb, Layout, Menu, theme, Row, Col } from 'antd';
import { Route, Routes } from "react-router-dom";
import IssueList from "./Components/Reports/IssueList";
import IssueReport from "./Components/Reports/IssueReport";
  const { Header, Content, Footer, Sider } = Layout;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem('Navigation One', '1', <SettingOutlined />),
    getItem('Projects', 'sub1', <ProjectOutlined />,[
    getItem('a', '2'),
    getItem('b', '3'),
    getItem('c', '4'),
]),
    getItem('Teams', 'sub2', <TeamOutlined />,[
        getItem('a', '5'),
        getItem('b', '6'),
        getItem('c', '7'),
    ]),
    getItem('Reports', 'sub3', <AccountBookOutlined />, [
        getItem('a', '8'),
        getItem('b', '9'),
        getItem('c', '10'),
    ]),
    getItem('preference', 'sub4', <CarryOutOutlined />,[
        getItem('Account Setting', '11'), 
        getItem('Project Setting', '12'),
        getItem('General Setting', '13'), 
        getItem('Export/Import', '14')
    ]),
    getItem('Notification', 'sub5', <BellOutlined />,[
        getItem('a', '15'),
        getItem('b', '16'),
        getItem('c', '17'),
    ]),
  ];

 function Main (){
    const [collapsed, setCollapsed] = useState(false);
        return (
        <div>
          <Row>
    <Col className="top-menu" span={18} push={6} >
    <BellOutlined style={{float:"right"}}/>
    </Col>
    <Col span={6} pull={18}>
    <h2>SYNECTIKS</h2>
    </Col>
  </Row>
       
      <Layout className="demo-logo-vertical">
       
        <Sider style={{background:"white"}}   collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>         
          <Menu   theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>        
        <Layout> 
          <Content className="bug-content">           
            <BugManagement/>
           
            <Routes>
            
              <Route exact path="/issueList/adddefect"  element={<AddDefect />}  ></Route>
              <Route path="/allbugs" element={<IssueList/>}></Route>
              <Route path="/issuereport" element={<IssueReport/>}></Route>
              
            </Routes>
         </Content>
       </Layout> 
      </Layout>
      </div>
    )
 } ;
 export default Main;
