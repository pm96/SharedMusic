import React from 'react';
import ListItem from './ListItem'

const Playlist = ({playlist}) => (
    <div className="list-container" style={{ width: "25%", float: "right", margin: "5px 15px"}}>
        <ul className="playlist" style={{ listStyle: "none", border: "2px solid gray" }}>
            {Object.entries(playlist).map(([key,item]) =>
                
                <ListItem key={key} title={item.title} uploader={item.uploader} length={item.length} />

            )}
        </ul>
    </div>
)

export default Playlist;