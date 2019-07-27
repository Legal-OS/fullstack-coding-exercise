import React from "react";
import { gql } from "apollo-boost";
import { Query, Mutation } from "react-apollo";

import client from '../utils/ApolloClient';

class CatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', dob: '', breed: '', gender: 'm', picked_by: '', dropped_by: '', contacts: []};

    let catQuery = '';
    let isEditingCat = props.match && props.match.params && props.match.params.id;
    if(isEditingCat){
      catQuery = `
        cat(id: "${props.match.params.id}") {
          id
          name
          dob
          breed
          gender
          picked_by
          dropped_by
        }
      `
    }
    client.query({ query: gql`
      {
        ${catQuery}
        contacts {
          id
          name
        }
      }
      `
    }).then(({ data }) => {
      console.log(data)
      if (isEditingCat) {
        const {id, name, dob, breed, gender, picked_by, dropped_by} = data.cat;
        this.setState({id, name, dob, breed, gender, picked_by, dropped_by, contacts: data.contacts});
      } else {
        this.setState({contacts: data.contacts})
      }
    });



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
    const addCat = gql`
      mutation addCat($name: String!, $breed: String!, $dob: String!, $gender: String!, $picked_by: String!, $dropped_by: String!) {
          addCat(name: $name, breed: $breed, dob: $dob, gender: $gender, picked_by: $picked_by, dropped_by: $dropped_by) {
              id,
              name
          }
      }
    `;

    const editCat = gql`
      mutation editCat($id: String!, $name: String!, $breed: String!, $dob: String!, $gender: String!, $picked_by: String!, $dropped_by: String!) {
          editCat(id: $id, name: $name, breed: $breed, dob: $dob, gender: $gender, picked_by: $picked_by, dropped_by: $dropped_by) {
              id
              name
          }
      }
    `;

    const mutation = this.state.id ? editCat : addCat;

    return (
      <Mutation mutation={mutation}>
        {(action, { data }) => (
          <div>
            <h1>{this.state.id ? 'Edit' : 'New'} Cat</h1>
            <form onSubmit={e => {
                e.preventDefault();
                const {id, name, dob, breed, gender, picked_by, dropped_by} = this.state;
                action({ variables: {id, name, dob, breed, gender, picked_by: picked_by, dropped_by: dropped_by} });
                window.location.href = '/';
              }}>
              <label>
                Name:
                <input name="name" value={this.state.name} onChange={this.handleInputChange}/><br/>
              </label>
              <label>
                Birth day:
                <input name="dob" value={this.state.dob} onChange={this.handleInputChange} placeholder="mm/dd/yyyy"/><br/>
              </label>
              <label>
                Breed:
                <input name="breed" value={this.state.breed} onChange={this.handleInputChange}/><br/>
              </label>
              <label>
                Gender:
                <select name="gender" value={this.state.gender} onChange={this.handleInputChange}>
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                </select><br/>
              </label>
              <label>
                Dropped By:
                <select name="dropped_by" value={this.state.dropped_by} onChange={this.handleInputChange}>
                  <option value=""></option>
                  {this.state.contacts.map(contact =>
                    <option value={contact.id}>{contact.name}</option>
                  )}
                </select><br/>
              </label>
              <label>
                Picked By:
                <select name="picked_by" value={this.state.picked_by} onChange={this.handleInputChange}>
                  <option value=""></option>
                  {this.state.contacts.map(contact =>
                    <option value={contact.id}>{contact.name}</option>
                  )}
                </select><br/>
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CatForm;
