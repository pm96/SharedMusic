import React from 'react';
import './App.css';
import DescriptionBar from './components/DescriptionBar';
import ListItem from './components/ListItem';
import Searchbar from './components/Searchbar';
import SongList from './components/SongList';
import { Container, Header, } from 'semantic-ui-react';

class App extends React.Component {


  render(){
    return(
      <div>
        <Container text>
          <Header as='h2'>Music Share</Header>
          <Searchbar />

        </Container>
      </div> 
    );
  }

}

export default App;
