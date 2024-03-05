import React,{useState} from "react";
import { DownOutlined } from '@ant-design/icons';
import { Table, Input, Space, Menu, Dropdown, Button, Tag, Select, Checkbox } from "antd";
import  {PlusOutlined, LeftOutlined, RightOutlined,SaveOutlined, EditOutlined } from '@ant-design/icons';
import "./IssueList.css";
import { Link } from 'react-router-dom';
import Bugdata from "./bugdata.json"
import { Option } from "antd/es/mentions";

function IssueList (){
const [showCheckboxes, setShowCheckboxes]= useState(false);
const [checkboxColumn, setCheckboxColumn] = useState(null);
const [searchvalue, setSearchvalue] = useState("");
console.log(searchvalue)
const {Search} = Input;
const items = [
    {
      label: <Search style={{width:"100px"}}/>,
      key: '0',
    },
    {
      label:<Checkbox>Procurement</Checkbox>,
      key: '1',
      
    },
    // {
    //   type: 'divider',
    // },
    {
      label:<Checkbox>App Kube</Checkbox>,
      key: '2',
    },
    {
        label: <Checkbox>HRMS</Checkbox>,
        key: '3',
      },
      {
        label: <Checkbox>Xformation</Checkbox>,
        key: '4',
      },
      {
        label: <Checkbox>EMS</Checkbox>,
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
        filteredValue: [searchvalue],
        onFilter: (value, records) =>{
          return(
            String(records.bugtitles)
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            String(records.raisdeby)
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            String(records.defectid)
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            String(records.assigneeto)
              .toLowerCase()
              .includes(value.toLowerCase())
          );
        }
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
      render: (text)=>
      <span>{text}</span>,
      onHeadCell: ()=>({
        onClick: () =>{
        
          setShowCheckboxes(!showCheckboxes);
          setCheckboxColumn('raisdeby');
        }
      }),
      filterIcon: <DownOutlined />,
    filterDropdown: () => (
      <Menu>
        <Menu.Item><Search style={{width:"100px"}}/></Menu.Item>
        <Menu.Item>
          
          <Checkbox>Darlene</Checkbox>
        </Menu.Item>
        <Menu.Item>
          <Checkbox>Floyd</Checkbox>
        </Menu.Item>
        <Menu.Item>
          <Checkbox>Angela</Checkbox>
        </Menu.Item>
        <Menu.Item>
          <Checkbox>Benny</Checkbox>
        </Menu.Item>
      </Menu>
    ),
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
      filterIcon: <DownOutlined />,
    filterDropdown: () => (
      <Menu>
        <Menu.Item>
          <Checkbox>Critical</Checkbox>
        </Menu.Item>
        <Menu.Item>
          <Checkbox>High</Checkbox>
        </Menu.Item>
        <Menu.Item>
          <Checkbox>Medium</Checkbox>
        </Menu.Item>
        <Menu.Item>
          <Checkbox>Low</Checkbox>
        </Menu.Item>
      </Menu>
    ),

      
      // sorter: (a, b) => a.severity - b.severity,
    },
    {
      title: 'Priority',
      key: 'Priority',
      dataIndex: 'Priority',
      filterIcon: <DownOutlined />,
      filterDropdown: () => (
        <Menu>
          <Menu.Item>
            <Checkbox>Critical</Checkbox>
          </Menu.Item>
          <Menu.Item>
            <Checkbox>High</Checkbox>
          </Menu.Item>
          <Menu.Item>
            <Checkbox>Medium</Checkbox>
          </Menu.Item>
          <Menu.Item>
            <Checkbox>Low</Checkbox>
          </Menu.Item>
        </Menu>
      ),
      // sorter: (a, b) => a.Priority - b.Priority,
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        filterIcon: <DownOutlined />,
        filterDropdown: () => (
          <Menu>
            <Menu.Item>
              <Checkbox>Open</Checkbox>
            </Menu.Item>
            <Menu.Item>
              <Checkbox>Fix</Checkbox>
            </Menu.Item>
            <Menu.Item>
              <Checkbox>Close</Checkbox>
            </Menu.Item>
            <Menu.Item>
              <Checkbox>Reopen</Checkbox>
            </Menu.Item>
            <Menu.Item>
              <Checkbox>In Progress</Checkbox>
            </Menu.Item>
          </Menu>
        ),
        // sorter: (a, b) => a.status - b.status,
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
        ) ,
        filterIcon: <DownOutlined />,
        filterDropdown: () => (
          <Menu>
            <Menu.Item><Search style={{width:"100px"}}/></Menu.Item>
            <Menu.Item>
              
              <Checkbox>Procurement</Checkbox>
            </Menu.Item>
            <Menu.Item>
              <Checkbox>App Kube</Checkbox>
            </Menu.Item>
            <Menu.Item>
              <Checkbox>HRMS</Checkbox>
            </Menu.Item>
            <Menu.Item>
              <Checkbox>Xformation</Checkbox>
            </Menu.Item>
            <Menu.Item>
              <Checkbox>EMS</Checkbox>
            </Menu.Item>
          </Menu>
        ), 
      },
      {
        title: 'Assignee to',
        key: 'assigneeto',
        dataIndex: 'assigneeto',
        filterIcon: <DownOutlined />,
        filterDropdown: () => (
          <Menu>
            <Menu.Item><Search style={{width:"100px"}}/></Menu.Item>
            <Menu.Item>
              
              <Checkbox>Floyd</Checkbox>
            </Menu.Item>
            <Menu.Item>
              <Checkbox>Mob</Checkbox>
            </Menu.Item>
            <Menu.Item>
              <Checkbox>Angela</Checkbox>
            </Menu.Item>
            </Menu>
        ), 
        // sorter: (a, b) => a.assigneeto - b.assigneeto,
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
        filterIcon: <DownOutlined />,
        filterDropdown: () => (
          <Menu>
            <Menu.Item><Search style={{width:"100px"}}/></Menu.Item>
            <Menu.Item>
              
              <Checkbox>Backend</Checkbox>
            </Menu.Item>
            <Menu.Item>
              <Checkbox>Fronted</Checkbox>
            </Menu.Item>
            <Menu.Item>
              <Checkbox>Designers</Checkbox>
            </Menu.Item>
            </Menu>
        ),
        // sorter: (a, b) => a.module - b.module,
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
        <div className="issue-list">
          
            <div className="table-header">
             <Search onChange={(e)=> setSearchvalue(e.target.value)}
      placeholder="input search text"
       style={{
        width: 300,
        float: "left",
        marginBottom:20,
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
        Key='defectid'
        bordered
    size="middle"
    scroll={{
      x: 'calc(700px + 50%)'
     
    }}
        
      />
      
      {/* {showCheckboxes && checkboxColumn === 'raisdeby' && (
        <div>
          <Checkbox>Darlene</Checkbox>
          <Checkbox>Floyd</Checkbox>
          <Checkbox>Angela</Checkbox>
          <Checkbox>Benny</Checkbox>
        </div>
        )} */}
      </div>
      <nav>
        <ul className="pagination">
        <li className="page-item">
          <LeftOutlined onClick={prePage} className="page-link" />
        </li>
        
          {
            numbers.map((n, i) => (
              <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}
               onClick={()=> changeCPage(n)} >
               <b className="page-link">{n}</b>
               </li>
            ))
          }
        <li className="page-item">
         <RightOutlined className="page-link" onClick={nextPage}/>
         </li>
        </ul>
      </nav>
      
      
        </div>
    )
};
export default IssueList;

