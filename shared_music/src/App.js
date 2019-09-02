import React from 'react';
import './App.css';
import Playlist from './components/SongList';
//import ListItem from './components/ListItem';
//import DescriptionBar from './components/DescriptionBar';
import SearchBar from './components/SearchBar';
import { Container, Header,  } from 'semantic-ui-react';
import youtube from './apis/youtube';
import API_KEY from './config.js';
import VideoDetail from './components/VideoDetail';

const KEY = API_KEY;

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
    state = {
      term: '',
      isLoading:false,
      videos: null,
      selectedVideo: null,
      list: playList,
  }

  componentDidMount() {
    console.log("Mounted..")
  }

  addToList = () => {
    // add song to playlist
    console.log('adding')
  }

  removeFromList = () => {
    // remove song from playlist
  }

  onInputChange = (event) => {
    this.setState({term: event.target.value})
  }
  
  onTermSubmit = async () => {
    const response = await youtube.get('/search', {
      params: {
        q: this.state.term,
        part: 'snippet',
        maxResults: 5,
        key: KEY,
      },
    });
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  }



  render(){
    return(
      <div>
        <Container text style={{paddingTop:10}}>
          <Header as='h2' textAlign='center'>Music Share</Header>
          <SearchBar 
            value={this.state.term} 
            onChange={this.onInputChange} 
            onTermSubmit={this.onTermSubmit}
            videosToShow={this.state.videos}
            addToQueue={this.addToList}
          />
          <div className="ui grid">
            <div className="ui row">
              <div className="eleven wide column">
                <VideoDetail video={this.state.selectedVideo} />
              </div>
              <div className="five wide column">
                <Playlist playlist={this.state.list} />
              </div>
            </div>
          </div>

        </Container> 
      </div>
    );
  }

}

export default App;
