import {createStore, combineReducers} from 'redux'
import usersReducer from '../reducers/r-users'
import contactsReducer from '../reducers/r-contacts'

const configureStore=()=>{
    const store=createStore(combineReducers({
        user:usersReducer,
        contacts:contactsReducer
    }))
    return store
}

export default configureStore

