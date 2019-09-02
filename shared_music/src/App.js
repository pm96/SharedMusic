import React from 'react';
import './App.css';
import DescriptionBar from './components/DescriptionBar';
import ListItem from './components/ListItem';
import Searchbar from './components/Searchbar';
import SongList from './components/SongList';
import { Container, Header, } from 'semantic-ui-react';
import youtube from './apis/youtube';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      term: '',
      isLoading:false,
    };
  }

  render(){
    return(
      <div>
        <Container text style={{paddingTop:10}}>
          <Header as='h2' textAlign='center'>Music Share</Header>
          <Searchbar value={this.state.term} onChange={this.onInputChange} onSearch={this.onTermSubmit}/>

        </Container>
      </div> 
    );
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

}

export default App;
