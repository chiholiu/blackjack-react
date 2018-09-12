import React from 'react';
import './App.css';

let array = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
let result = 0;
let totalPlayerScore = 0;

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
      card: null,
      playerScore: 0,
      playerScoreArray: [],
      computerScore: 0,
      totalPlayerScore: 0
    };
    
    this.getCard = this.getCard.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.checkScore = this.checkScore.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', function() {
        console.log('loaded successfully ');
    });
  }

  checkScore(playerArray) {
    const playerScore = playerArray;
    const newArray = playerScore.map(card => this.getCardValue(card));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    result = newArray.reduce(reducer);
    this.setState({
      playerScore: result
    })
  }

  calculateScore() {
    result < 21 ? this.state.playerScoreArray.push(Math.round(result + (result * 1.2))): this.state.playerScoreArray.push(Math.round(result - (result * 1.2)));
    
    this.calculateTotalScore(this.state.playerScoreArray);
    console.log('array of playerScore' + this.state.playerScoreArray);
    this.setState({
      player: []
    });

  }

  calculateTotalScore(element) {
    const playerScore = element;
    const newPlayerArray = playerScore.map(card => card);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    totalPlayerScore = newPlayerArray.reduce(reducer);
    console.log(totalPlayerScore);
    this.setState({
      totalPlayerScore: totalPlayerScore
    })
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
    if(result > 21) {
      this.calculateScore();
    }
  }

  shuffle() {
    for(var i = 0; i < 3; i++) {
      this.shuffleCard();
    }
  }

  reset() {
    this.setState({
      computer: [],
      player: []
    })
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

        <div>
          <button onClick={this.calculateScore}>Fold</button>
        </div>

        <div>
          <p>Player Score</p>
          <span>{this.state.playerScore}</span>
        </div>

        <div>{this.state.totalPlayerScore}</div>
      </div>
    );
  }
}

export default App;
