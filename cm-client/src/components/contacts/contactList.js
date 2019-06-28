import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeContact, addContact, setContact} from '../../action/a-contacts'


class ContactList extends React.Component{
    constructor(){
        super()
       
    }
    // componentDidMount(){
    //     axios.get(`http://localhost:3005/contacts`,{
    //         headers:{
    //             'x-auth':localStorage.getItem('userAuthToken')
    //         }
    //     })
    //     .then(response=>{
    //         console.log(response.data)
          
    //     })
        
    // }
    
   handleRemove=(contact)=>{
        console.log(contact)
        const confirmRemove=window.confirm('Are You Sure?')
        if(confirmRemove){
            axios.delete(`http://localhost:3005/contacts/${contact._id}`,{
                headers: {
                    'x-auth':localStorage.getItem('userAuthToken')
                }
            })
            .then(response=>{
                this.props.dispatch(removeContact(response.data))
            })
            // .then(()=>{
            //     this.setState((prevState)=>({
            //         contacts:prevState.contacts.filter(contactItem=>{
            //             return contactItem._id!==contact._id
            //         })
            //     }))
            // })
        }
    }
    render(){
        return(
            <div>
                <h3>Listing Contacts:{this.props.contacts.length}</h3>
                <ul>
                    { this.props.contacts.map((contact)=>{
                        return <li key={contact._id}>
                        <Link to={`/contacts/${contact._id}`}>{contact.name}<button onClick={()=>{this.handleRemove(contact)}}>Delete</button></Link>
                        </li>
                    })}      
                </ul>
                <Link to="/contacts/new">Add contacts</Link> 

               

            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        user:state.user,
        contacts:state.contacts
    }
}
export default connect(mapStateToProps)(ContactList) 