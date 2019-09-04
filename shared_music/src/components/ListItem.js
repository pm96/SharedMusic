import React from 'react';
import { Container, List, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const ListItem = ({title, length, uploader, songDelete, id}) => (
    <List.Item className="list-item" style={{ margin: "10px 0"}}>
        <div style={{ display: "inline-block", float: "left", margin: "0 10px"}}>
            <FontAwesomeIcon icon={faAngleUp}  size={"lg"} style={{ display: "block"}}/>
            <FontAwesomeIcon icon={faAngleDown} size={"lg"}/>
        </div>
        <Container>
            <List.Header as="a" style={{ marginBottom: "0" }}>{title}</List.Header>
            <List.Description style={{ display: "inline-block", width: "75%", float: "left" }}>
                <p style={{ marginRight: "5px", width: "60%", float:"left" }}><strong>Uploader:</strong> {uploader} </p><p style={{ float: "right"}}><strong>Length: </strong>{length}</p>
            </List.Description>
            <Button 
                onClick={songDelete} 
                id={id} floated="right" 
                size="mini" color="red" 
                style={{ marginBottom: "auto"}}>
                    <FontAwesomeIcon icon={faTrashAlt} size={"lg"} />
            </Button>
        </Container>
    </List.Item>
)

export default ListItem;