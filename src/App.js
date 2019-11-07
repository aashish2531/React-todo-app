import React from 'react';
import logo from './logo.svg';
import './App.css';
import Footer from './Components/Footer'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import AddData from './Components/AddData';
import DataList from './Components/DataList';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' 
import UpdateData from './Components/UpdateData';
import TodayTask from './Components/TodayTask';
function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Sidebar/>
        <Switch className="">
        <Route path="/addData" component = {AddData}/>
        <Route path="/dataList" component = {DataList}/>
        <Route path="/todayTask" component = {TodayTask}/>
        <Route path="/updateData/:id" component = {UpdateData}/>
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
