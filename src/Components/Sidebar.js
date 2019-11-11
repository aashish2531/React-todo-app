import React, {Component} from 'react'
import {Link} from 'react-router-dom'
class Sidebar extends Component{
    render(){
        return(
            <div className="w3-sidebar w3-light-grey w3-bar-block" >
                <h3 className="w3-bar-item">Menu</h3>
                <Link to = "/addData" className="w3-bar-item w3-button">Add Data</Link>
                <Link to = "/dataList" className="w3-bar-item w3-button">All Tasks</Link>
                <Link to = "/todayTask" className="w3-bar-item w3-button">Today's Task</Link>
            </div>
        )
    }
}
export default Sidebar