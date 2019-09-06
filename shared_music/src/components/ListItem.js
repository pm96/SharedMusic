import React from 'react';
import { Container, List, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../styling/ListItemStyle.css';


const ListItem = ({title, uploader, songDelete, moveSong, id, changeQueueOrder_AND_playVideo}) => (
    <List.Item className="list-item" style={{ margin: "10px 0"}} onClick={changeQueueOrder_AND_playVideo} id={id}>
        <div style={{ display: "inline-block", float: "left", margin: "0 10px 0 0", width: "35px", textAlign: "center"}}>
            <button onClick={moveSong} id={'up'+id} style={{ border: "none", backgroundColor: "transparent" }}>
                <FontAwesomeIcon 
                    icon={faAngleUp}  
                    size={"2x"}
                    className={"sort-btn"} 
                    style={{ 
                        display: "block",
                        margin: "0 auto",
                        height: "28px", 
                        width: "28px", 
                    }}
                />
            </button>
            <button onClick={moveSong} id={'down'+id} style={{ border: "none", backgroundColor: "transparent" }}>
                <FontAwesomeIcon 
                    icon={faAngleDown} 
                    size={"2x"}
                    className={"sort-btn"}
                    style={{ 
                        display: "block",
                        margin: "0 auto",
                        height: "28px", 
                        width: "28px", 
                    }}
                />
            </button>
        </div>
        <Container>
            <List.Header as="a" style={{ marginBottom: "0" }}>
                {title}
            </List.Header>
            <List.Description style={{ display: "inline-block", width: "75%", float: "left" }}>
                <p style={{ marginRight: "5px", float:"left" }}>
                    <strong>Uploader:</strong> {uploader} 
                </p>
            </List.Description>
            <Button 
                onClick={songDelete} 
                id={id} 
                floated="right" 
                size="mini" 
                color="red" 
                style={{ 
                    marginBottom: "auto"
                }}
            >
                    <FontAwesomeIcon icon={faTrashAlt} size={"lg"} />
            </Button>
        </Container>
    </List.Item>
)

export default ListItem;