import React from "react";
import { gql } from "apollo-boost";
import { Query, Mutation } from "react-apollo";

class CatBrowser extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hidePickedCats: false };
    this.toggleHidePickedCats = this.toggleHidePickedCats.bind(this);
  }

  toggleHidePickedCats(e){
    this.setState({ hidePickedCats: e.target.checked })
    this.forceUpdate();
  }

  render() {
    return (
        <Query
        query={gql`
          {
            cats {
              id
              name
              breed
              gender
              dob
              dropped {
                name
              }
              picked {
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
             <h1>Cats</h1>
             <a href="/cats/new">add</a><br/>
             <label>
               Hide Picked Cats
               <input type="checkbox" checked={this.state.hidePickedCats} onChange={this.toggleHidePickedCats} />
             </label>
             <table border="1" width="80%">
               <thead>
                 <tr>
                   <td>Name</td>
                   <td>Breed</td>
                   <td>Gender</td>
                   <td>Date of Birth</td>
                   <td>Dropped By</td>
                   <td>Picked By</td>
                   <td>Actions</td>
                 </tr>
               </thead>
               <tbody>
                 {data.cats.map((cat) => {
                   if (this.state.hidePickedCats && cat.picked.name) return;
                   return (
                   <tr key={cat.id} id={cat.id}>
                     <td>{cat.name}</td>
                     <td>{cat.breed}</td>
                     <td>{cat.gender}</td>
                     <td>{cat.dob}</td>
                     <td>{cat.dropped.name}</td>
                     <td>{cat.picked.name}</td>
                     <td>
                       <a href={`/cats/edit/${cat.id}`}>edit</a><br/>
                       <Mutation mutation={gql`
                         mutation deleteCat($id: String!){
                           deleteCat(id: $id) {
                             id
                           }
                         }`}>
                         {(deleteCat, { data }) => (
                           <a href="#" onClick={e => {
                             e.preventDefault();
                             deleteCat({variables: { id: cat.id }})
                             window.location.reload();
                           }}>
                             delete
                           </a>
                         )}
                       </Mutation>
                     </td>
                   </tr>
                 )})}
               </tbody>
             </table>
           </div>
         );
        }}
      </Query>
    );
  }
}

export default CatBrowser;
