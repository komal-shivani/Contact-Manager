import React from 'react'
import axios from 'axios'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }


    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password

        }
        //console.log(formData)

        axios.post('http://localhost:3005/users/register', formData)
            .then(response => {
                console.log(response.data)
                if (response.data.errors) {
                    alert(response.data.message)
                }
                else {
                    this.props.history.push('/users/login')
                }
            })
    }

    render() {
        //console.log(this.props)
        return (
            <div>
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username
                        <input type="text" value={this.state.username} name="username" onChange={this.handleChange} />
                    </label><br /><br />
                    <label>
                        Email
                        <input type="text" value={this.state.email} name="email" onChange={this.handleChange} />
                    </label><br /><br />
                    <label>
                        Password
                        <input type="password" value={this.state.password} name="password" onChange={this.handleChange} />
                    </label><br /><br />
                    <input type="submit" />
                </form>
            </div>

        )
    }
}

export default Register