import React from 'react';
import { List, Header, Button } from 'semantic-ui-react'
import ListItem from './ListItem'

const Playlist = ({playlist, songDelete, moveSong, changeQueueOrder_AND_playVideo, showPlaylistSearch, importPlaylist, importedList }) => (
    <div className="list-container" >
        {((playlist.length >= 1 && showPlaylistSearch) || (playlist.length >= 1 && !showPlaylistSearch)) ? 

            <List selection className="playlist" style={{ listStyle: "none", border: "1px solid #dededf", borderRadius: "4px", padding: "15px", overflow: "hidden", overflowY: "scroll", height: "374px", boxShadow: "0 1px 2px 0 rgba(34,36,38,.15)"}}>
                {Object.entries(playlist).map(([key,item]) =>
                    <ListItem 
                        key={key} 
                        id={key} 
                        title={item.snippet.title} 
                        uploader={item.snippet.channelTitle} 
                        songDelete={songDelete}
                        moveSong={moveSong}
                        changeQueueOrder_AND_playVideo={changeQueueOrder_AND_playVideo}
                    />
                )}
            </List>
            : showPlaylistSearch && playlist.length === 0 ?
                <div style={{ 
                    height: "374px", 
                    display: "table-cell", 
                    verticalAlign: "middle", 
                    width: "487px", 
                    border: "5px solid #dededf", 
                    borderRadius: "1%",
                    textAlign: "center" 
                }}>
                    <Header color={"grey"}>
                        Add to list?
                    </Header>
                    <Button onClick={importPlaylist} disabled={!importedList} color={"red"}>Add</Button>
                </div>
            : playlist.length === 0 && showPlaylistSearch === false ?
                <div style={{ 
                    height: "374px", 
                    display: "table-cell", 
                    verticalAlign: "middle", 
                    width: "487px", 
                    border: "5px solid #dededf", 
                    borderRadius: "1%",
                    textAlign: "center" 
                }}>
                    <Header color={"grey"}>
                        Search and click a video to add it to playlist
                    </Header>
                </div> :''
            }
    </div>
)

export default Playlist;