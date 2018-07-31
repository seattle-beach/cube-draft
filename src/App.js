import React, { Component } from 'react';
import {PackProvider} from "./pack/PackProvider";
import {Route, Switch} from "react-router-dom";
import {Join} from "./join/Join"
import {Draft} from "./draft/Draft"


class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" render={() => (
              <Join untapClient={this.props.untapClient} />
            )}
          />

          <Route path="/draft/:username" render={(props) => (
              <div>
                <Draft {...props}/>
                <PackProvider untapClient={this.props.untapClient} />
              </div>
            )}
          />
        </Switch>
    );
  }
}

export default App;
