import React from 'react'

class ContactForm extends React.Component{
    constructor(){
        super()
            this.state={
                name:'',
                email:'',
                number:''   
        }
    }
    handleInput=(e)=>{
        e.persist()
            this.setState(()=>({
                [e.target.name]:e.target.value
            }))
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name,
            email:this.state.email,
            number:this.state.number
        }
        this.props.handleSubmit(formData) 
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label> Name:
                        <input type="text" value={this.state.name}
                        onChange={this.handleInput} name="name"/>
                    </label>
                    <br/><br/>
                    
                    <label>Email:
                        <input type="email" value={this.state.email}
                        onChange={this.handleInput} name="email"/>
                    </label>
                    <br/><br/>

                    <label> Number:
                        <input type="number" value={this.state.number}
                        onChange={this.handleInput} name="number"/>
                    </label>
                    <br/><br/>

                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default ContactForm