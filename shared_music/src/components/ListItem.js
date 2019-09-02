import React from 'react';

const ListItem = ({title, length, uploader}) => (
    <li className="list-item">
        <h3 style={{ marginBottom: "0" }}>{title}</h3>
        <div style={{ display: "flex", marginLeft: "15px" }}>
            <p style={{ marginRight: "5px", width: "200px" }}><strong>Uploader:</strong> {uploader} </p><p><strong>Length: </strong>{length}</p>
        </div>
        {/* <ListButton /> */}
    </li>
)

export default ListItem;