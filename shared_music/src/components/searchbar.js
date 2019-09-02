import React from 'react';
import { Input } from 'semantic-ui-react';

class SearchBar extends React.Component{
    constructor(props){
        super(props);

    }

    render(props){
        return(
            <Input 
                placeholder='search song' 
                action={{
                    icon:'search',
                    onClick: () => this.props.onSearch()
                }}
                fluid
                value={this.props.value} 
                onChange={this.props.onChange}
                onSearch={this.props.onSearch}/>
        );
    }
}

export default SearchBar;