import React, { Component } from 'react';


class App extends Component {
  render() {
    return (
      <div>
        {this.props.untapClient.getPack().map(function(card, index) {
          return <img key={index} src={card.image} alt={card.name} />
        })}
      </div>
    );
  }
}

export default App;
