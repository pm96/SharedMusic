import React from 'react';
import { Input, Grid } from 'semantic-ui-react';

class SearchBar extends React.Component{
    state = {
        options:[],
    }

    showVideos(videos){
        if(videos == undefined){
            return null;
        }else{
            return(
                <div className="ui segment">
                    {console.log(videos)}
                    <Grid divided='vertically'>
                        <Grid.Row columns="5">
                            <Grid.Column onClick={this.props.addToQueue}>
                                <img src={videos[0].snippet.thumbnails.default.url}/>
                                <p>{videos[0].snippet.title}</p>
                            </Grid.Column>
                            <Grid.Column onClick={this.props.addToQueue}>
                                <img src={videos[1].snippet.thumbnails.default.url}/>
                                <p>{videos[1].snippet.title}</p>
                            </Grid.Column>
                            <Grid.Column onClick={this.props.addToQueue}>
                                <img src={videos[2].snippet.thumbnails.default.url}/>
                                <p>{videos[2].snippet.title}</p>
                            </Grid.Column>
                            <Grid.Column onClick={this.props.addToQueue}>
                                <img src={videos[3].snippet.thumbnails.default.url}/>
                                <p>{videos[3].snippet.title}</p>
                            </Grid.Column>
                            <Grid.Column onClick={this.props.addToQueue}>
                                <img src={videos[4].snippet.thumbnails.default.url}/>
                                <p>{videos[4].snippet.title}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            );
        }
    }

    render(){
        const { term, onChange, onTermSubmit, videosToShow} = this.props;
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