import React, { Component } from 'react';
import { ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Avatar, IconButton } from '@material-ui/core';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import GetAppIcon from '@material-ui/icons/GetApp';

import fire from '../components/firebase';


class FileInfo extends Component {
    state = {
        url : ''
    }


    downloadHandler = () => {
        
    }

    componentDidMount(){
        fire.storage().ref(this.props.path).getDownloadURL().then((url) => {
            //window.open(url);
            this.setState({
                url : url
            })

        }).catch((err) => {
            console.log(err);
        })
    }

    render(){
        return(
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <InsertDriveFileIcon />
                </Avatar>
                </ListItemAvatar>
                <a href={this.state.url}>{this.props.name}</a>
                <ListItemSecondaryAction>
                <IconButton onClick={this.downloadHandler} edge="end" aria-label="delete">
                    <GetAppIcon />
                </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

};

export default FileInfo;