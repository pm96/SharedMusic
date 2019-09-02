import React from 'react';
import { List } from 'semantic-ui-react'
import ListItem from './ListItem'

const Playlist = ({playlist}) => (
    <div className="list-container" >
        <List selection className="playlist" style={{ listStyle: "none", border: "1px solid #dededf", borderRadius: "4px", padding: "15px", overflow: "hidden", overflowY: "scroll", height: "374px", boxShadow: "0 1px 2px 0 rgba(34,36,38,.15)"}}>
            {Object.entries(playlist).map(([key,item]) =>
                <ListItem key={key} title={item.title} uploader={item.uploader} length={item.length} />
            )}
        </List>
    </div>
)

export default Playlist;