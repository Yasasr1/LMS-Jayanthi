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
        full_name: '',
        subjects: {
            Maths: false,
            Biology: false,
            Chemestry: false
        },
        user_type: 'student',
        redirect: null
    }

    setEmail = (event) => {
        this.setState({email: event.target.value});
    }

    setPassword = (event) => {
        this.setState({password: event.target.value});
    }

    setName = (event) => {
        this.setState({full_name: event.target.value});
    }

    setSubjects = (event) => {
        this.setState({
            ...this.state,
            subjects: {
                ...this.state.subjects,
                [event.target.name]: event.target.checked
            }
        }
        );
    }

    registrationHandler = () => {
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
            var user = fire.auth().currentUser;
            var id = user.uid
            this.props.onAuth(id, this.state.user_type);

            const newUser = {
                uid: id,
                user_type: this.state.user_type,
                full_name: this.state.full_name,
                subjects: this.state.subjects,
            }

            axios.post('https://project-lms-874a6.firebaseio.com/users.json',newUser)
            .then(res => {
                console.log(res);
                this.setState({redirect: <Redirect to="/dashboard"/>})
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch((err) => {
            console.log(err.message);
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
                backgroundColor: 'blue'
                
            }}>
                {this.state.redirect}
                <Paper square style={{
                    marginTop: '5%',
                    padding: '20px',
                    height: '80%',
                    width: '30%',
                    display: 'inline-block'
                }}>
                    <h3>Register</h3>
                    <br/>
                    <br/>
                    <TextField
                    id="full_name"
                    label="Full Name"
                    onChange={this.setName}
                    />
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
                    <FormControl component="fieldset" >
                        <FormLabel component="legend">Subjects</FormLabel>
                        <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={this.state.subjects.Maths} onChange={this.setSubjects} name="Maths" />}
                            label="Maths"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={this.state.subjects.Biology} onChange={this.setSubjects} name="Biology" />}
                            label="Biology"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={this.state.subjects.Chemestry} onChange={this.setSubjects} name="Chemestry" />}
                            label="Chemestry"
                        />
                        </FormGroup>
                        <FormHelperText>Select one or more</FormHelperText>
                    </FormControl>
                    <br/>
                    <br/>
                    <Button onClick={this.registrationHandler} variant="contained" color="primary">Register</Button>
                </Paper>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        token: state.counter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (token, userType) => dispatch({type: 'LOGIN', value: {token: token, userType: userType}})
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);