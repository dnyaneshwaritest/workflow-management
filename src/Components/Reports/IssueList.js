import React,{useState} from "react";
import { DownOutlined } from '@ant-design/icons';
import { Table, Input, Space, Dropdown, Button, Tag, Select, Checkbox } from "antd";
import  {PlusOutlined, LeftOutlined, RightOutlined,SaveOutlined, EditOutlined } from '@ant-design/icons';
import "./IssueList.css";
import { Link } from 'react-router-dom';
import Bugdata from "./bugdata.json"
import { Option } from "antd/es/mentions";

function IssueList (){
const [showCheckboxes, setShowCheckboxes]= useState(false);

const {Search} = Input;
const items = [
    {
      label: <Search style={{width:"100px"}}/>,
      key: '0',
    },
    {
      label: "Procurement",
      key: '1',
      
    },
    // {
    //   type: 'divider',
    // },
    {
      label:"App Kube",
      key: '2',
    },
    {
        label: "HRMS",
        key: '3',
      },
      {
        label: "Xformation",
        key: '4',
      },
      {
        label: "EMS",
        key: '5',
      },
  ];

const columns = [
    {
        title: 'Defect ID',
        dataIndex: 'defectid',
        key: 'defectid',
        // fixed: 'left',
        // sorter: (a, b) => a.defectid - b.defectid,
      },
      {
        title: 'Bug Title',
        dataIndex: 'bugtitles',
        key: 'bugtitles',
        // sorter: (a, b) => a.bugtitles - b.bugtitles,
      },
    {
      title: 'Bug Description',
      dataIndex: 'bugdescription',
      key: 'bugdescription',
      // sorter: (a, b) => a.bugdescription - b.bugdescription,
    },
    {
      title: 'Raised By',
      dataIndex: 'raisdeby',
      key: 'raisdeby',
      render: (raisdeby)=>
      <span>{raisdeby}</span>,
      onHeadCell: ()=>({
        onClick : () =>{
          setShowCheckboxes(true);
        }
      })
      // sorter: (a, b) => a.raisdeby - b.raisdeby,
    },
    {
      title: 'Severity',
      key: 'severity',
      dataIndex: 'severity',
      render:(_, {severity})=>(
        <>
          {severity.map((tag) =>{
            let color = tag.length > 7 ? "moccasin" : "orange";
            if (tag === "High"){
              color = "red";
            } else if (tag === "Low"){
              color = "green"
            }else if (tag === "Critical"){
              color = "blue"
            }
            return(
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            )
          })}
        </>
      ),
      sorter: (a, b) => a.severity - b.severity,
    },
    {
      title: 'Priority',
      key: 'Priority',
      dataIndex: 'Priority',
      sorter: (a, b) => a.Priority - b.Priority,
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        sorter: (a, b) => a.status - b.status,
      },
      {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
        render: (_, {product}) =>(
          <>
            {product.map((products) =>{
              let color = products.length > 10 ? "grey" : "blue";
              if(products === "App Kube"){
                color = "purple";
              } else if(products === "HRMS"){
                color = "lime";
              }
              return(
                <Tag color={color} key={products}>
                  {products}
                </Tag>
              )
            })}
          </>
        )  
      },
      {
        title: 'Assignee to',
        key: 'assigneeto',
        dataIndex: 'assigneeto',
        sorter: (a, b) => a.assigneeto - b.assigneeto,
      },
      // {
      //   title: 'Attachment',
      //   key: 'attachment',
      //   dataIndex: 'attachment',
      //   render: (text) => <a href="">{text}</a>,
      //   sorter: (a, b) => a.attachment - b.attachment,
      // },
      {
        title: 'Module',
        key: 'module',
        dataIndex: 'module',
        sorter: (a, b) => a.module - b.module,
      }
      ];
      
      // function IssueList (){
 


       const [currentPage, setCurrentPage]= useState(1)
       const recordsPerPage = 5;
       const lastIndex = currentPage * recordsPerPage;
       const firstIndex = lastIndex-recordsPerPage;
       const records = Bugdata.slice(firstIndex, lastIndex);
       const npage = Math.ceil(Bugdata.length / recordsPerPage);
       const numbers = [...Array(npage + 1).keys()].slice(1) 
      
       
       function prePage(){
        if(currentPage !== 1){
          setCurrentPage(currentPage - 1)
        }
      }
      function changeCPage(defectid){
        setCurrentPage(defectid)
      }
      function nextPage(){
        if(currentPage !== npage){
          setCurrentPage(currentPage + 1)
        }
      }
      
       return(
        <div>
          
            <div className="table-header">
             <Search
      placeholder="input search text"
       style={{
        width: 300,
      }}
    />
    <Link to ="/adddefect" exact>
    <Button className="menu-button" type="primary" icon={<PlusOutlined />}>
      Add Defect
    </Button>
    </Link>
    <Dropdown className="dropdown-menu" 
    menu={{
      items,
    }}
    trigger={['click']}
  >
    
      <Space onClick={(e) => e.preventDefault()}>
        Select Project
        <DownOutlined />
      </Space>
    
  </Dropdown>
  
    </div>
    <div className="table-data">
            <Table 
         
        columns={columns}
        pagination={false}
        
        dataSource={records}
        rowKey='defectid'
        bordered
    size="middle"
    scroll={{
      x: 'calc(700px + 50%)'
     
    }}
        
      />
      {showCheckboxes &&(
        <div>
          <Checkbox>Darlene</Checkbox>
          <Checkbox>Floyd</Checkbox>
          <Checkbox>Angela</Checkbox>
          <Checkbox>Benny</Checkbox>
        </div>
        )}
      </div>
      <nav style={{float:"right"}}>
        <ul className="pagination">
        <li className="page-item">
          {/* <a href="" className="page-link"
           > */}
            <LeftOutlined onClick={prePage} className="page-link" />
           {/* </a> */}
        </li>
        
          {
            numbers.map((n, i) => (
              <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}
               onClick={()=> changeCPage(n)} >
                {/* <a href="" className="page-link" 
                onClick={()=> changeCPage(n)}> */}
                  <b className="page-link">{n}</b>
                  {/* </a> */}
              </li>
            ))
          }
        <li className="page-item">
          {/* <a href="" className="page-link" > */}
          <RightOutlined className="page-link" onClick={nextPage}/>
          {/* </a> */}
        </li>
        </ul>
      </nav>
      
      
        </div>
    )
};
export default IssueList;