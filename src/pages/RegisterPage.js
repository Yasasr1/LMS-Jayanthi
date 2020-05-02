import React , { Component } from 'react';
import { Paper, TextField, Button, FormControl, Select, MenuItem, InputLabel} from '@material-ui/core';
//import background from '../assets/images/login_background.jpg';
import fire from '../components/firebase';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import "./LoginPage.css";



class LoginPage extends Component {
    state = {
        email: '',
        password: '',
        full_name: '',
        grade: '',
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

    setGrade = (event) => {
        this.setState({
            grade: event.target.value
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
                grade: this.state.grade,
            }

            fire.database().ref('/users/' +id).set({
                user_type: this.state.user_type,
                full_name: this.state.full_name,
                grade: this.state.grade

            }).then(res => {
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
                // backgroundColor: 'blue',
                
            }}>
                {this.state.redirect}
                {/* <Paper square style={{
                    marginTop: '5%',
                    padding: '20px',
                    height: '80%',
                    width: '30%',
                    display: 'inline-block',

                }}> */}



<div id="register" className="banner">
  {/* <h3 className="text-center text-black pt-5">Login form</h3> */}
  <div className="container">
    <div id="login-row" className="row justify-content-center align-items-center">
      <div id="login-column" className="col-md-6">
        <div id="login-box" className="col-md-12">
         
            <h3 className="text-center text-white pt-3">LMS Registration</h3>
            <div className="form-group">
              <label htmlFor="fname" className="text-white ">Full Name:</label><br />
              <input type="text"
                     id="full_name"
                     label="Full Name"
                     onChange={this.setName}
                    />
            </div>
            <div className="form-group">
              <label htmlFor="username" className="text-white ">Email:</label><br />
              <input type="email"
                    id="email"
                    label="Email"
                    onChange={this.setEmail}
                    />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-white">Password:</label><br />
              <input type="password" id="password"
                    label="Password"
                    type="password"
                    onChange={this.setPassword} />
            </div>
            <div className="form-group">
            <label id="demo-simple-select-label" className="text-white">Grade : </label><br />
            <FormControl component="fieldset" style={{width: '100%'}} >
                            <Select
                            labelId="Grade"
                            id="grade"
                            value={this.state.grade}
                            onChange={this.setGrade}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={11}>11</MenuItem>
                            </Select>
                        </FormControl>
                </div>
            <div className="form-group">
              <Button onClick={this.registrationHandler} variant="contained" color="primary">Register</Button>
            </div>
            
       
        </div>
      </div>
    </div>
  </div>
</div>













                    {/* <h3>Register</h3>
                    <br/>
                    <br/>
                    <div style={{
                        width: '100%',
                    }}>
                        <TextField
                        fullWidth
                        id="full_name"
                        label="Full Name"
                        onChange={this.setName}
                        />
                        <br/>
                        <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        onChange={this.setEmail}
                        />
                        <br/>
                        <TextField
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        onChange={this.setPassword}
                        />
                        <br/>
                        <br/>
                        <FormControl component="fieldset" style={{width: '100%'}} >
                            <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                            <Select
                            labelId="Grade"
                            id="grade"
                            value={this.state.grade}
                            onChange={this.setGrade}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={11}>11</MenuItem>
                            </Select>
                        </FormControl>
                        <br/>
                        <br/>
                        <Button onClick={this.registrationHandler} variant="contained" color="primary">Register</Button>
                    </div> */}
                {/* </Paper> */}
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