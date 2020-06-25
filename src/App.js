import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import data from './data'


class App extends React.Component{

  state = {
    toyCollection: [],
    display: false
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
      .then(res => res.json())
      .then(toys => {
        this.setState({ 
          toyCollection: toys
        })
      })
  }

  addLike = (toy) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: ++toy.likes
      })
    }
    fetch('http://localhost:3000/toys/' + toy.id, options)
      .then(res => res.json())
      .then(newtoy => {
        console.log(newtoy)
        let removed = this.state.toyCollection.map(toy => toy.id === newtoy.id ? newtoy : toy)
        // this.state.toyCollection.splice(toy.id, 1, newtoy)
        this.setState({
          toyCollection: removed
        })
      })  
  }
  
  deleteToy = (delToy) => {
    fetch('http://localhost:3000/toys/' + delToy.id, {method: "DELETE"})
      .then(res => res.json())
      .then(toy => {
        this.setState({
          toyCollection: this.state.toyCollection.filter(toy => toy.id !== delToy.id)
        })
      })
  }

  addToy = (e) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: e.target[0].value,
        image: e.target[1].value,
        likes: 0
      })
    }
    fetch('http://localhost:3000/toys', options)
      .then(res => res.json())
      .then(toy => {
        this.setState({
          toyCollection: this.state.toyCollection.push(toy)
        })
      })  
  }
  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToy={this.addToy} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toyCollection} addLike={this.addLike} deleteToy={this.deleteToy} />
      </>
    );
  }

}

export default App;
