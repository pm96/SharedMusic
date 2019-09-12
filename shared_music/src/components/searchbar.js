import React from 'react';
import { Input, Grid, List, Container, Button, Header } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import '../styling/SearchBarItemContainerStyle.css';

class SearchBar extends React.Component{

    showVideos(videos, value){
        console.log(videos)
        if(videos === null){
            return null;
        } else if(videos.length < 1) {
            return (
                <Header as='h2' textAlign='center' color='grey' style={{ margin: '80px' }}>No videos for '<i style={{ color: "#f54646" }}>{value}</i>' was found..</Header>
            );
        }else{
            return(
                <div className="ui segment">
                    <Grid divided='vertically'>
                        <Grid.Row columns="5">
                        { Object.entries(videos).map(([key,video]) => 
                            <Grid.Column key={key}>
                                <Container 
                                    style={{
                                        border: "1px solid #dededf",
                                        borderRadius: "5px",
                                        padding: "15px",
                                        boxShadow: "0 1px 2px 1px rgba(34,36,38,.15)",
                                        transition: "0.2s"
                                    }}
                                    onClick={this.props.addToQueue} 
                                    id={key}
                                    className={"item-container"}
                                >
                                    <List.Item style={{ textAlign: "center"}}>
                                        <img src={videos[key].snippet.thumbnails.default.url} alt={"alt for img"}/>
                                        <p style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", height: "60px", margin: "0 auto" }}>{videos[key].snippet.title}</p>
                                    </List.Item>
                                    <Button 
                                        onClick={this.props.addToQueue} 
                                        id={key} 
                                        style={{ 
                                            margin: "10px auto 0", 
                                            display: "flex", 
                                            border: "none", 
                                            background: "#2185d0",
                                            width: "75%" 
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPlus} size={"2x"} color={"white"} style={{ margin: "0 auto" }}/>
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


    showPlaylistFound(playlist, value, importPlaylist, showItem) {

        if(playlist === null) {
            return null;
        } else if(playlist.length < 1) {
            return(
                <Header as='h2' textAlign='center' color='grey' style={{ margin: '80px' }}>No videos for '<i style={{ color: "#f54646" }}>{value}</i>' was found..</Header>
                )
        } else {
            return (
                <div className="ui segment" style={{ display: "flex", border: "0", boxShadow: "0 0 0" }}> 
                    <List.Item style={{ margin: "0 auto", border: "2px solid #bcbcbd", padding: "15px", borderRadius: "10px", backgroundColor: "#f3f3f3" }}>
                        <div style={{ float: "left", marginRight: "10px" }} id={"playlist-img"}>
                            <img src={showItem.snippet.thumbnails.medium.url} alt={"Thumbnail for playlist from Youtube"} onClick={importPlaylist} style={{ cursor: "pointer" }}></img>
                        </div>
                        <List.Description style={{ float: "right", marginLeft: "10px" }} id={"description"}>
                            <p><strong>Uploader: </strong> <a href={"https://www.youtube.com/channel/"+playlist[0].snippet.channelId}>{playlist[0].snippet.channelTitle}</a></p>
                            <p><strong>Playlist ID:</strong> {playlist[0].snippet.playlistId}</p>
                        </List.Description>
                    </List.Item>
                </div>
            );
        }

    }


    chooseDisplay = (term, onChange, onTermSubmit, getPlaylist, playlistSearch) => {
        
        if(playlistSearch) {
            return(
                <Input 
                placeholder='Import a specific Playlist using its Playlist-Id'
                action={{
                    icon:'list alternate outline',
                    onClick: () => getPlaylist()
                }}
                fluid
                value={term} 
                onChange={onChange}
                />
            )
        } else {
           return (
                <Input 
                    placeholder='Search for song'
                    action={{
                        icon:'search',
                        onClick: () => onTermSubmit()
                    }}
                    fluid
                    value={term} 
                    onChange={onChange}
                />
            )
        }

    }

    render(){
        const { term, onChange, onTermSubmit, getPlaylist, videosToShow, playlistSearch, importedPlaylistToShow, importPlaylist, showItem } = this.props;
        
        return(
            <div>
                {this.chooseDisplay(term, onChange, onTermSubmit, getPlaylist, playlistSearch)}
                {playlistSearch ? this.showPlaylistFound(importedPlaylistToShow, this.props.value, importPlaylist, showItem) : this.showVideos(videosToShow, this.props.value)}
            </div>
        ); 
    }   
}

export default SearchBar;