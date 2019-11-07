import React , {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class AddData extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            description: '',
            dueDate: '',
            priority: ''
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        axios.post('https://todo-app-apis.herokuapp.com/task', this.state)
        .then(response => {
            console.log(response)
            alert("Data Added Successfully ")
        })
        .catch(error => {
            console.log("error");
        })
    }


    render(){
        const { name, description, dueDate, priority} = this.state
        return(
            <div className="ml30">
               <h2 className="mb20">Add Todo Tasks Here...</h2>
                <form onSubmit = {this.submitHandler}>
                    <div className="form-group">
                    <label className="control-label col-sm-1">Name:</label>
                    <div className="col-sm-11">
                    <input className="form-control" type="text" placeholder="Enter Name..." name="name" value={name} onChange = {this.changeHandler}/> 
                    </div>  
                    </div>
                    <div className="form-group">
                    <label className="control-label col-sm-1">Description:</label>
                    <div className="col-sm-11">
                        <input className="form-control" type="text" placeholder="Enter Description..." name="description" value={description}  onChange = {this.changeHandler}/> 
                    </div>
                    </div>
                    <div className="form-group">
                    <label className="control-label col-sm-1">Due Date:</label>
                    <div className="col-sm-11">
                        <input className="form-control" type="date" placeholder="Enter Date..." name="dueDate" value={dueDate}  onChange = {this.changeHandler} /> 
                    </div>
                    </div>
                    <div className="form-group">
                    <label className="control-label col-sm-1">Priority:</label>
                    <div className="col-sm-11">
                        <input className="form-control" placeholder="Enter Priority..." type="number" name="priority" value={priority}  onChange = {this.changeHandler}/> 
                    </div>
                    </div>
                    <button className="btn" type="submit">Submit</button>
                    
                </form>
            </div>
        )
    }

}
export default AddData