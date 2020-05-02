import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import fire from './firebase';



class Header extends Component {
    state = {
        username: ''
    }

    componentDidMount(){

        fire.auth().onAuthStateChanged((user) => {
            if(user){
                if(user.displayName){
                    this.setState({
                        username: user.displayName
                    })
                }
            }
            else{
                console.log("User not signed in")
            }
        })
    }

    handleLogout = () => {
        fire.auth().signOut().then((res) => {
            console.log("sign Out: "+res);
        }).catch((err) =>{
            console.log(err);
        })
        this.props.onLogout();
        this.props.history.replace('/');
    
    }

    render(){
        return (
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Grid container justify="flex-end" spacing={2}>
                        <Grid item>
                            <Typography variant="overline">{this.state.username}</Typography>
                        </Grid>
                        <Grid item>
                            <Button onClick={this.handleLogout} color="inherit">Logout</Button>
                        </Grid>
                    </Grid> 
                </Toolbar>

            </AppBar>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch({type:'LOGOUT'})
    };
}

export default connect(null,mapDispatchToProps)(Header);