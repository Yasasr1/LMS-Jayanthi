import React, { Component } from 'react';
import { Paper, Typography, Divider, Button, Grid, Modal, Backdrop, Fade, TextField, List}  from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ReactPlayer from "react-player";
import { connect } from 'react-redux';

import fire from '../components/firebase';
import FileInfo from './FileInfo';


class SubjectItem extends Component {
    state = {
        url: '',
        videoModal: false,
        docModal: false,
        NewVideoIndex: 0,
        newFilePathIndex: 0,
        selectedFile: null
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

    handleDocModalOpen = () => {
        this.setState({
            docModal: true
        })
    }

    handleDocModalClose = () => {
        this.setState({
            docModal: false
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

    selectFileHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    //display selected file data
    fileData = () => { 
     
        if (this.state.selectedFile) { 
            
          return ( 
            <div> 
              <h2>File Details:</h2> 
              <p>File Name: {this.state.selectedFile.name}</p> 
              <p>File Type: {this.state.selectedFile.type}</p> 
              <p> 
                Last Modified:{" "} 
                {this.state.selectedFile.lastModifiedDate.toDateString()} 
              </p> 
            </div> 
          ); 
        } else { 
          return ( 
            <div> 
              <br /> 
              <h4>Choose before Pressing the Upload button</h4> 
            </div> 
          ); 
        } 
    }

    uploadFileHandler = () => {
        //console.log('/subject/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/topics/' + this.props.topicIndex + '/files/' + this.state.newFilePathIndex )
        const storageRef = fire.storage().ref('/Documents/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/' + this.props.topicIndex + '/' + this.state.selectedFile.name)
        .put(this.state.selectedFile).then((res) => {
            //console.log(res);
            const filePath = '/Documents/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/' + this.props.topicIndex + '/' + this.state.selectedFile.name;
            //console.log(filePath);
            fire.database().ref('/subject/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/topics/' + this.props.topicIndex + '/files/' + this.state.newFilePathIndex ).set({
                path: filePath,
                name: this.state.selectedFile.name
            }).then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })

        }).catch((err) => {
            console.log(err);
        });
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

        let files = <p>No files...</p>;
        if(this.props.files) {
            if(!this.state.newFilePathIndex){
                this.setState({
                    newFilePathIndex: this.props.files.length
                })
            }
            files = this.props.files.map((file) => {
                console.log(file.name)
                return <FileInfo key={file.path} name={file.name} path={file.path}/>
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
                        <Button onClick={this.handleDocModalOpen} style={{backgroundColor: 'green', color: 'white'}} startIcon={<AddIcon />}>Upload Document</Button>
                        <Modal
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '20px'
                            }}
                            open={this.state.docModal}
                            onClose={this.handleDocModalClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                        >
                            <Fade in={this.state.docModal}>
                            <Paper style={{
                                textAlign: 'center',
                                padding: '20px'
                            }}>
                                <h5>Add New Document To The Topic</h5>
                                <Divider/>
                                <br/>
                                <Button
                                variant="contained"
                                component="label"
                                >
                                Choose File
                                <input
                                    type="file"
                                    onChange={this.selectFileHandler}
                                    style={{ display: "none" }}
                                />
                                </Button>
                                <br/>
                                {this.fileData()}
                                <Divider/>
                                <br/>
                                <Button onClick={this.uploadFileHandler}>Upload</Button>
                            </Paper>
                            </Fade>
                        </Modal>
                    </Grid>
                </Grid>
                <br/>
                <List dense>
                    {files}
                </List>
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
        selectedSubject: state.teacher.selectedSubject,
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(SubjectItem);