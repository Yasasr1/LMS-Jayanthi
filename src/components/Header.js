import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';



class Header extends Component {
    

    handleLogout = () => {
        this.props.onLogout();
        this.props.history.replace('/');
    
    }

    render(){
        return (
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Grid container justify="flex-end" spacing={2}>
                        <Grid item>
                            <Typography variant="caption">UserName</Typography>
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