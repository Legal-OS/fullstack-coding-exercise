import React from "react";
import { gql } from "apollo-boost";
import { Query, Mutation } from "react-apollo";

class ContactBrowser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Query
      query={gql`
        {
          contacts {
            id
            name
            address
            phone_number
            cats_picked {
              id
              name
            }
            cats_dropped {
              id
              name
            }
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return (
          <div>
            <h1>Contacts</h1>
            <a href="/contacts/new">add</a>
            <table border="1" width="80%">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Address</td>
                  <td>Phone Number</td>
                  <td>Dropped Cats</td>
                  <td>Picked Cats</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {data.contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.name}</td>
                    <td>{contact.address}</td>
                    <td>{contact.phone_number}</td>
                    <td>{contact.cats_dropped.map(cat => <a href={`/cats/edit/${cat.id}`}>{cat.name}<br/></a>) || 'none'}</td>
                    <td>{contact.cats_picked.map(cat => <a href={`/cats/edit/${cat.id}`}>{cat.name}<br/></a>) || 'none'}</td>
                    <td>
                      <a href={`/contacts/edit/${contact.id}`}>edit</a><br/>
                      <Mutation mutation={gql`
                        mutation deleteContact($id: String!){
                          deleteContact(id: $id) {
                            id
                          }
                        }`}>
                        {(deleteContact, { data }) => (
                          <a href="#" onClick={e => {
                            e.preventDefault();
                            deleteContact({variables: { id: contact.id }})
                            window.location.reload();
                          }}>
                            delete
                          </a>
                        )}
                      </Mutation>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }}
    </Query>;
  }
}

export default ContactBrowser;
