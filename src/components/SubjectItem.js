import React, { Component } from 'react';
import { Paper, Typography, Divider, Button, Grid, Modal, Backdrop, Fade, TextField, List}  from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ReactPlayer from "react-player";
import { connect } from 'react-redux';
import windowSize from 'react-window-size';

import fire from '../components/firebase';
import FileInfo from './FileInfo';
import SelectedFileInfo from '../components/SelectedFileInfo';


class SubjectItem extends Component {
    state = {
        url: '',
        videoModal: false,
        docModal: false,
        NewVideoIndex: 0,
        newFilePathIndex: 0,
        selectedFiles: [],
        uploadProgress: []
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
        let files = this.state.selectedFiles;
        let progress = this.state.uploadProgress;
        let isFileDuplicated = false;
        console.log(files);

        if(files.length > 0) {
            files.forEach((file) => {
                if(file.name === event.target.files[0].name){
                    isFileDuplicated = true;
                }
            })
        }
        console.log(isFileDuplicated);
        if(!isFileDuplicated){
            files.push(event.target.files[0]);
            progress.push(0);
            console.log(files);

            this.setState({
                selectedFiles: files,
                uploadProgress: progress
            })
        } else {
            alert("File already selected!");
        }
        
    }

    deleteSelectedFile = (name) => {
        let files = this.state.selectedFiles;
        let index = files.findIndex((file) => {
            return file.name === name
        });

        files.splice(index,1);
        this.setState({
            selectedFiles: files
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

    //not used 
    uploadOneItem = (file) => {
        /*const initialFilePathIndex = this.state.newFilePathIndex;
        const uploadTask = fire.storage().ref('/Documents/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/' + this.props.topicIndex + '/' + file.name)
            .put(file);

            uploadTask.on('state_changed',(snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({uploadProgress: progress});
            }, (error) => {
                console.log(error);
            }, () => {
                const filePath = '/Documents/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/' + this.props.topicIndex + '/' + file.name;
                fire.database().ref('/subject/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/topics/' + this.props.topicIndex + '/files/' + this.state.newFilePathIndex ).set({
                    path: filePath,
                    name: file.name
                }).then(res => {
                    this.setState({
                        uploadProgress: 0,
                        newFilePathIndex: initialFilePathIndex + 1
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            })*/
        
            const initialFilePathIndex = this.state.newFilePathIndex;
            return fire.storage().ref('/Documents/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/' + this.props.topicIndex + '/' + file.name)
                .put(file).then(res => {
                    const filePath = '/Documents/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/' + this.props.topicIndex + '/' + file.name;
                    fire.database().ref('/subject/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/topics/' + this.props.topicIndex + '/files/' + this.state.newFilePathIndex ).set({
                        path: filePath,
                        name: file.name
                    }).then(res => {
                        this.setState({
                            uploadProgress: 0,
                            newFilePathIndex: initialFilePathIndex + 1
                        })
                    })
                    console.log("one done!")
                }).catch(err => {
                    console.log(err);
                });

                /*uploadTask.on('state_changed',(snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.setState({uploadProgress: progress});
                }, (error) => {
                    console.log(error);
                }, () => {
                    const filePath = '/Documents/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/' + this.props.topicIndex + '/' + file.name;
                    fire.database().ref('/subject/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/topics/' + this.props.topicIndex + '/files/' + this.state.newFilePathIndex ).set({
                        path: filePath,
                        name: file.name
                    }).then(res => {
                        this.setState({
                            uploadProgress: 0,
                            newFilePathIndex: initialFilePathIndex + 1
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
                })*/
        
    }

    uploadFileHandler = () => {
        if(this.state.selectedFiles.length === 0) {
            alert("Please select a file first!");
        }
        else {
            const promises = [];
            this.state.selectedFiles.forEach((file, index) => {
                const initialFilePathIndex = this.state.newFilePathIndex;
                let uploadprogress = this.state.uploadProgress;
                const uploadTask = fire.storage().ref('/Documents/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/' + this.props.topicIndex + '/' + file.name).put(file);

                promises.push(uploadTask);
                uploadTask.on('state_changed',(snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploadprogress[index] = progress
                    this.setState({uploadProgress: uploadprogress});
                }, (error) => {
                    console.log(error);
                }, () => {
                    const filePath = '/Documents/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/' + this.props.topicIndex + '/' + file.name;
                    fire.database().ref('/subject/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/topics/' + this.props.topicIndex + '/files/' + this.state.newFilePathIndex ).set({
                        path: filePath,
                        name: file.name
                    }).then(res => {
                        this.setState({
                            newFilePathIndex: initialFilePathIndex + 1
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
                })
            });

            Promise.all(promises)
            .then(() => {
                alert("All files uploaded successfully");
                this.setState({
                    docModal: false,
                    selectedFiles: [],
                    uploadProgress: 0
                })
                window.location.reload(true);
            })
            .catch(err => {
                console.log(err);
            })

            /*for(let i=0; i < this.state.selectedFiles.length; i++) {
                this.uploadOneItem(this.state.selectedFiles[i]);
            }
            alert("All files uploaded successfully");
                this.setState({
                    docModal: false,
                    selectedFiles: [],
                    uploadProgress: 0
                })
                window.location.reload(true);*/
           /*Promise.all(
                this.state.selectedFiles.forEach((file) => {
                    this.uploadOneItem(file);
                })
           ).then(res => {
                alert("All files uploaded successfully");
                this.setState({
                    docModal: false,
                    selectedFiles: [],
                    uploadProgress: 0
                })
                window.location.reload(true);
           }).catch(error => {
                console.log(error.message)
           })*/
           
           /*.then((res) => {
            alert("All files uploaded successfully");
            this.setState({
                docModal: false,
                selectedFiles: [],
                uploadProgress: 0
            })
            window.location.reload(true);
          })
          .catch((error) => {
            console.log(`Some failed to upload: `, error.message)
          });*/
        }
        
    }

    render(){
        let videos = <p>No Youtube videos yet...</p>;
        if(this.props.videos) {
            if(!this.state.NewVideoIndex){
                this.setState({
                    NewVideoIndex: this.props.videos.length
                })
            }
            videos = this.props.videos.map((video, index) => {
                return <ReactPlayer width={this.props.windowWidth * 0.8} key={index} style={{padding: '20px'}}
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

        let selectedFiles = <p>No files selected</p>;
        if(this.state.selectedFiles.length > 0) {
            selectedFiles = this.state.selectedFiles.map((file, index) => {
                return <SelectedFileInfo progress={this.state.uploadProgress[index]} key={file.name} deleteSelectedFile={(fileName) => this.deleteSelectedFile(fileName)} fileName={file.name}/>
            });
        }
        return(
            <Paper style={{
                padding: '20px',
                marginBottom: '20px',
                overflow: 'auto'
    
            }}>
                <Typography style={{fontSize: '18'}} variant="h5">{this.props.title}</Typography>
                <br/>
                <Divider/>
                <br/>
                <Grid container spacing={1}>
                    <Grid item md={10}>
                        <Typography style={{fontSize: '12'}} variant="h6">Videos</Typography>
                    </Grid>
                    <Grid item md={2}>
                        {this.props.userType === 'teacher' ? <Button size="small" onClick={this.handleVideoModalOpen} style={{backgroundColor: 'green', color: 'white'}} startIcon={<AddIcon />}>Add Youtube Video</Button>
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
                        <Typography style={{fontSize: '12'}} variant="h6">Files</Typography>
                    </Grid>
                    <Grid item md={2}>
                        {this.props.userType === 'teacher' ? <Button size="small" onClick={this.handleDocModalOpen} style={{backgroundColor: 'green', color: 'white'}} startIcon={<AddIcon />}>Upload Files</Button> :
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
                                <h5>Add New Files To The Topic</h5>
                                <Divider/>
                                <br/>
                                <Button
                                variant="contained"
                                component="label"
                                >
                                Choose Files
                                <input
                                    type="file"
                                    onChange={this.selectFileHandler}
                                    style={{ display: "none" }}
                                />
                                </Button>
                                <br/>
                                <br/>
                                <div style={{backgroundColor: 'grey', minHeight: '100px', padding: '25px'}}>
                                    {selectedFiles}
                                </div>
                                <Divider/>
                                <br/>
                                <p>Select one or more files to upload</p>
                                <br/>
                                <Button onClick={this.uploadFileHandler}>Upload</Button>
                                <br/>
                                <br/>
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



export default connect(mapStateToProps,mapDispatchToProps)(windowSize(SubjectItem));