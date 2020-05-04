import React, { Component } from 'react';
import { Paper, Typography, Divider, Button, Grid, Modal, Backdrop, Fade, TextField, List, LinearProgress}  from '@material-ui/core';
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
        selectedFile: null,
        uploadProgress: 0
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

    //used to add video links
    addVideoHandler = () => {
        //console.log('/subject/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/topics/' + this.props.topicIndex + '/videos/' + this.state.NewVideoIndex)
        fire.database().ref('/subject/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/topics/' + this.props.topicIndex + '/videos/' + this.state.NewVideoIndex ).set({
            url: this.state.url
        }).then(res => {
            alert("Video added succesfully!");
            this.setState({
                videoModal: false
            })
            window.location.reload(true);
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
              <h3>File Details:</h3>
              <br/>
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
        if(this.state.selectedFile === null) {
            alert("Please select a file first!");
        }
        else {
            /*const storageRef = fire.storage().ref('/Documents/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/' + this.props.topicIndex + '/' + this.state.selectedFile.name)
            .put(this.state.selectedFile).then((res) => {
                const filePath = '/Documents/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/' + this.props.topicIndex + '/' + this.state.selectedFile.name;
                fire.database().ref('/subject/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/topics/' + this.props.topicIndex + '/files/' + this.state.newFilePathIndex ).set({
                    path: filePath,
                    name: this.state.selectedFile.name
                }).then(res => {
                    alert("file uploaded successfully");
                    this.setState({
                        docModal: false
                    })
                    window.location.reload(true);
                })
                .catch(err => {
                    console.log(err);
                })

            }).catch((err) => {
                alert("Error: Upload failed!");
            });*/
            const uploadTask = fire.storage().ref('/Documents/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/' + this.props.topicIndex + '/' + this.state.selectedFile.name)
            .put(this.state.selectedFile);

            uploadTask.on('state_changed',(snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({uploadProgress: progress});
            }, (error) => {
                alert("upload failed");
            }, () => {
                //this.setState({uploadProgress: 0})
                //alert("upload complete");
                const filePath = '/Documents/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/' + this.props.topicIndex + '/' + this.state.selectedFile.name;
                fire.database().ref('/subject/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/topics/' + this.props.topicIndex + '/files/' + this.state.newFilePathIndex ).set({
                    path: filePath,
                    name: this.state.selectedFile.name
                }).then(res => {
                    alert("Upload complete!");
                    this.setState({
                        docModal: false,
                        selectedFile: null,
                        uploadProgress: 0
                    })
                    window.location.reload(true);
                })
                .catch(err => {
                    console.log(err);
                })
            })
        }
        
    }


    //console.log(props.videos)
    render(){
        let videos = <p>No Youtube videos yet...</p>;
        if(this.props.videos) {
            if(!this.state.NewVideoIndex){
                this.setState({
                    NewVideoIndex: this.props.videos.length
                })
            }
            videos = this.props.videos.map((video, index) => {
                return <ReactPlayer key={index} style={{padding: '20px'}}
                url={video.url}/>
            
            })
        }

        let files = <p>No files yet...</p>;
        if(this.props.files) {
            if(!this.state.newFilePathIndex){
                this.setState({
                    newFilePathIndex: this.props.files.length
                })
            }
            files = this.props.files.map((file) => {
                console.log(file.name)
                return <FileInfo key={file.name} name={file.name} path={file.path}/>
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
                        {this.props.userType === 'teacher' ? <Button onClick={this.handleVideoModalOpen} style={{backgroundColor: 'green', color: 'white'}} startIcon={<AddIcon />}>Add Youtube Video</Button>
                        : null}
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
                                <h5>Add Youtube Video To The Topic</h5>
                                <Divider/>
                                <p>Paste the url of the youtube video you want to add</p>
                                <TextField onChange={this.setUrl} fullWidth label="Youtube Url"/>
                                <br/>
                                <br/>
                                {this.props.userType === 'teacher' ? <Button onClick={this.addVideoHandler} variant="contained" color="primary">Add Video</Button> : null}
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
                        <Typography variant="h6">Files</Typography>
                    </Grid>
                    <Grid item md={2}>
                        {this.props.userType === 'teacher' ? <Button onClick={this.handleDocModalOpen} style={{backgroundColor: 'green', color: 'white'}} startIcon={<AddIcon />}>Upload File</Button> :
                        null}
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
                                <h5>Add New File To The Topic</h5>
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
                                <br/>
                                <br/>
                                <LinearProgress variant="determinate" value={this.state.uploadProgress} />
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