import React,{Children, useState} from "react";
import { DownOutlined } from '@ant-design/icons';
import { Table, Input, Space, Menu, Dropdown, Button, Tag, Tabs, Checkbox, Divider, Modal } from "antd";
import  {PlusOutlined, LeftOutlined, RightOutlined, CloseOutlined, CloseCircleOutlined, SearchOutlined} from '@ant-design/icons';
import "./IssueList.css";
import { Link } from 'react-router-dom';
import Bugdata from "./bugdata.json"
import IssueReport from "./IssueReport";
import { Option } from "antd/es/mentions";
import { render } from "@testing-library/react";

function IssueList (){
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
const [showCheckboxes, setShowCheckboxes]= useState(false);
const [checkboxColumn, setCheckboxColumn] = useState(null);
const [searchValue, setSearchValue] = useState("");
const [selectRaisedBy, setSelectRaisedBy] = useState([]);
const [selectedSeverity, setSelectedSeverity] = useState('');
const [selectedPriority, setSelectedPriority] = useState('');
const [selectedStatus, setSelecedtStatus] = useState('');
const [selectedProduct, setSelectedProduct] = useState('');
const [selectedAssigneeto, setSelectedAssigneeto] = useState('');
const [selectedModule, setSelectedModule] = useState('');
const [tableData, setTableData] = useState(Bugdata);
const [selectSearchRaisedDropdown, setSelectSearchRaisedDropdown]= useState('');
const [selectSearchProducrDropdown, setSelectSearchProductDropdown] = useState('');
const [selectSearchAssigneeto, setSelectSearchAssigneeto] = useState('');
const [selectSearchModuleDropdown, setSelectSearchModuleDropdown] = useState('');
const [dropdownVisible, setDropdownVisible] = useState(true);
const [selectDefectId, setSelectDefectId] = useState([]);
const [reopenDropdown, setReopenDropdown] = useState(true);

const handleMenuClick = (defectid) => {
 setSelectDefectId([...selectDefectId, defectid])
};

const { TabPane } = Tabs;
const handleTabChange= (key)=>{
  setSelectDefectId(selectDefectId.filter((item)=>item !== key))
}

const handleInputClick = () => {
  if (!dropdownVisible) {
    setDropdownVisible(false); // Open dropdown when input field is clicked and reopen flag is set
    // Reset reopen flag
  }
};

const closeTab = (e, key) => {
  e.stopPropagation();
  setSelectDefectId(selectDefectId.filter((item) => item !== key));
};

const renderTabTitle = (title) => (
  <div>
    {title}
    <CloseOutlined style={{ marginLeft: 40, fontSize:"10px", color:"#FF2D2E" }} onClick={(e) => closeTab(e, title)} />
  </div>
);

const renderContent = (key)=>{
  switch(key) {
    case "defectid":
      return <IssueReport/>
      default:
      return null;
  }
} 

const filteredRaisedbyMenuItem = ['Darlene', 'Floyd', 'Angela', 'Benny', 'Mob', 'John', 'Sam', 'Willers'].filter(item =>
item.toLowerCase().includes(selectSearchRaisedDropdown.toLowerCase())
);

const filteredProductMenuItem = ['Procurement', 'App Kube', 'HRMS', 'Xformation', 'EMS', 'Product1', 'Product2', 'Product3', 'Product4' ].filter(item =>
  item.toLowerCase().includes(selectSearchProducrDropdown.toLowerCase()));

const filteredAssigneetoMenuItem = ['Floyd', 'Mob', 'Angela Moss', 'Benny', 'John', 'Sam', 'Willers'].filter(item =>
item.toLowerCase().includes(selectSearchAssigneeto.toLowerCase()));

const filteredModuleMenuItem = ['Backend', 'Fronted', 'Designers'].filter(item =>
item.toLowerCase().includes(selectSearchModuleDropdown.toLowerCase()));

const handleClearButtomClick = ()=>{
  // setDropdownVisible(false);
  setSelectSearchRaisedDropdown('');
  setSelectRaisedBy('');
  setTableData(Bugdata);
  
}


const handleProductClearButton = ()=>{
  setSelectSearchProductDropdown('');
  setSelectedProduct('');
  setTableData(Bugdata);
}

const handleAssigneetoClearButton=()=>{
  setSelectSearchAssigneeto('');
  setSelectedAssigneeto('');
  setTableData(Bugdata);
}

const handleModuleClearButton=()=>{
  setSelectSearchModuleDropdown('');
  setSelectedModule('');
  setTableData(Bugdata);
  // setDropdownVisible(true);
}

const handleSearch = (value) => {
  setSearchValue(value);
  const newData = Bugdata.filter((item) =>
    Object.values(item).some(
      (val) =>
        typeof val === "string" && val.toLowerCase().includes(value.toLowerCase())
    ) ||
    item.severity.some((severity)=> severity.toLowerCase().includes(value.toLowerCase())) ||
    item.product.some((product)=> product.toLowerCase().includes(value.toLowerCase()))
  );
  setTableData(newData);
};

const handleRaisedByChange = (value, checked) => {
  let updatedSelectedRaisedBy = [...selectRaisedBy];

  if (checked) {
    updatedSelectedRaisedBy.push(value);
  } else {
    updatedSelectedRaisedBy = updatedSelectedRaisedBy.filter(item => item !== value);
  }
  setSelectRaisedBy(updatedSelectedRaisedBy);
  filterTableData(updatedSelectedRaisedBy, selectedSeverity, selectedPriority, selectedStatus, selectedProduct, selectedAssigneeto, selectedModule);
};

const handleSeverityChange = (value, checked) => {
  let updatedSelectedSeverity = [...selectedSeverity];

  if (checked) {
    updatedSelectedSeverity.push(value);
  } else {
    updatedSelectedSeverity = updatedSelectedSeverity.filter(item => item !== value);
  }

  setSelectedSeverity(updatedSelectedSeverity);
  filterTableData(selectRaisedBy, updatedSelectedSeverity, selectedPriority, selectedStatus, selectedProduct, selectedAssigneeto, selectedModule);
};

const handlePriorityChange = (value, checked) => {
  let updatedSelectedPriority = [...selectedPriority];

  if (checked) {
    updatedSelectedPriority.push(value);
  } else {
    updatedSelectedPriority = updatedSelectedPriority.filter(item => item !== value);
  }

  setSelectedPriority(updatedSelectedPriority);
  filterTableData(selectRaisedBy, selectedSeverity, updatedSelectedPriority, selectedStatus, selectedProduct, selectedAssigneeto, selectedModule);
};

const handleStatusChange = (value, checked) =>{
  let updatedSelectedStatus = [...selectedStatus];

  if(checked){
    updatedSelectedStatus.push(value);
  }else {
    updatedSelectedStatus = updatedSelectedStatus.filter(item => item!== value);
  }
  setSelecedtStatus(updatedSelectedStatus);
  filterTableData(selectRaisedBy, selectedSeverity, selectedPriority, updatedSelectedStatus, selectedProduct, selectedAssigneeto, selectedModule);
}

const handleProductChange = (value, checked) =>{
  let updatedSelectedProduct = [...selectedProduct];
  if (checked){
    updatedSelectedProduct.push(value);
  }else{
    updatedSelectedProduct = updatedSelectedProduct.filter(item => item!== value);
  }
  setSelectedProduct(updatedSelectedProduct);
  filterTableData(selectRaisedBy, selectedSeverity, selectedPriority, selectedStatus, updatedSelectedProduct, selectedAssigneeto, selectedModule);
}

const handleAssigneetoChange = (value, checked) =>{
  let updatedSelectedAssigneeto = [...selectedAssigneeto];
  if(checked){
    updatedSelectedAssigneeto.push(value);
  }else{
    updatedSelectedAssigneeto = updatedSelectedAssigneeto.filter(item => item!== value);
  }
  setSelectedAssigneeto(updatedSelectedAssigneeto);
  filterTableData(selectRaisedBy, selectedSeverity, selectedPriority, selectedStatus, selectedProduct, updatedSelectedAssigneeto, selectedModule);
}

const handleModuleChange = (value, checked) =>{
  let updatedSelectedModule = [...selectedModule];
  if(checked){
    updatedSelectedModule.push(value);
  }else{
    updatedSelectedModule = updatedSelectedModule.filter(item => item !== value);
  }
  setSelectedModule(updatedSelectedModule);
  setDropdownVisible(true);
  filterTableData(selectRaisedBy, selectedSeverity, selectedPriority, selectedStatus, selectedProduct, selectedAssigneeto, updatedSelectedModule);
}


const filterTableData = (raisedByFilters, severityFilters, priorityFilters, statusFilters, productFilters, assigneetoFilters, moduleFilters) => {
  let newData = Bugdata;

  if (raisedByFilters.length > 0) {
    newData = newData.filter(item => raisedByFilters.includes(item.raisdeby));
  }

  if (severityFilters.length > 0) {
    newData = newData.filter(item => {
      return item.severity.some(severity => severityFilters.includes(severity));
    });
  }

  if(priorityFilters.length > 0){
    newData = newData.filter(item => priorityFilters.includes(item.Priority));
  }

  if(statusFilters.length > 0){
    newData = newData.filter(item => statusFilters.includes(item.status));
  }
  if(productFilters.length > 0){
    newData = newData.filter(item => {
      return item.product.some(product => productFilters.includes(product));
    })
  }
  if(assigneetoFilters.length > 0){
    newData = newData.filter(item => assigneetoFilters.includes(item.assigneeto));
  }
  if(moduleFilters.length > 0){
    newData = newData.filter(item => moduleFilters.includes(item.module));
  }

  setTableData(newData);
};

console.log("Filtered data:",tableData);
console.log("raisedby:", selectRaisedBy )

// console.log(searchvalue)
const {Search} = Input;
const items = [
        {
      label:"Procurement",
      key: '1',
      
    },
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
        onCell:(records, rowIndex)=>({
              onClick: ()=> handleMenuClick(records.defectid)
          })
        },
        // fixed: 'left',
        // sorter: (a, b) => a.defectid - b.defectid,
      
      {
        title: 'Bug Title',
        dataIndex: 'bugtitles',
        key: 'bugtitles',
        // filteredValue: [searchvalue],
        // onFilter: (value, records) =>{
        //   return(
        //     String(records.bugtitles)
        //       .toLowerCase()
        //       .includes(value.toLowerCase()) ||
        //     String(records.raisdeby)
        //       .toLowerCase()
        //       .includes(value.toLowerCase()) ||
        //     String(records.defectid)
        //       .toLowerCase()
        //       .includes(value.toLowerCase()) ||
        //     String(records.assigneeto)
        //       .toLowerCase()
        //       .includes(value.toLowerCase())
        //   );
        // }
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
      render: (text)=>(
      <span>{text}</span>
      ),
      onHeadCell: ()=>({
        onClick: () =>{
        
          setShowCheckboxes(!showCheckboxes);
          setCheckboxColumn('raisdeby');
        }
        }),
      filterIcon: <DownOutlined />,
    filterDropdown: () => (
      <Menu>
      <Menu.Item >
        <Input prefix={<SearchOutlined />}
          placeholder="Search..."
          variant="borderless"
          onChange={(e) => setSelectSearchRaisedDropdown(e.target.value)}
          value={selectSearchRaisedDropdown}
          className="issue-raised-dropdown"
          
        /><CloseCircleOutlined className="issue-raised-dropdown-close"  onClick={handleClearButtomClick}  />
      </Menu.Item>
      <Divider className="issue-raised-dropdown-divider"/>
      {filteredRaisedbyMenuItem.map((item, index) => (
        <Menu.Item key={item} >
          <Checkbox onChange={(e) => handleRaisedByChange(item, e.target.checked)}
          checked={selectRaisedBy.includes(item)} 
          >
            {item}
          </Checkbox>
        </Menu.Item>
      ))}
      
    </Menu>  
     
  ),
 
      // <Menu>
      //   <Menu.Item><Search style={{width:"100px"}} /></Menu.Item>
      //   <Menu.Item placeholder= "Darlen" key="Darlene"  >
      //     <Checkbox onChange={(e) => handleRaisedByChange('Darlene', e.target.checked)}>Darlene</Checkbox>
      //   </Menu.Item>
      //   <Menu.Item key="Floyd"  >
      //     <Checkbox onChange={(e) => handleRaisedByChange('Floyd', e.target.checked)}>Floyd</Checkbox>
      //   </Menu.Item>
      //   <Menu.Item key="Angela"  >
      //     <Checkbox onChange={(e) => handleRaisedByChange('Angela', e.target.checked)}>Angela</Checkbox>
      //   </Menu.Item>
      //   <Menu.Item key="Benny" >
      //     <Checkbox onChange={(e) => handleRaisedByChange('Benny', e.target.checked)}>Benny</Checkbox>
      //   </Menu.Item>
      // </Menu>
    
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
        <Menu.Item key="Critical">
          <Checkbox onChange={(e) => handleSeverityChange('Critical', e.target.checked)}>Critical</Checkbox>
        </Menu.Item>
        <Menu.Item key="High">
          <Checkbox onChange={(e) => handleSeverityChange('High', e.target.checked)}>High</Checkbox>
        </Menu.Item>
        <Menu.Item key="Medium">
          <Checkbox onChange={(e) => handleSeverityChange('Medium', e.target.checked)}>Medium</Checkbox>
        </Menu.Item>
        <Menu.Item key="Low">
          <Checkbox onChange={(e) => handleSeverityChange('Low', e.target.checked)}>Low</Checkbox>
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
          <Menu.Item key="Critical">
            <Checkbox onChange={(e) => handlePriorityChange('Critical', e.target.checked)}>Critical</Checkbox>
          </Menu.Item>
          <Menu.Item key="High">
            <Checkbox onChange={(e) => handlePriorityChange('High', e.target.checked)}>High</Checkbox>
          </Menu.Item>
          <Menu.Item key="Medium">
            <Checkbox onChange={(e) => handlePriorityChange('Medium', e.target.checked)}>Medium</Checkbox>
          </Menu.Item>
          <Menu.Item key="Low">
            <Checkbox onChange={(e) => handlePriorityChange('Low', e.target.checked)}>Low</Checkbox>
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
            <Menu.Item key="Open">
              <Checkbox onChange={(e) => handleStatusChange('Open', e.target.checked)}>Open</Checkbox>
            </Menu.Item>
            <Menu.Item key="Fix">
              <Checkbox onChange={(e) => handleStatusChange('Fix', e.target.checked)}>Fix</Checkbox>
            </Menu.Item>
            <Menu.Item key="Close">
              <Checkbox onChange={(e) => handleStatusChange('Close', e.target.checked)}>Close</Checkbox>
            </Menu.Item>
            <Menu.Item key="Reopen">
              <Checkbox onChange={(e) => handleStatusChange('Reopen', e.target.checked)}>Reopen</Checkbox>
            </Menu.Item>
            <Menu.Item key="In Process">
              <Checkbox onChange={(e) => handleStatusChange('In Process', e.target.checked)}>In Progress</Checkbox>
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
              let color = products.length > 11 ? "grey" : "blue";
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
      <Menu.Item>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search..."
          variant="borderless"
          onChange={(e) => setSelectSearchProductDropdown(e.target.value)}
          value={selectSearchProducrDropdown}
          className="issue-raised-dropdown"
        /><CloseCircleOutlined className="issue-raised-dropdown-close" onClick={handleProductClearButton}/>
      </Menu.Item>
      <Divider className="issue-raised-dropdown-divider"/>
      {filteredProductMenuItem.map((item, index) => (
        <Menu.Item key={item}>
          <Checkbox onChange={(e) => handleProductChange(item, e.target.checked)}
          checked={selectedProduct.includes(item)}>
            {item}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
          // <Menu>
          //   <Menu.Item><Search style={{width:"100px"}}/></Menu.Item>
          //   <Menu.Item key="Procurement">              
          //     <Checkbox onChange={(e) => handleProductChange('Procurement', e.target.checked)}>Procurement</Checkbox>
          //   </Menu.Item>
          //   <Menu.Item key="App Kube">
          //     <Checkbox onChange={(e) => handleProductChange('App Kube', e.target.checked)}>App Kube</Checkbox>
          //   </Menu.Item>
          //   <Menu.Item key="HRMS">
          //     <Checkbox onChange={(e) => handleProductChange('HRMS', e.target.checked)}>HRMS</Checkbox>
          //   </Menu.Item>
          //   <Menu.Item key="Xformation">
          //     <Checkbox onChange={(e) => handleProductChange('Xformation', e.target.checked)}>Xformation</Checkbox>
          //   </Menu.Item>
          //   <Menu.Item key="EMS">
          //     <Checkbox onChange={(e) => handleProductChange('EMS', e.target.checked)}>EMS</Checkbox>
          //   </Menu.Item>
          // </Menu>
        ), 
      },
      {
        title: 'Assignee to',
        key: 'assigneeto',
        dataIndex: 'assigneeto',
        filterIcon: <DownOutlined />,
        filterDropdown: () => (
          <Menu>
      <Menu.Item>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search..."
          variant="borderless"
          onChange={(e) => setSelectSearchAssigneeto(e.target.value)}
          value={selectSearchAssigneeto}
          className="issue-raised-dropdown"
        /><CloseCircleOutlined className="issue-raised-dropdown-close" onClick={handleAssigneetoClearButton}/>
      </Menu.Item>
      <Divider className="issue-raised-dropdown-divider"/>
      {filteredAssigneetoMenuItem.map((item, index) => (
        <Menu.Item key={item}>
          <Checkbox onChange={(e) => handleAssigneetoChange(item, e.target.checked)}
          checked={selectedAssigneeto.includes(item)}>
            {item}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
          // <Menu>
          //   <Menu.Item><Search style={{width:"100px"}}/></Menu.Item>
          //   <Menu.Item key="Floyd">              
          //     <Checkbox onChange={(e) => handleAssigneetoChange('Floyd', e.target.checked)}>Floyd</Checkbox>
          //   </Menu.Item>
          //   <Menu.Item key="Mob">
          //     <Checkbox onChange={(e) => handleAssigneetoChange('Mob', e.target.checked)}>Mob</Checkbox>
          //   </Menu.Item>
          //   <Menu.Item key="Angela Moss">
          //     <Checkbox onChange={(e) => handleAssigneetoChange('Angela Moss', e.target.checked)}>Angela Moss</Checkbox>
          //   </Menu.Item>
          //   </Menu>
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
          <Menu style={{ display: dropdownVisible ? 'block' : 'none' }}>
         
      <Menu.Item >
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search..."
          variant="borderless"
          onClick={handleInputClick}
          onChange={(e) => setSelectSearchModuleDropdown(e.target.value)}
          value={selectSearchModuleDropdown}
          className="issue-raised-dropdown"
        /><CloseCircleOutlined className="issue-raised-dropdown-close" 
        onClick={()=>{handleModuleClearButton(); setDropdownVisible(false)}} />
      </Menu.Item>     
      <Divider className="issue-raised-dropdown-divider"/>
      {filteredModuleMenuItem.map((item, index) => (
        <Menu.Item key={item}>
          <Checkbox onChange={(e) => handleModuleChange(item, e.target.checked)}
          checked={selectedModule.includes(item)}>
            {item}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
          // <Menu>
          //   <Menu.Item><Search style={{width:"100px"}}/></Menu.Item>
          //   <Menu.Item key="Backend">              
          //     <Checkbox onChange={(e) => handleModuleChange('Backend', e.target.checked)}>Backend</Checkbox>
          //   </Menu.Item>
          //   <Menu.Item key="Fronted">
          //     <Checkbox onChange={(e) => handleModuleChange('Fronted', e.target.checked)}>Fronted</Checkbox>
          //   </Menu.Item>
          //   <Menu.Item key="Designer">
          //     <Checkbox onChange={(e) => handleModuleChange('Designers', e.target.checked)}>Designers</Checkbox>
          //   </Menu.Item>
          //   </Menu>
        ),
        // sorter: (a, b) => a.module - b.module,
      }
      ];
      
      // function IssueList (){
 


       const [currentPage, setCurrentPage]= useState(1)
       const recordsPerPage = 5;
       const lastIndex = currentPage * recordsPerPage;
       const firstIndex = lastIndex-recordsPerPage;
       const records = tableData.slice(firstIndex, lastIndex);
       const npage = Math.ceil(tableData.length / recordsPerPage);
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
          <Tabs activeKey={selectDefectId} onChange={(key)=>setSelectDefectId([key])}  className="add-another-handler-dropdown-dsply-lbl">
            {selectDefectId.map((key, index) => (
              <TabPane tab={renderTabTitle(key)} key={index} >
               {/* { <IssueReport/>} */}
               {renderContent(key)}
              </TabPane>
              ))}
          </Tabs> 
          {/* <Modal
          title="Defect Details"
          visible={modalVisible}
          onCancel={handleModalClose}
          footer={null}>
            <IssueReport/>
          </Modal> */}
              
            <div className="table-header">
             <Search onChange={(e)=> handleSearch(e.target.value)}
      placeholder="input search text"
       style={{
        width: 300,
        float: "left",
        marginBottom:20,
      }}
    />
    <Link to ="/issueList/adddefect" exact>
    <Button className="menu-button" type="primary" icon={<PlusOutlined />}>
      Add Defect
    </Button>
    </Link>
    <Dropdown className="dropdown-menu" 
    overlay={
      <Menu>
        <Search style={{width:"100px", margin:"10px", marginLeft:'20px'}}/>
        {items.map(item => (
          <Menu.Item key={item.key}>
            <Checkbox onChange={(e) => handleProductChange(item.label, e.target.checked)}>
              {item.label}
            </Checkbox>
          </Menu.Item>
        ))}
      </Menu>
    }
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
        // pagination={{
        //   current: page,
        //   pageSize:pageSize,
        //   total:500,
        //   onChange:(page, pageSize)=>{
        //     setPage(page);
        //     setPageSize(pageSize)
            
        //   }
        // }}
        dataSource={records}
        Key='defectid'
        bordered
    size="middle"
    scroll={{
      x: 'calc(700px + 50%)'
     
    }}        
      />
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

