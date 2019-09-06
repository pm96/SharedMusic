import React from 'react';
import { Input, Grid, List, Container, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import '../styling/SearchBarItemContainerStyle.css';

class SearchBar extends React.Component{

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