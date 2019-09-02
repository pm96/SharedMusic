import React from 'react';
import { Input } from 'semantic-ui-react';

class SearchBar extends React.Component{

    render(){
        //console.log(this.props);
        const { term, onChange, onTermSubmit } = this.props;
        return(
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
        );
    }
}

export default SearchBar;