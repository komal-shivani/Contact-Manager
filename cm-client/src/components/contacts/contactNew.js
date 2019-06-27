import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import ContactForm from './contactForm'
import {connect} from 'react-redux'
import { addContact } from '../../action/a-contacts';

class ContactNew extends React.Component{
    constructor(){
        super()
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit(formData){
        console.log(formData)
        axios.post(`http://localhost:3005/contacts`,formData,{
            headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
            const contact=response.data
            this.props.dispatch(addContact(contact))
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
            } else {
                this.props.history.push(`/contacts/${response.data._id}`)
            } 
        })
    }
    render(){
        return(
            <div>
               <ContactForm handleSubmit={this.handleSubmit}/><br/>

               <Link to='/contacts'>Back</Link>
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
export default connect(mapStateToProps)(ContactNew) 