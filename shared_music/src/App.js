import React from 'react';
import './App.css';
import Playlist from './components/SongList';
import ListItem from './components/ListItem';
import DescriptionBar from './components/DescriptionBar';
import Searchbar from './components/searchbar';
import { Container, Header, } from 'semantic-ui-react';
import youtube from './apis/youtube';
import axios from 'axios';

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
  constructor(props){
    super(props);

    this.state = {
      term: '',
      isLoading:false,
      list: playList,
    };
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


  onInputChange = (event) => {
    this.setState({term: event.target.value})
    console.log('inputchange');
  }

  
  onTermSubmit = async (term) => {
    const response = await youtube.get('/search',{
      params:{
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
          <Searchbar value={this.state.term} onChange={this.onInputChange} onSearch={this.onTermSubmit}/>

        </Container>
        <Playlist playlist={this.state.list} />
      </div> 
    );
  }

}

export default App;
