import React from "react";
import { gql } from "apollo-boost";
import { Query, Mutation } from "react-apollo";

import client from '../utils/ApolloClient';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {name: '', address: '', phone_number: ''};

    if(props.match && props.match.params && props.match.params.id){
      client.query({ query: gql`
        {
          contact(id: "${props.match.params.id}") {
            id
            name
            address
            phone_number
          }
        }
        `
      })
      .then(({ data }) => {
        const {id, name, address, phone_number} = data.contact;
        this.setState({id, name, address, phone_number});
      });
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  render() {
    const addContact = gql`
      mutation addContact($name: String!, $address: String!, $phone_number: String!) {
          addContact(name: $name, address: $address, phone_number: $phone_number) {
              id,
              name
          }
      }
    `;

    const editContact = gql`
      mutation editContact($id: String!, $name: String!, $address: String!, $phone_number: String!) {
          editContact(id: $id, name: $name, address: $address, phone_number: $phone_number) {
              id
              name
          }
      }
    `;

    const mutation = this.state.id ? editContact : addContact;

    return (
      <Mutation mutation={mutation}>
        {(action, { data }) => (
          <div>
            <h1>{this.state.id ? 'Edit' : 'New'} Contact</h1>
            <form onSubmit={e => {
                e.preventDefault();
                action({ variables: this.state });
                window.location.href = '/contacts';
              }}>
              <label>
                Name:
                <input name="name" value={this.state.name} onChange={this.handleInputChange}/><br/>
              </label>
              <label>
                Address:
                <input name="address" value={this.state.address} onChange={this.handleInputChange}/><br/>
              </label>
              <label>
                Phone Nb:
                <input name="phone_number" value={this.state.phone_number} onChange={this.handleInputChange}/><br/>
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default ContactForm;
