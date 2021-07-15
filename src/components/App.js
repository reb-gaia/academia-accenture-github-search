import './App.css';
import React from 'react';

class App extends React.Component {
  state = {
    profile: {},
    username: '',
  }

  handleTextChange(e) {
    e.preventDefault();
    fetch(`https://api.github.com/users/${e.target.value}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        profile: res
      })
    })
  }

  render() {
    return (
      <div>
        <div className="title">
          <strong>dev.ser</strong>
        </div>
        <div className="search">
          <input type="text" onChange={this.handleTextChange.bind(this)}></input>
          <br />
          <button id="button">Pesquisar</button>
        </div>
        <div>
          {Object.entries(this.state.profile).map((values, key) => (
            <h2 key={key}><strong>{values[0]}: {values[1]}</strong></h2>
          ))}
        </div>
      </div>
    )
  }
}


export default App;