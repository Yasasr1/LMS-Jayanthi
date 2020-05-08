import React from 'react';
import { Paper, Typography, IconButton, LinearProgress } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const SelectedFileInfo = (props) => {
    return (
        <Paper style={{padding: '5px', marginBottom: '5px', textAlign: 'start', overflow: 'hidden'}}>
            <Typography variant="caption">{props.fileName}</Typography>
            <IconButton style={{float: 'right'}} onClick={() => props.deleteSelectedFile(props.fileName)}>
                <DeleteIcon/>
            </IconButton>
            <br/>
            <LinearProgress variant="determinate" value={props.progress} />
        </Paper>
    );
};

export default SelectedFileInfo;