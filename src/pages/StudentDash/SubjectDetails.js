import React, { Component } from 'react';
import SubjectItem from '../../components/SubjectItem';
import { Paper, Divider, Button, Grid, Modal, Backdrop, Fade, TextField}  from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { connect } from 'react-redux';

import fire from '../../components/firebase';


class SubjectDetails extends Component {
    state = {
        openModal: false,
        topic: '',
        newTopicIndex: 0
    }
    

    handleModalClose = () => {
        this.setState({
            openModal: false
        })
    }

    handleModalOpen = () => {
        this.setState({
            openModal: true
        })
    }

    getTopic = (event) => {
        this.setState({
            topic: event.target.value
        })
    }

    addTopicHandler = () => {
        //console.log('/subject/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/topics/' + this.state.newTopicIndex);
        fire.database().ref('/subject/' + this.props.selectedGrade + '/' + this.props.selectedSubject + '/topics/' + this.state.newTopicIndex).set({
            topic: this.state.topic
        }).then(res => {
            alert("New topic added successfully");
            this.setState({
                openModal: false
            })
            window.location.reload(true);

            
        })
        .catch(err => {
            alert("Error: Failed to add topic !");
        })
    }

    render(){
        let topics = <p>No topics...</p>
        if(this.props.subject.topics) {
            if(!this.state.newTopicIndex){
                //to find out the index that the new topic should go to
                this.setState({
                    newTopicIndex: this.props.subject.topics.length
                })
            }
            topics = this.props.subject.topics.map(((topic, index) => {
                return <SubjectItem userType={this.props.userType} key={index} title={topic.topic} videos={topic.videos} files={topic.files} topicIndex={index}/>
            }))
        }
        
        return(
            <div style={{
                
            }}>
                <Grid container spacing={1}>
                    <Grid item md={10}>
                        <h2>{this.props.subject.title}</h2>
                    </Grid>
                    <Grid item md={2}>
                        {this.props.userType === 'teacher' ? <Button onClick={this.handleModalOpen} startIcon={<CreateIcon />} variant="contained" color="primary">New Topic</Button>
                         : null }
                        <Modal
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '20px'
                            }}
                            open={this.state.openModal}
                            onClose={this.handleModalClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                        >
                            <Fade in={this.state.openModal}>
                            <Paper style={{
                                textAlign: 'center',
                                padding: '20px'
                            }}>
                                <h5>Add a New Topic</h5>
                                <Divider/>
                                <p>Type the new topic title</p>
                                <TextField onChange={this.getTopic} fullWidth label="Title"/>
                                <br/>
                                <br/>
                                <Button onClick={this.addTopicHandler} variant="contained" color="primary">Add Topic</Button>
                            </Paper>
                            </Fade>
                        </Modal>
                    </Grid>

                </Grid>
                {topics}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        selectedGrade: state.teacher.selectedGrade,
        selectedSubject: state.teacher.selectedSubject,
        userType: state.userType
    }
}


export default connect(mapStateToProps,null)(SubjectDetails);