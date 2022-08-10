/*eslint-disable*/
import React, { useReducer, useState } from 'react';
import { Row } from 'react-bootstrap';
import { Button, Drawer, Space } from 'antd';
import Select from "react-select";
import axios from "axios";
import 'antd/dist/antd.css';
import "./Home.scss"


const Home = () => {

  const [visible, setVisible] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [status, setStatus] = useState([])
  const [value, setValue] = useState([]);
  const [render, setRender] = useReducer(x => x + 1, 0)
  const [addedDrop, setAddedDrop] = useState([])
  const [data, setData] = useState(true)
  // const [firstName, setFirstName] = useState("")
  // const [lastName, setLastName] = useState("")
  // const [gender, setGender] = useState("")
  // const [age, setAge] = useState("")
  // const [accountName, setAccountName] = useState("")
  // const [city, setCity] = useState("")
  // const [state, setState] = useState("")

  const schemaType = [
    { label: " First Name", value: "first_name" },
    { label: "Last Name", value: " last_name" },
    { label: " Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" }
  ]

  //filter selected segment
  const newArray = value.filter(val => !addedDrop?.includes(val));
  const results = schemaType.filter(({ value: id1 }) => !newArray.some(({ value: id2 }) => id2 === id1));

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onName = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9 ]*$'))
      setSegmentName(e.target.value)
  };

  const onStatus = (item) => {
    setStatus(item)
  };

  const addNewSchema = () => {
    if(status.length !== 0){
    value.push(status)
    //setData(false)
    }
    setRender()
  };

  const onAddedDrop = (values, index, item) => {
    addedDrop.push(values)
    value.splice(index, 0, item)
    results.push(value)
    setRender()
  }
  
  const onReset =()=>{
    setValue([]);
    setAddedDrop([]);
  }

  const onSave = async () => {

  //   setFirstName(newArray.find(e => e.label === " First Name")?.label);
  // setLastName( newArray.find(e => e.label === "Last Name")?.label ) ;
  // setGender( newArray.find(e => e.label === " Gender")?.label);
  // setAge( newArray.find(e => e.label ===  "Age")?.label );
  // setAccountName( newArray.find(e => e.label ===  "Account Name")?.label);
  // setCity(newArray.find(e => e.label === "City")?.label);
  // setState( newArray.find(e => e.label === "State")?.label);
    return await axios
      .post("https://hooks.zapier.com/hooks/catch/13130040/bqx5ltk/", {
        segment_name: segmentName,
        schema: [
          {first_name: newArray.find(e => e.label === " First Name")?.label || ""},
          {last_name: newArray.find(e => e.label === "Last Name")?.label || "" },
          {gender: newArray.find(e => e.label === " Gender")?.label || ""},
          {age: newArray.find(e => e.label ===  "Age")?.label || ""},
          {account_name: newArray.find(e => e.label ===  "Account Name")?.label || ""},
          {city: newArray.find(e => e.label === "City")?.label || ""},
          {state: newArray.find(e => e.label === "State")?.label || ""}, 
          
          
          // {first_name: firstName},
          // {last_name:lastName},
          // {gender:gender},
          // {age: age},
          // {account_name: accountName},
          // {city:city},
          // {state: state},
       
        ],
      })
      .then((res) => (console.log(res)))
  };

  return (
    <div>
      <Button className='home-btn' type="primary" onClick={showDrawer}>
        Save Segment
      </Button>
      <Drawer
        title="Saving Segment"
        width={520}
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div className='segment-body'>
          <Row> <label className="name-label">Enter The Name Of The Segment </label></Row>
          <Row >
            <input
              type="text"
              placeholder="Name Of The Segment"
              className="name-input"
              value={segmentName}
              onChange={onName}
              maxLength={30}
            />
          </Row>
          <Row>
            <div>
              <p className='para'>
                To save your segment, you need to add the schemas to build the query
              </p>
            </div>
          </Row>
          <Row className='circle'>
            <div className='dot'><span className=" user-traits"></span>-user Traits</div>
           <div className='dot'><span className =" group-traits"></span>-Group Traits</div> 
          </Row>
          {newArray && newArray.length !== 0 && <div className='segment-box'>
            {newArray && newArray.map((item, index) => <Row>
              <div >
                <Select
                  name={item.label}
                  placeholder={item.label}
                  onChange={(value) => onAddedDrop(item, index, value)}
                  isSearchable={false}
                  options={results}
                />
              </div>
            </Row>)}
          </div>}
          <Row >
            <Select
              name="Add schema to segment"
              placeholder="Add schema to segment"
              className='add-drop'
              onChange={onStatus}
              options={results}
              isSearchable={false}
              isDisabled={!results.length ? true : false}
              isClearable
            />
          </Row>
          {!results.length&& <Row>
          <Button className='save-btn' onClick={onReset}>
              Reset
            </Button>
          </Row>}
          <Row>
            <div className='add-btn' onClick={addNewSchema}>+Add New schema</div>
          </Row>
        </div>
        <Row className='row-footer'>
          <div className='footer'> <Space>
            <Button className='save-btn' onClick={onSave}>
              Save The Segment
            </Button>
            <Button className='cancel-btn' onClick={onClose}>Cancel</Button>

          </Space></div>
        </Row>
      </Drawer>
    </div>
  );
};

export default Home;