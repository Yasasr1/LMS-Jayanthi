import React , { Component } from 'react';
import { Paper, Divider, Button, Grid, Modal, Backdrop, Fade, TextField}  from '@material-ui/core';

import fire from '../../components/firebase';

class UpdateName extends Component {
    state = {
        open: false,
        newName: '',
        user: null,
        currentName: 'No username set ...'
    }

    componentDidMount =() => {
        fire.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({
                    ...this.state,
                    user: user,
                    currentName: user.displayName
                })
            }
            else{
                console.log("User not signed in")
            }
        })
    }

    openModal = () => {
        this.setState({
            open: true
        })
    }

    closeModal = () => {
        this.setState({
            open: false
        })
    }

    setName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    updateNameHandler = () => {
        if(this.state.user){
            this.state.user.updateProfile({
                displayName: this.state.name
            }).then((res) => {
                alert("User name updated!")
                this.setState({
                    open: false
                })
            })
        }
        else{
            console.log("User not signed in")
        }
    }


    render() {

        const modal = <Modal
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}
        open={this.state.open}
        onClose={this.closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
    >
        <Fade in={this.state.open}>
        <Paper style={{
            textAlign: 'center',
            padding: '20px'
        }}>
            <h5>Change User Name</h5>
            <Divider/>
            <br/>
            <TextField onChange={this.setName} label="Type new user name"/>
            <br/>
            <Button onClick={this.updateNameHandler}>Update</Button>
        </Paper>
        </Fade>
    </Modal>

        return(
            <div>
                <h6>{this.state.currentName}</h6>
                
                <Button onClick={this.openModal} varient="contained" color="primary">Update username</Button>
                {modal}
            </div>
               
        );
    }
};

export default UpdateName;