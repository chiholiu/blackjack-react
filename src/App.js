import React from 'react';
import './App.css';

let array;

// const suits = ['♣', '♦', '♥', '♠'];
// const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
// const colors = { '♣': 'black', '♦': 'red', '♥': 'red', '♠': 'black' };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      random: null,
      player: [],
      computer: []
    };
    this.getCard = this.getCard.bind(this);
    // this.shuffleCard = this.shuffleCard.bind(this)
  }
  componentDidMount() {
    window.addEventListener('load', this.getCard);
  }

  getCard() {
    for(var i = 0; i < 3; i++) {
      this.shuffleCard();
    }
  }

  shuffleCard() {
    array = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    const rand = array[Math.floor(array.length * Math.random())];
    this.state.computer.length < 2 ? this.state.computer.push(rand) : this.state.player.push(rand);
    this.setState(
      this.state
    )
    this.state
  }

  render() {
    return (
      <div>
        <div className="App">
          <button onClick={this.getCard}>Play</button>

        </div>

        <div>
          <p>Computer</p>
          <p>{this.state.computer}</p>
        </div>
        <div>
          <p>Player</p>
          <p>{this.state.player}</p>
        </div>
      </div>
    );
  }
}

export default App;
