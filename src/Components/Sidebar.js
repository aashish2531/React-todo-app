import React, {Component} from 'react'
import {Link} from 'react-router-dom'
class Sidebar extends Component{
    render(){
        return(
            <div className="w3-sidebar w3-light-grey w3-bar-block" >
                <h3 className="w3-bar-item">Menu</h3>
                <Link to = "/addData">
                <a className="w3-bar-item w3-button">Add Data</a>         
                </Link>
                <Link to = "/dataList">
                <a className="w3-bar-item w3-button">All Tasks</a>
                </Link>
                <Link to = "/todayTask">
                <a className="w3-bar-item w3-button">Today's Task</a>
                </Link>
            </div>
        )
    }
}
export default Sidebar