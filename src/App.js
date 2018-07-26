import React, { Component } from 'react';
import {PackProvider} from "./pack/PackProvider";
import {Route, Switch} from "react-router-dom";


class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" render={() => (
              <form action="/draft" type="GET">
                <label htmlFor="username" >Enter username:</label>
                <input name="username" />
                <button type="submit">Join</button>
              </form>
            )}
          />

          <Route path="/draft" render={() => (
              <PackProvider untapClient={this.props.untapClient} />
            )}
          />
        </Switch>
    );
  }
}

export default App;
