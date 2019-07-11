import React from 'react'
import axios from '../../config/axios-config'
import { connect } from 'react-redux'
import { resetUser } from '../../action/a-users';

class Logout extends React.Component {

    componentDidMount() {
        axios.delete('/users/logout', {
            headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
            .then(response => {
                console.log(response.data)
                localStorage.removeItem('userAuthToken')
                this.props.dispatch(resetUser())
                this.props.history.push('/users/login')
            })

    }

    render() {
        return (
            <p>{this.props.user.username} is logging out..</p>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Logout)



