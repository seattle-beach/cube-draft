import React, { Component } from 'react';
import {PackProvider} from "./pack/PackProvider";


class App extends Component {
  render() {
    return (
      <PackProvider untapClient={this.props.untapClient} />
    );
  }
}

export default App;
