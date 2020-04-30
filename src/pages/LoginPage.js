import React , { Component } from 'react';
import { Paper, TextField, Button, FormControl, FormGroup, FormControlLabel, FormLabel, Checkbox, FormHelperText} from '@material-ui/core';
//import background from '../assets/images/login_background.jpg';
import fire from '../components/firebase';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';




class LoginPage extends Component {
    state = {
        email: '',
        password: '',
        userType: 'student',
        redirect: null

    }

    setEmail = (event) => {
        this.setState({email: event.target.value});
    }

    setPassword = (event) => {
        this.setState({password: event.target.value});
    }

    loginHandler = () => {
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(res => {
            console.log(res);
            var user = fire.auth().currentUser;
            var id = user.uid
            this.props.onAuth(id, this.state.userType);
            this.setState({redirect: <Redirect to="/dashboard"/>})
        })
        .catch(err => {
            console.log(err);
            alert(err.message);
        })
    }

    render() {
        return(
            <div style={{
                width: '100%',
                height: '100vh',
                textAlign: 'center',
                //backgroundImage: `url(${background})`,
                //backgroundSize: 'contain'
                backgroundColor: 'cyan'
                
            }}>
                {this.state.redirect}
                <Paper square style={{
                    marginTop: '5%',
                    padding: '20px',
                    height: '80%',
                    width: '30%',
                    display: 'inline-block'
                }}>
                    <h3>Login</h3>
                    <br/>
                    <br/>
                    <TextField
                    id="email"
                    label="Email"
                    onChange={this.setEmail}
                    />
                    <br/>
                    <TextField
                    id="password"
                    label="Password"
                    type="password"
                    onChange={this.setPassword}
                    />
                    <br/>
                    <br/>
                    <Button onClick={this.loginHandler} variant="contained" color="primary">Login</Button>
                </Paper>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (token, userType) => dispatch({type: 'LOGIN', value: {token: token, userType: userType}})
    };
}

export default connect(null,mapDispatchToProps)(LoginPage);