import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Avatar, IconButton } from '@material-ui/core';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import GetAppIcon from '@material-ui/icons/GetApp';

import fire from '../components/firebase';


const FileInfo = (props) => {

    const downloadHandler = () => {
        fire.storage().ref(props.path).getDownloadURL().then((url) => {
            window.open(url);
        }).catch((err) => {
            console.log(err);
        })
    }

    return(
        <ListItem>
            <ListItemAvatar>
            <Avatar>
                <InsertDriveFileIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText
            primary={props.name}
            />
            <ListItemSecondaryAction>
            <IconButton onClick={downloadHandler} edge="end" aria-label="delete">
                <GetAppIcon />
            </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default FileInfo;