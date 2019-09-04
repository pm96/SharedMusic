import React from 'react';
import './App.css';
import Playlist from './components/SongList';
//import ListItem from './components/ListItem';
//import DescriptionBar from './components/DescriptionBar';
import SearchBar from './components/searchbar';
import { Container, Header,  } from 'semantic-ui-react';
import youtube from './apis/youtube';
import * as API from './config.js';
import VideoDetail from './components/VideoDetail';

const KEY = API.API_KEY_2;

class App extends React.Component {
    state = {
      term: '',
      isLoading:false,
      videos: null,
      selectedVideo: null,
      list: [],
  }

  componentDidMount() {
    console.log("Mounted..")
  }


  addToList = (event) => {
    // add song to playlist
    const id = event.currentTarget.id;
    let updatedPlaylist = [];
    const video = this.state.videos[id];

    //console.log('Video:', video)

    if(this.state.list.length > 0 && video !== undefined) {

      updatedPlaylist = [...this.state.list, video];
      this.setState({
        list: updatedPlaylist,
        selectedVideo: updatedPlaylist[0],
      });
      
      
    } else {

      updatedPlaylist.push(video);
      this.setState({
        list: [...updatedPlaylist],
        selectedVideo: updatedPlaylist[0],
      })

    }
  }


  removeFromList = (event) => {
    // remove song from playlist
    const id = event.currentTarget.id;
    
    let updatedPlaylist = [...this.state.list];
    updatedPlaylist.splice(id, 1);

    //removes video from screen if nothing in queue
    const videoValue = updatedPlaylist[0] !== null ? updatedPlaylist[0]: 'is === null';

    this.setState({
      list: updatedPlaylist,
      selectedVideo: videoValue,
    });

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
        type: 'video',
        key: KEY,
        
      },
    });
    
    this.setState({
      videos: response.data.items,
    });
  }

  render(){

    //console.log("Playlist from state: ", this.state.list)

    return(
      <div>
        <Container style={{paddingTop:10}}>
          <Header as='h2' textAlign='center'>Music Share</Header>
          <SearchBar 
            value={this.state.term} 
            onChange={this.onInputChange} 
            onTermSubmit={this.onTermSubmit}
            videosToShow={this.state.videos}
            addToQueue={this.addToList}
          />
          {this.state.videos === null ? '' : <div className="ui container stackable divided relaxed two column grid" style={{ marginTop: 30}}>
            <div className="nine wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="seven wide column">
              <Playlist playlist={this.state.list} songDelete={this.removeFromList} />
            </div>
          </div>}

        </Container> 
      </div>
    );
  }

}

export default App;