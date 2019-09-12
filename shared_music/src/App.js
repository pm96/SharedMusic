import React from 'react';
import './App.css';
import Playlist from './components/SongList';
//import ListItem from './components/ListItem';
//import DescriptionBar from './components/DescriptionBar';
import SearchBar from './components/searchbar';
import { Container, Header, Button,  } from 'semantic-ui-react';
import youtube from './apis/youtube';
import * as API from './config.js';
import VideoDetail from './components/VideoDetail';

const KEY = API.API_KEY;

class App extends React.Component {
    state = {
      term: '',
      importedPlaylist: null,
      isLoading:false,
      videos: null,
      selectedVideo: null,
      list: [],
      videoHistory: [],
      showPlaylistSearch: false,
      displayItem: null,
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


  emptyList = () => {
    this.setState({
      list: [],
      selectedVideo: null,  
    })
  }


  nextSong = () => {
    let finishedVideo = this.state.selectedVideo;
    let oldArray = this.state.list;
    oldArray.splice(0,1);

    this.setState({
      videoHistory: finishedVideo,
      list: oldArray,
      selectedVideo: oldArray[0],
    });
  }


  previousSong = () => {
    let oldA = this.state.list;
    oldA.unshift(this.state.videoHistory);

    this.setState({
      list:oldA,
      selectedVideo: oldA[0],
      videoHistory:[],
    });
  }


  changeQueueOrder_AND_playVideo = (event) => {
    let clickedID = event.currentTarget.id;
    let oldArr = this.state.list;


    let toStart = oldArr[clickedID];

    oldArr.splice(clickedID,1);

    oldArr.unshift(toStart);
 
    this.setState({
      list: oldArr,
      selectedVideo: oldArr[0],
    });
  }


  moveVideoInPlaylist = (event) => {
    let playlist = [...this.state.list];
    const buttonId = event.currentTarget.id; 

    let numbericId = buttonId.includes("up") ? buttonId.substring(2) : buttonId.substring(4);
    numbericId = parseInt(numbericId);

    const itemToMove = playlist[numbericId];


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
    });
  }


  getPlaylist = async () => {
    const response = await youtube.get('/playlistItems/', {
      params: {
        playlistId: this.state.term,
        part: 'contentDetails,snippet',
        maxResults: 25,
        key: KEY,
        
      },
    });
    console.log("playlist RESPONSE: ", response)
    this.setState({
      importedPlaylist: response.data.items,
      displayItem: response.data.items[0]
    })

  }


  radioBtnHandler = (event) => {
    const id = event.target.id;
    console.log("radio-value: ", id)

    if(id === "playlistSearchRadioBtn") { 
      this.setState({
        showPlaylistSearch: true
      })
    } else {
      this.setState({
        showPlaylistSearch: false
      })
    }

  }

  fromImportedToList = () => {
    const imported = this.state.importedPlaylist;

    this.setState({
      list: imported,
      term: '',
      selectedVideo: imported[0],
    })


  }
  

  render(){

    console.log("Imported list: ", this.state.importedPlaylist)

    return(
      <div>
        <Container style={{paddingTop:10}}>
          <Header as='h2' textAlign='center'>Music Share</Header>
          
          {/* SEARCH-BAR */}
          <SearchBar 
            value={this.state.term} 
            onChange={this.onInputChange} 
            onTermSubmit={this.onTermSubmit}
            getPlaylist={this.getPlaylist}
            playlistSearch={this.state.showPlaylistSearch}
            videosToShow={this.state.videos}
            importedPlaylistToShow={this.state.importedPlaylist}
            showItem={this.state.displayItem}
            importPlaylist={this.fromImportedToList}
            addToQueue={this.addToList}
          />

          {/* SEARCH - RADIO-BUTTONS */}
          <div className={"radio-btn-container"}>
            <div id={"radio-container-left"}>
              Video search <input type="radio" onChange={this.radioBtnHandler} checked={!this.state.showPlaylistSearch} id="videoSearchRadioBtn" className={"radio-btn"}/>
            </div>
            <div id={"radio-container-right"}>
              Import playlist with a Playlist Id <input type="radio" onChange={this.radioBtnHandler} checked={this.state.showPlaylistSearch} id="playlistSearchRadioBtn" className={"radio-btn"} />
            </div>
          </div>
          {

            /* VIDEO PLAYER */
            <div className="ui container stackable divided relaxed two column grid" style={{ marginTop: 30}}>
              <div className="nine wide column">
                <VideoDetail video={this.state.selectedVideo} importedVideoList={this.state.importedPlaylist} playlistWithoutImporting={this.state.term}/>
              </div>
              <div className="seven wide column">
                
                {/* PLAYLIST */}
                <Playlist 
                  playlist={this.state.list} 
                  songDelete={this.removeFromList} 
                  changeQueueOrder_AND_playVideo={this.changeQueueOrder_AND_playVideo} 
                  moveSong={this.moveVideoInPlaylist} 
                  showPlaylistSearch={this.state.showPlaylistSearch}
                  importPlaylist={this.fromImportedToList}  
                  importedList={this.state.importedPlaylist}  
                />

                {/* PLAYLIST buttons */}
                {<div style={{paddingTop:10, display:'flex', justifyContent:'space-between'}}>
                  <Button content="Next song" disabled={this.state.list.length <2? true : false} onClick={this.nextSong} />
                  {//trenger logikk for når man kan ha denne disabled og ikke
                  }
                  <Button content="Previous song" disabled={this.state.videoHistory.length <1 ? true : false} onClick={this.previousSong} /> 
                  <Button content="Clear list" disabled={this.state.list.length <1 ? true : false} onClick={this.emptyList} />
                </div>}
              </div>
            </div>
          }

        </Container>
      </div>
    );
  }

}

export default App;