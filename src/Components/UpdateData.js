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

    // handleEdit = (id) => {
        
    //   const formData = {
    //         name: this.state.name,
    //         description: this.state.description,
    //         dueDate: this.state.dueDate,
    //         priority: this.state.priority
    //     }
    //     alert("i am here")
    //     axios.put(`https://todo-app-apis.herokuapp.com/task/${id}`,formData)
    //         .then(response => {  
    //             // this.setState({ posts: response.data });
    //         })
    //         .catch(error => {
    //             alert("Error")
    //         });
    // }

    handleEdit = (e) => {
        e.preventDefault()
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
                  // this.setState({ posts: response.data });
              })
              .catch(error => {
                  alert("Error")
              });
      }

    // onSubmit=(formData)=>{

    //     this.props.handleEdit(this.props.match.params._id, formData)
    // }

    render() {
        const { posts, errorMsg, name, description, dueDate, priority, _id } = this.state
        return (
            <div className="ml30" >
                <h2 className="mb20">Updating Tasks...</h2>
                <form  onSubmit={this.handleEdit}>
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
                            <input className="form-control" type="date" format=' dd/mm/yyyy'  placeholder="Enter Date..." name="dueDate" value={dueDate} onChange={this.changeHandler} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-1">Priority:</label>
                        <div className="col-sm-11">
                            <input className="form-control" placeholder="Enter Priority..." type="number" name="priority" value={priority} onChange={this.changeHandler} />
                        </div>
                    </div>
                    <button className="btn" type="submit">Submit</button>

                </form>
                
            </div>
        )
    }

}
export default UpdateData