import React, { Component } from 'react';
import { Paper, Typography, Divider, Button, Grid, Modal, Backdrop, Fade, TextField}  from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ReactPlayer from "react-player";
import { connect } from 'react-redux';

import fire from '../components/firebase';


class SubjectItem extends Component {
    state = {
        url: '',
        videoModal: false,
        NewVideoIndex: 0
    }

    componentDidMount() {
        this.props.setSelectedTopic(this.props.topicIndex);
    }

    handleVideoModalOpen = () => {
        this.setState({
            videoModal: true
        })
    }

    handleVideoModalClose = () => {
        this.setState({
            videoModal: false
        })
    }

    setUrl = (event) => {
        this.setState({
            url: event.target.value
        })
    }

    addVideoHandler = () => {
        //console.log('/subject/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/topics/' + this.props.topicIndex + '/videos/' + this.state.NewVideoIndex)
        fire.database().ref('/subject/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/topics/' + this.props.topicIndex + '/videos/' + this.state.NewVideoIndex ).set({
            url: this.state.url
        }).then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    //console.log(props.videos)
    render(){
        let videos = null;
        if(this.props.videos) {
            if(!this.state.NewVideoIndex){
                this.setState({
                    NewVideoIndex: this.props.videos.length
                })
            }
            videos = this.props.videos.map((video) => {
                return <ReactPlayer key={video.url} style={{padding: '20px'}}
                url={video.url}/>
            
            })
        }
        return(
            <Paper style={{
                padding: '20px',
                marginBottom: '20px',
                overflow: 'auto'
    
            }}>
                <Typography variant="h5">{this.props.title}</Typography>
                <br/>
                <Divider/>
                <br/>
                <Grid container spacing={1}>
                    <Grid item md={10}>
                        <Typography variant="h6">Videos</Typography>
                    </Grid>
                    <Grid item md={2}>
                        <Button onClick={this.handleVideoModalOpen} style={{backgroundColor: 'green', color: 'white'}} startIcon={<AddIcon />}>Add Video</Button>
                        <Modal
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '20px'
                            }}
                            open={this.state.videoModal}
                            onClose={this.handleVideoModalClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                        >
                            <Fade in={this.state.videoModal}>
                            <Paper style={{
                                textAlign: 'center',
                                padding: '20px'
                            }}>
                                <h5>Add New Video To The Topic</h5>
                                <Divider/>
                                <p>Paste the url of the youtube video you want to add</p>
                                <TextField onChange={this.setUrl} fullWidth label="Youtube Url"/>
                                <br/>
                                <br/>
                                <Button onClick={this.addVideoHandler} variant="contained" color="primary">Add Video</Button>
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
    }
    
   
};

const mapDispatchToProps = dispatch => {
    return {
        setSelectedTopic: (topic) => dispatch({type: 'SET_TOPIC', value: {topic: topic}})
    };
}

const mapStateToProps = state => {
    return {
        selectedGrade: state.teacher.selectedGrade,
        selectedSubject: state.teacher.selectedSubject
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(SubjectItem);