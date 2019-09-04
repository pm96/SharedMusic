import React from 'react';
import { Input, Grid } from 'semantic-ui-react';

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
                            {this.renderColumn(5, videos)
                            }
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