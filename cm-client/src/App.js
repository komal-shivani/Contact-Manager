import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Link,Switch,Route } from 'react-router-dom'
import _ from 'lodash'

import Register from './components/authenctication/register'
import Login from './components/authenctication/login'
import Account from './components/authenctication/account'
import Logout from './components/authenctication/logout'
import ContactList from './components/contacts/contactList'
import ContactShow from './components/contacts/contactShow'
import ContactNew from './components/contacts/contactNew'
import ContactEdit from './components/contacts/contactEdit'

class App extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                    <h1>Contact Manager</h1>
                    <div >
                        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                            <ul class="nav justify-content-end">
                    { _.isEmpty(this.props.user)?(
                                    <div>
                            <li class="nav-item"><Link to="/users/register">Register</Link></li>
                            <li class="nav-item"><Link to="/users/login">Login</Link></li>
                        </div>
                    
                    ):(
                        <div>
                            <li class="nav-item"><Link to="/users/account">Account</Link></li>
                            <li class="nav-item"><Link to="/users/logout">Logout</Link></li>
                            <li class="nav-item"><Link to='/contacts'>contacts</Link></li>
                        </div>
                    )}
                      
                </ul>
                        </nav>
                </div>
                
                 

                    <Switch>
                        <Route path="/users/account" component={Account} exact/>
                        <Route path="/users/logout" component={Logout} exact />
                        <Route path="/users/register" component={Register} exact/>
                        <Route path="/users/login" component={Login}exact />
                        <Route path='/contacts' component={ContactList} exact={true} />
                        <Route path='/contacts/new' component={ContactNew} exact/>
                        <Route path='/contacts/edit/:id' component={ContactEdit} exact />
                        <Route path='/contacts/:id' component={ContactShow} exact/>
                    </Switch>
                   
            </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        user:state.user
    } 
}

export default connect(mapStateToProps)(App)

   
    
