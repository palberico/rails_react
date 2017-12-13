import React from 'react'
import axios from 'axios'

class App extends React.Component {
  state = { songs: [] }

  componentDidMount(){
    axios.get('/api/songs')
    .then( response => {
      this.setState({songs: response.data})
    })
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit= (e) => {
    e.preventDefault()
    let { newSongArtist, newSongTitle } = this.state
    axios.post('api/songs', {artist: newSongArtist, title: newSongTitle})
    .then( response => {
      this.setState({
        newSongArtist: '', 
        newSongTitle: '',
        songs: [...this.state.songs, response.data],
      })
    })
  }

  render() {
    return (
      <div>
        <h1>This is the Top 100 Songs</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              value={this.state.NewSongArtist}
              name='newSongArtist'
              onChange={this.handleChange}
              placeholder="Artist"
            />
            <input
              value={this.state.NewSongTitle}
              name='newSongTitle'
              onChange={this.handleChange}
              placeholder="Title"
            />

            <button type='submit'>Submit</button>
        
        </form>
        <ol>
          {this.state.songs.map( song => {
            return(
            <li key={ song.id }>Artist: {song.artist} Title: {song.title}<button type='delete'>Delete</button></li>
            )
          })}
          </ol>
      </div>
    );
  }
}

export default App;
