import React from 'react';
import './App.css';
import Playlist from './components/SongList';
import ListItem from './components/ListItem';

const playList = [
  {
    title: "Michael Jackson - Beat it",
    uploader: "Jokestar64",
    length: "3:43"
  }, 
  {
    title: "Kygo - Firestone",
    uploader: "noob_master69",
    length: "4:27"
  },
  {
    title: "Sean Paul - Press it up",
    uploader: "askSteve",
    length: "3:54"
  },
]


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      list: playList,

    }

  }

  componentDidMount() {
    console.log("Mounted..")
  }

  addToList = () => {
    // add song to playlist
  }

  removeFromList = () => {
    // remove song from playlist
  }
  
  render(){
    return(
      <div>
        <Playlist playlist={this.state.list} />
        
      </div>
    );
  }

}

export default App;
