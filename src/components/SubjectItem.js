import React from 'react';
import { Paper, Typography, Divider}  from '@material-ui/core';
import ReactPlayer from "react-player"

const SubjectItem = (props) => {
    //console.log(props.videos)
    let videos = null;
    if(props.videos) {
        videos = props.videos.map((video) => {
            return <ReactPlayer style={{padding: '20px'}}
            url={video.url}/>
        
        })
    }
    
    return(
        <Paper style={{
            padding: '20px',
            marginBottom: '20px'

        }}>
            <Typography variant="h5">{props.title}</Typography>
            <br/>
            <Divider/>
            <Typography variant="h6">Videos</Typography>
            <br/>
            {videos}
            <br/>
            <Typography variant="h6">Downloads</Typography>
            <br/>
            <p>Display videos here..</p>
        </Paper>
    );
};

export default SubjectItem;