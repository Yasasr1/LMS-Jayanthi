import React from 'react';
import { Paper, Typography, Divider, Button, Grid, Modal, Backdrop, Fade, TextField}  from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ReactPlayer from "react-player"

const SubjectItem = (props) => {
    const [openVideoModal, setOpenVideoModal] = React.useState(false);

    const handleVideoModalOpen = () => {
        setOpenVideoModal(true);
    };

    const handleVideoModalClose = () => {
        setOpenVideoModal(false);
    };

    const addVideoHandler = () => {
        
    }

    //console.log(props.videos)
    let videos = null;
    if(props.videos) {
        videos = props.videos.map((video) => {
            return <ReactPlayer  style={{padding: '20px'}}
            url={video.url}/>
        
        })
    }
    
    return(
        <Paper style={{
            padding: '20px',
            marginBottom: '20px',
            overflow: 'auto'

        }}>
            <Typography variant="h5">{props.title}</Typography>
            <br/>
            <Divider/>
            <br/>
            <Grid container spacing={1}>
                <Grid item md={10}>
                    <Typography variant="h6">Videos</Typography>
                </Grid>
                <Grid item md={2}>
                    <Button onClick={handleVideoModalOpen} style={{backgroundColor: 'green', color: 'white'}} startIcon={<AddIcon />}>Add Video</Button>
                    <Modal
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px'
                        }}
                        open={openVideoModal}
                        onClose={handleVideoModalClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                    >
                        <Fade in={openVideoModal}>
                        <Paper style={{
                            textAlign: 'center',
                            padding: '20px'
                        }}>
                            <h5>Add New Video To The Topic</h5>
                            <Divider/>
                            <p>Paste the url of the youtube video you want to add</p>
                            <TextField fullWidth label="Youtube Url"/>
                            <br/>
                            <br/>
                            <Button onClick={addVideoHandler} variant="contained" color="primary">Add Video</Button>
                        </Paper>
                        </Fade>
                    </Modal>
                </Grid>
            </Grid>
            
            <br/>
            {videos}
            <br/>
            <Divider/>
            <br/>
            <Grid container spacing={1}>
                <Grid item md={10}>
                    <Typography variant="h6">Documents</Typography>
                </Grid>
                <Grid item md={2}>
                    <Button style={{backgroundColor: 'green', color: 'white'}} startIcon={<AddIcon />}>Upload Document</Button>
                </Grid>
            </Grid>
            <br/>
            <p>Display videos here..</p>
        </Paper>
    );
};

export default SubjectItem;