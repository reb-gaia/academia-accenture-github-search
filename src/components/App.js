import './App.css';
import React from 'react';

class App extends React.Component {
  state = {
    profile: {},
    username: '',
    followers: {},
    following: {}
  }

  handleTextChange(e) {
    this.setState({
      username: e.target.value,
    })
  }

  handleClick(e) {
    e.preventDefault();
    fetch(`https://api.github.com/users/${this.state.username}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        profile: res
      })
    })

    fetch(`https://api.github.com/users/${this.state.username}/followers`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        followers: res
      })
    })

    fetch(`https://api.github.com/users/${this.state.username}/following`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        following: res
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
          <button style={{backgroundColor: "#FFF"}} onClick={this.handleClick.bind(this)}> <img src="https://image.flaticon.com/icons/png/512/64/64673.png" alt="avatar" width="10" height="10"></img></button>
        </div>

        { this.state.profile.id &&
          <div style={{textAlign: 'center'}}>
            <img className="rounded-circle" src={this.state.profile.avatar_url}  alt="avatar" width="130" height="130"/>
            <h3><strong>{this.state.profile.name}</strong></h3>
            <h3><strong>{this.state.profile.bio}</strong></h3>
            <h3><strong><a href={"https://" + this.state.profile.blog}>{this.state.profile.blog}</a></strong></h3>
            <h3><strong>{this.state.profile.company}</strong></h3>
            <h3><strong>{Object.keys(this.state.followers).length} | {Object.keys(this.state.following).length}</strong></h3>



          </div>
        }

        { this.state.profile.message && 
            <div style={{textAlign: 'center'}}>
              <h3>User Not Found</h3>
            </div>
        }
        
      </div>
    )
  }
}

export default App;