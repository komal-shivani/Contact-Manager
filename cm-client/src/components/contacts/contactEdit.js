import React from 'react'
import axios from 'axios'

import ContactForm from './contactForm'

class ContactEdit extends React.Component{
    constructor(){
        super()
            this.state={
                contact:{}
            }
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`http://localhost:3005/contacts/${id}`,{
            headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
       .then(response=>{
           this.setState(()=>({
               contact:response.data
           }))
       })
    }
    handleSubmit=(formData)=>{
        axios.put(`http://localhost:3005/contacts/${this.state.contact._id}`,formData,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('error')){
                console.log(response.data.errors)
            }else{
                this.props.history.push(`/contacts/${response.data._id}`)
            }
        })
    }
    render(){
        return(
            <div>
                <h2>Edit Contacts</h2>
                <ContactForm handleSubmit={this.handleSubmit} contact={this.state.contact}/>
            </div>
        )
    }
}

export default ContactEdit