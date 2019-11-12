import React, {Component} from 'react'
import axios from 'axios'

class TodayTask extends Component{

    constructor(props){
        super(props)

        this.state = {
            posts: [],
            startDate: new Date().toLocaleString("sv-SE",{year:"numeric",month:"2-digit", day:"2-digit"}),
            reRender: false

        }
        this.onchange = this.onchange.bind(this)
        this.onSort = this.onSort.bind(this)

    }
    onSort(event, sortKey){
        const data = this.state.posts;
        data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
        this.setState({data})
      }

    onchange = (e) => {
            this.setState({ search: e.target.value });
        }

    componentDidMount(){
        this.fetchData();
        
    }

    fetchData=()=>{
        axios.get('https://todo-app-apis.herokuapp.com/task')
        .then(response => {
            this.setState({posts: response.data})
        })
        .catch(error => {
            this.setState({errorMsg: "Error Retriving data"})
        })
    }

    deleteData(id){
        if (window.confirm("Delete the item?")) {
            axios.delete(`https://todo-app-apis.herokuapp.com/task/${id}`)
        .then(response => {
            if(response.data){
               
                this.fetchData();
            }
        })
        .catch(error => {
            console.log(error);
            this.setState({posts:[]})
            // alert("Data not removed")
        })
          }
    }
    handleEdit = (id, name, description, dueDate, priority) => {
        console.log( this.props)
        this.props.history.push(`/updateData/${id}`)
      }

      activeEdit = (post) => {
        const formData = {
            name: "Done",
            description: post.description,
            dueDate: post.dueDate.split("T")[0],
            priority: post.priority
        }
            alert("Done !")
            axios.put(`https://todo-app-apis.herokuapp.com/task/${post._id}`,formData)
            .then(response => {  
                if(response.data){
                    this.fetchData();
                 }
            //   alert("Data updated Sucessfully !")
             // this.setState({reRender: true})
                // this.setState({ posts: response.data });
            })
            .catch(error => {
                alert("Error")
                this.setState({posts: []})
            });
        
      }

    //   updateSearch(event){
    //       this.setState({search: event.target.value.substr(0,1)});
    //   }


    render(){
        //console.log(this.state)
        const {posts , errorMsg, startDate} = this.state

        const filteredClients = posts.filter( post =>{
            return post.dueDate.indexOf( startDate ) !== -1
            })

        return(
            <div className="ml30"> 
            <h2>Today's Tasks to do...</h2>
                <table >
                    <thead>
                    <tr>
                    <th onClick={e => this.onSort(e, 'name')} scope="col"><a href="#" class="sort-by">Name</a></th> 
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    </tr>
                    </thead> 
                    
                {
                    filteredClients.length ?
                    filteredClients.map((post, index) => 
                   
                        <tr key={post._id}>
                        <td>{post.name}</td>
                        <td>{post.description}</td>
                        <td>{post.dueDate.split("T")[0]}</td>
                        <td>{post.priority}</td>
                        <td><button className={ post.name === 'Done' ? 'btn btn-sm btn-light' : 'btn btn-sm btn-info'} onClick={() => this.activeEdit(post)}>{ post.name === 'Done' ? 'Inactive' : 'Active'}</button></td>                        
                      <td>  <button className="btn btn-primary btn-sm" onClick={() => this.handleEdit(post._id, post.name, post.description, post.dueDate, post.priority)}>Edit</button></td>
                        <td><button className="btn btn-danger btn-sm" onClick={ () => this.deleteData(post._id) }>Delete</button></td>
                        </tr>
                        
                    ) : null
                }
                {
                    errorMsg ? <div>{errorMsg}</div> : null
                }
                
                </table>
                </div>
        )
    }

    

}
export default TodayTask