import React from 'react'
import axios from '../../config/axios-config'
import { connect } from 'react-redux'
import { setUser } from '../../action/a-users'

class Account extends React.Component {

    componentDidMount() {
        axios.get('/users/account', {
            headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
            .then(response => {
                console.log(response.data)
                const user = response.data
                this.props.dispatch(setUser(user))
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h2>User Account</h2>
                <p>{this.props.user.username}</p>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Account)

















