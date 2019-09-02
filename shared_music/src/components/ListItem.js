import React from 'react';
import { Header, Container, List, Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faMinus } from '@fortawesome/free-solid-svg-icons';


const ListItem = ({title, length, uploader}) => (
    <List.Content className="list-item">
        <div style={{ display: "inline-block", float: "left", margin: "0 10px"}}>
            <FontAwesomeIcon icon={faAngleUp} style={{ display: "block"}}/>
            <FontAwesomeIcon icon={faAngleDown} />
        </div>
        <Container>
            <List.Header as="a" style={{ marginBottom: "0" }}>{title}</List.Header>
            <List.Description style={{ display: "flex" }}>
                <p style={{ marginRight: "5px", width: "200px", float:"left" }}><strong>Uploader:</strong> {uploader} </p><p><strong>Length: </strong>{length}</p>
                <Button floated="right" size="mini" color="red"  style={{ marginLeft: "20px", marginBottom: "auto"}}><FontAwesomeIcon icon={faMinus} size={"xs"} /></Button>
            </List.Description>
        </Container>
    </List.Content>
)

export default ListItem;