import React from 'react';
import { Input, Grid, List, Container, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class SearchBar extends React.Component{
    state = {
        options:[],
    }

    renderColumn(amt, videos){
        const entries = Object.entries(videos);

        for(const [keys, val] of entries){
            return console.log(keys + " ", val);
        }
    }

    showVideos(videos){
        if(videos == undefined){
            return null;
        }else{
            return(
                <div className="ui segment">
                    <Grid divided='vertically'>
                        <Grid.Row columns="5">
                        { Object.entries(videos).map(([key,video]) => 
                            <Grid.Column key={key}>
                                <Container>
                                    <List.Item style={{ textAlign: "center"}}>
                                        <img src={videos[key].snippet.thumbnails.default.url}/>
                                        <p style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", height: "60px", margin: "0 auto" }}>{videos[key].snippet.title}</p>
                                    </List.Item>
                                    <Button onClick={this.props.addToQueue} id={key} style={{ width: "70%", margin: "10px auto", display: "flex", border: "none", background: "#7fffd4" }}>
                                        Add to playlist
                                    </Button>
                                </Container>
                            </Grid.Column>
                        )}
                        </Grid.Row>
                    </Grid>
                </div>
            );
        }
    }

    render(){
        const { term, onChange, onTermSubmit, videosToShow } = this.props;
        return(
            <div>
                <Input 
                placeholder='search song'
                action={{
                    icon:'search',
                    onClick: () => onTermSubmit()
                }}
                fluid
                value={term} 
                onChange={onChange}
                />
                {this.showVideos(videosToShow)}
            </div>
        ); 
    }   
}

export default SearchBar;