import React from 'react';
import './App.css';

let array;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { random: null};
    this.getCard = this.getCard.bind(this);
  }



  getCard() {
    array = [2,3,4,5,6,7,8,9];
    const rand = array[Math.floor(array.length * Math.random())];
    this.setState({ random: this.state.random = rand});
  }


  render() {
    
    return (
 
      <div className="App">
        <button onClick={this.getCard}></button>

        <p>{this.state.random}</p>
      </div>
    );
  }
}

export default App;
