import React from 'react';
import './App.css';
//import DescriptionBar from './components/DescriptionBar';
//import ListItem from './components/ListItem';
import SearchBar from './components/SearchBar';
//import SongList from './components/SongList';
import { Container, Header, } from 'semantic-ui-react';
import youtube from './apis/youtube';
import API_KEY from './config.js';
import VideoDetail from './components/VideoDetail';

const KEY = API_KEY;

class App extends React.Component {
    state = {
      term: 'something',
      isLoading:false,
      videos: [],
      selectedVideo: null,
  }


  onInputChange = (event) => {
    this.setState({term: event.target.value})
  }

  onTermSubmit = async (term) => {
    const response = await youtube.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY,
        q: term
      }
    });
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0]
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
          />
          <div className="ui grid">
            <div className="ui row">
              <div className="eleven wide column">
                <VideoDetail video={this.state.selectedVideo} />
              </div>
              <div className="five wide column">
                <p>list here</p>
              </div>
            </div>
          </div>

        </Container>
      </div> 
    );
  }

}

export default App;
