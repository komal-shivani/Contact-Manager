import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


class ContactShow extends React.Component{
  
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
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    contact: state.contacts.find(contact => {
      return contact._id === props.match.params.id;
    })
  };
};

export default connect(mapStateToProps)(ContactShow);
