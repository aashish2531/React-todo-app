import React, { Component } from 'react'
import axios from 'axios'

class UpdateData extends Component {

    state = {
        name: '',
        description: '',
        dueDate: '',
        priority: '',
        _id:''
    }
  
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`https://todo-app-apis.herokuapp.com/task/${id}`)
            .then(response => {
                this.setState({ name: response.data.name, description: response.data.description, dueDate: response.data.dueDate, priority: response.data.priority })
            })
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleEdit = (e) => {
        e.preventDefault()
        const clear_obj = Object.assign({},this.state);
            for(let key in clear_obj){
            clear_obj[key] = '';
            }
        const id = this.props.match.params.id
     
        const formData = {
              name: this.state.name,
              description: this.state.description,
              dueDate: this.state.dueDate,
              priority: this.state.priority
          }
          axios.put(`https://todo-app-apis.herokuapp.com/task/${id}`,formData)
              .then(response => {  
                alert("Data updated Sucessfully !")
                this.setState(clear_obj);
                this.props.history.push("/dataList")
                  // this.setState({ posts: response.data });
              })
              .catch(error => {
                  alert("Error")
              });
      }

    render() {
        const { name, description, dueDate, priority } = this.state
        return (
            <div className="ml30" >
                <h2 className="mb20">Updating Tasks...</h2>
                <form id="create-course-form"  onSubmit={this.handleEdit}>
                    <div className="form-group">
                        <label className="control-label col-sm-1">Name:</label>
                        <div className="col-sm-11">
                            <input className="form-control" type="text" placeholder="Enter Name..." name="name" value={name} onChange={this.changeHandler} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-1">Description:</label>
                        <div className="col-sm-11">
                            <input className="form-control" type="text" placeholder="Enter Description..." name="description" value={description} onChange={this.changeHandler} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-1">Due Date:</label>
                        <div className="col-sm-11">
                            <input className="form-control" type="date"   placeholder="Enter Date..." name="dueDate" value={
                                dueDate.substring(0,10)
                                } onChange={this.changeHandler} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-1">Priority:</label>
                        <div className="col-sm-11">
                            <input className="form-control" placeholder="Enter Priority..." type="number" name="priority" value={priority} onChange={this.changeHandler} />
                        </div>
                    </div>
                    <button className="btn" type="submit" onClick = {this.cancelCourse}>Submit</button>

                </form>
                
            </div>
        )
    }

}
export default UpdateData