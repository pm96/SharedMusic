import React from 'react';
import { Container, List, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faTrashAlt, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import '../styling/ListItemStyle.css';
import '../styling/svgHoverStyle.css';


const ListItem = ({title, uploader, songDelete, moveSong, id, changeQueueOrder_AND_playVideo}) => (
    <List.Item className="list-item" style={{ margin: "10px 0", backgroundColor: "rgba(0,0,0,.03)", cursor: "default", display: "flex" }} id={id}>
        <div style={{ display: "inline-block", float: "left", width: "35px", textAlign: "center"}}>
            <button onClick={moveSong} id={'up'+id} style={{ border: "none", backgroundColor: "transparent" }}>
                <FontAwesomeIcon 
                    icon={faAngleUp}  
                    size={"2x"}
                    className={"list-item-angleUp-svg"} 
                    style={{ 
                        display: "block",
                        margin: "0 auto",
                        height: "28px", 
                        width: "28px",
                        color: "#9a9a9a", 
                    }}
                    title="Move video up one position"
                />
            </button>
            <button onClick={moveSong} id={'down'+id} style={{ border: "none", backgroundColor: "transparent" }}>
                <FontAwesomeIcon 
                    icon={faAngleDown} 
                    size={"2x"}
                    className={"list-item-angleUp-svg"}
                    style={{ 
                        display: "block",
                        margin: "0 auto",
                        height: "28px", 
                        width: "28px",
                        color: "#9a9a9a",
                    }}
                    title="Move video down one position"
                />
            </button>
        </div>
        <Container style={{ margin: "auto", padding: "0 10px" }}>
            <List.Header as="a" style={{ marginBottom: "0" }} onClick={changeQueueOrder_AND_playVideo} id={id}>
                {title}
            </List.Header>
            <List.Description style={{ display: "inline-block", width: "75%", float: "left" }}>
                <p style={{ marginRight: "5px", float:"left" }}>
                    <strong>Uploader:</strong> {uploader} 
                </p>
            </List.Description>
        </Container>
        <div style={{ float: "right", display: "grid"}}>
                <Button 
                    onClick={changeQueueOrder_AND_playVideo} 
                    id={id} 
                    floated="left" 
                    size="mini" 
                    style={{ 
                        marginRight: "0px",
                        backgroundColor: "transparent",
                        padding: "3px" 
                    }}
                >
                        <FontAwesomeIcon icon={faAngleDoubleUp} size={"2x"} color={"#9a9a9a"} className={"list-item-angleDoubleUp-svg"} title="Move video to the top and instantly play it"/>
                </Button>
                <Button 
                    onClick={songDelete} 
                    id={id} 
                    floated="right" 
                    size="mini"  
                    style={{ 
                        marginBottom: "auto",
                        marginLeft: "0px",
                        backgroundColor: "transparent",
                        padding: "3px"
                    }}
                >
                        <FontAwesomeIcon icon={faTrashAlt} size={"2x"} color={"#9a9a9a"} className={"list-item-trash-svg"} title="Delete video from playlist"/>
                </Button>
            </div>
    </List.Item>
)

export default ListItem;