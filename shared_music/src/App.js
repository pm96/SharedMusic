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

//***  Functions relevant to playlist handling ***\\

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
      });
      
      
    } else {

      updatedPlaylist.push(video);
      this.setState({
        list: [...updatedPlaylist],
      })

    }
  }


  removeFromList = (event) => {
    // remove song from playlist
    const id = event.currentTarget.id;
    
    let updatedPlaylist = [...this.state.list];
    updatedPlaylist.splice(id,1);

    this.setState({
      list: updatedPlaylist,
    });

  }


  moveVideoInPlaylist = (event) => {
    let playlist = [...this.state.list];
    const buttonId = event.currentTarget.id; 

    let numbericId = buttonId.includes("up") ? buttonId.substring(2) : buttonId.substring(4);
    numbericId = parseInt(numbericId);

    const itemToMove = playlist[numbericId];
    // let affectedNeighbourItem;


    if(buttonId.includes("up")) {
      const affectedNeighbourItem = playlist[numbericId-1];
      const newIndexForItem = numbericId-1;
      const newindexForAffNeighbour = numbericId;

      // Copying and inserting elements in the new position
      playlist.splice(newIndexForItem,0,itemToMove);
      playlist.splice(newindexForAffNeighbour,0,affectedNeighbourItem);

      // Finding and removing the (old) elements
      const indexOfOldElem = numbericId+1;
      playlist.splice(indexOfOldElem,2);

      // Alert when song is first in list and user tries to move it further up.
      if(numbericId === 0) {
        alert("The song is already at the top of the playlist")
      } else {
        
        this.setState({
          list: playlist
        })

      }
      
    } else {
      
      // Only completing movement as long as the item is not at the very bottom of the list.
      if(numbericId < (playlist.length-1)) {

        const affectedNeighbourItem = playlist[numbericId+1];
        const newIndexForItem = numbericId+1;
        const newindexForAffNeighbour = numbericId;

        // Copying and inserting elements in the new position
        playlist.splice(newIndexForItem,0,itemToMove);
        playlist.splice(newindexForAffNeighbour,0,affectedNeighbourItem);

        
        // Finding and removing the (old) elements
        const indexOfOldElem = numbericId+2;
        playlist.splice(indexOfOldElem,2);


        this.setState({
          list: playlist
        })


      } else {
        alert("The song is already at the bottom of the playlist")
      }

    }
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
      selectedVideo: response.data.items[0],
    });
  }

  moveTest = () => {
    let arr = this.state.list;
    if(arr === []){
      console.log("empty..")
    } else { 
      arr.copyWithin(1,2)
      console.log("arr: ", arr)
    }
    
  }

  render(){

    console.log("Playlist from state: ", this.state.list)
    

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
              <Playlist playlist={this.state.list} songDelete={this.removeFromList} moveSong={this.moveVideoInPlaylist} />
            </div>
          </div>}

        </Container> 
      </div>
    );
  }

}

export default App;
