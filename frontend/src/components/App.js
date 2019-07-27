import React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import client from '../utils/ApolloClient';

import CatBrowser from './CatBrowser';
import ContactBrowser from './ContactBrowser';
import CatForm from './CatForm';
import ContactForm from './ContactForm';


function AppRouter() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Cats</Link>
              </li>
              <li>
                <Link to="/contacts">Contacts</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={CatBrowser} />
          <Route path="/contacts" exact component={ContactBrowser} />
          <Route path="/cats/new" component={CatForm} />
          <Route path="/cats/edit/:id" component={CatForm} />
          <Route path="/contacts/new" component={ContactForm} />
          <Route path="/contacts/edit/:id" component={ContactForm} />
      </Router>
    </ApolloProvider>
  );
}

export default AppRouter;
