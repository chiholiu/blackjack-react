import React from 'react';
import './App.css';

let array = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
let result = 0;
let totalPlayerScore = 0;
let computerScore = 'computerScore';
let playerScore = 'playerScore';

// const suits = ['♣', '♦', '♥', '♠'];
// const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
// const colors = { '♣': 'black', '♦': 'red', '♥': 'red', '♠': 'black' };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      shuffleButton: true,
      random: null,
      player: [],
      computer: [],
      playerScore: 0,
      computerScore: 0,
      totalPlayerScore: 0
    };
    
    this.getCard = this.getCard.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.shuffleCard = this.shuffleCard.bind(this);
    this.checkScore = this.checkScore.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.reset = this.reset.bind(this);
    this.checkBothCards = this.checkBothCards.bind(this);
    this.recalculateComputerScore = this.recalculateComputerScore.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', function() {
      console.log('loaded successfully ');
    });
  }

  getCard() {
    const rand = array[Math.floor(array.length * Math.random())];
    this.setState({
      player: [...this.state.player, rand]
    }, () => this.checkScore(this.state.player, playerScore)); 
  }

  shuffle() {
    for(var i = 0; i < 3; i++) {
      this.shuffleCard(i);
    }
  }

  shuffleComputerCard() {
    const rand = array[Math.floor(array.length * Math.random())];
    this.setState({
      computer: [...this.state.computer, rand]
    }, () => this.checkScore(this.state.computer, computerScore));
  }

  recalculateComputerScore(element, keyValue) {
    const newComputerArray = element.map(card => this.getCardValue (card));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let totalComputerScore = newComputerArray.reduce(reducer, 0);
    this.setState({
      [keyValue]: totalComputerScore
    });
    console.log('keyValue ' + keyValue);
    if(keyValue == computerScore) {
      this.checkBothCards();
    }
  }

  shuffleCard(n) {
    if(n > -1) {
      let rand = array[Math.floor(array.length * Math.random())]
      if(this.state.computer.length < 2) {
        this.setState({computer: [...this.state.computer, rand]}, () => {
          this.checkScore(this.state.computer, computerScore);
          this.shuffleCard(n-1);
        });
      } else {
        this.setState({player: [...this.state.player, rand]}, () => {
          this.checkScore(this.state.player, playerScore);
          this.shuffleCard(n-1);
        });
      }
      this.setState({
        shuffleButton: false
      })
    }
  }

  checkScore(theArray, keyName) {
    const newArray = theArray.map(card => this.getCardValue(card));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    result = newArray.reduce(reducer, 0);
    this.setState({
      [keyName]: result
    });
  }

  calculateScore() {
    if(result < 21) {
      this.setState({
        player: [...this.state.player, Math.round(result + (result * 1.2))]
      }, () => this.calculateTotalScore(this.state.player));
    } else {
      this.setState({
        player: [...this.state.player, Math.round(result - (result * 1.2))]
      }, () => this.calculateTotalScore(this.state.player), console.log(this.state.player));
    }
  }

  calculateTotalScore(playerScore) {
    const newPlayerArray = playerScore.map(card => this.getCardValue (card));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    totalPlayerScore = newPlayerArray.reduce(reducer, 0);
    this.setState({
      totalPlayerScore: this.state.totalPlayerScore + totalPlayerScore,
    }, () => this.reset())
  }

  checkBothCards() {
    console.log('called');
    if(this.state.computerScore < 17 && this.state.playerScore <= 21) {
      console.log('smaller than 17');
      this.shuffleComputerCard();
    } else if (this.state.computerScore > 17 && this.state.computerScore < 21  && this.state.playerScore <= 21) {
      this.checkWinner();
      console.log('between 17 and 21');
    } else {
      console.log('you beat computer');
      this.checkWinner();
    }
  }

  checkWinner() {
    this.setState({
      shuffleButton: true
    })
    if(this.state.playerScore > this.state.computerScore) {
      this.setState({
        player: [...this.state.player, Math.round(result + (result * 1.2))]
      }, () => this.calculateTotalScore(this.state.player));
    } else if (this.state.playerScore < this.state.computerScore) {
      this.setState({
        player: [...this.state.player, Math.round(result + (result * 1.2))]
      }, () => this.calculateTotalScore(this.state.player));
    } else {
      this.setState({
        player: [...this.state.player, Math.round(result + (result * 1))]
      }, () => this.calculateTotalScore(this.state.player));
        console.log('equal');
    }
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

  reset() {
      this.setState({
        computer: [],
        player: []
      })
  }

  render() {
    return (
      <div>
        <div className="App">
          <button onClick={this.getCard}>Play</button>
          <button onClick={this.shuffle} disabled={!this.state.shuffleButton}>Shuffle</button>
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
          <button onClick={this.checkBothCards}>Fold</button>
        </div>

        <div>
          <p>Player Score</p>
          <span>{this.state.playerScore}</span>
        </div>

        {/* <div>
          <p>Computer Score</p>
          
          <span>{this.state.computerScore}</span>
        </div> */}

        <div>{this.state.totalPlayerScore}</div>
      </div>
    );
  }
}

export default App;
