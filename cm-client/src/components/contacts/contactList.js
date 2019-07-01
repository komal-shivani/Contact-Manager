import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeContact} from '../../action/a-contacts'


class ContactList extends React.Component{
    constructor(){
        super()
       
    }
    
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
        }
    }
    render(){
        return(
            <div>
                <h3>Listing Contacts:{this.props.contacts.length}</h3>
                <ul>
                    { this.props.contacts.map((contact)=>{
                        return <li key={contact._id}>
                            <Link to={`/contacts/${contact._id}`}>{contact.name}</Link><button onClick={()=>{this.handleRemove(contact)}}>Delete</button>
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