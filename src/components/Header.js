import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
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
                    <div style={{
                        position:"relative",
                        float:"inline-end"
                    }}>
                        <Typography variant="caption">UserName</Typography>
                        <Button onClick={this.handleLogout} color="inherit">Logout</Button>
                    </div>
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