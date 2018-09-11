import React from 'react';
import './App.css';

let array = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

// const suits = ['♣', '♦', '♥', '♠'];
// const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
// const colors = { '♣': 'black', '♦': 'red', '♥': 'red', '♠': 'black' };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      random: null,
      player: [],
      computer: [],
      card: null
    };
    
    this.getCard = this.getCard.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.checkScore = this.checkScore.bind(this);
    // this.getCardValue = this.getCardValue.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', function() {
        console.log('loaded successfully ');
    });
  }

  checkScore(playerArray) {
    const playerScore = playerArray;
    const result = playerScore.map(card => this.getCardValue(card));
  }

  getCardValue (card) {
    switch (card) {
      case 'A':
        return 11
      case 'K':
      case 'Q':
      case 'J':
        return 10
      default:
        return card
    }
  }

  getCard() {
    const rand = array[Math.floor(array.length * Math.random())];
    this.state.player.push(rand);
    this.setState(
      this.state
    )
    this.checkScore(this.state.player);
  }

  shuffle() {
    for(var i = 0; i < 3; i++) {
      this.shuffleCard();
    }
  }



  shuffleCard() {
    const rand = array[Math.floor(array.length * Math.random())];
    this.state.computer.length < 2 ? this.state.computer.push(rand) : this.state.player.push(rand);
    document.getElementById('shuffleButton').setAttribute('disabled', '');
    this.setState(
      this.state
    )
  }

  render() {
    return (
      <div>
        <div className="App">
        {/* <button onClick={this.checkScore}>Check Score</button> */}
          <button onClick={this.getCard}>Play</button>
          <button id="shuffleButton" onClick={this.shuffle}>Shuffle</button>
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
