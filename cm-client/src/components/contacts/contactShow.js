import React from "react";
// import ReactDOM from 'react-dom'
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import {removeContact} from '../../action/a-contacts'

class ContactShow extends React.Component {
  constructor() {
    super();
  }
  // componentDidMount(){
  //     const id=this.props.match.params.id
  //     axios.get(`http://localhost:3005/contacts/${id}`,{
  //         headers:{
  //             'x-auth':localStorage.getItem('userAuthToken')
  //         }
  //     })
  //     .then(response=>{
  //         // console.date(response.data)
  //         this.setState(()=>({
  //             contact:response.data

  //         }))
  //     })
  // }

  // handleRemove=(contact)=>{
  //     const confirmRemove=window.confirm('are you sure?')
  //     if(confirmRemove){
  //         axios.delete(`http://localhost:3005/contacts/${contact._id}`,{
  //             headers:{
  //                 'x-auth':localStorage.getItem('userAuthToken')
  //             }
  //         })
  //         .then(()=>{
  //             this.props.dispatch(removeContact(contact))
  //            this.props.history.push('/contacts')
  //         })
  //     }
  // }

  render() {
    return (
      <div>
        {this.props.contact && (
          <div>
            <h3>{this.props.contact.name}</h3>
            <p>{this.props.contact.email}</p>
            <p>{this.props.contact.number}</p>
          </div>
        )}

        <Link to="/contacts">back</Link>
        <br />
        <Link to={`/contacts/edit/${this.props.match.params.id}`}>Edit</Link>

        {/* <button onClick={this.handleRemove(contact)}>Delete</button> */}
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    // contacts:state.contacts,
    contact: state.contacts.find(contact => {
      return contact._id === props.match.params.id;
    })
  };
};

export default connect(mapStateToProps)(ContactShow);
