import React from 'react';
import { List } from 'semantic-ui-react'
import ListItem from './ListItem'

const Playlist = ({playlist}) => (
    <div className="list-container" style={{ width: "25%", float: "right", margin: "5px 15px"}}>
        <List relaxed className="playlist" style={{ listStyle: "none", border: "2px solid gray", padding: "15px", overflow: "hidden", overflowY: "scroll", height: "250px"}}>
            {Object.entries(playlist).map(([key,item]) =>
                
                <ListItem key={key} title={item.title} uploader={item.uploader} length={item.length} />

            )}
        </List>
    </div>
)

export default Playlist;