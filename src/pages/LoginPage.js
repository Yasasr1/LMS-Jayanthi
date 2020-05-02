import React , { Component } from 'react';
import { Paper, TextField, Button, FormControl, FormGroup, FormControlLabel, FormLabel, Checkbox, FormHelperText} from '@material-ui/core';
//import background from '../assets/images/login_background.jpg';
import fire from '../components/firebase';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import "./LoginPage.css";





class LoginPage extends Component {
    state = {
        email: '',
        password: '',
        userType: '',
        redirect: null

    }

    componentDidMount(){
        this.props.checkLocal();
        if(this.props.uid != null) {
          console.log("HEREEEEEE")
          this.setState({
            redirect : <Redirect to="/dashboard"/>
          })
        }
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

            const userRef = fire.database().ref('/users/' + id).once('value').then((snapshot) => {
                this.setState({
                    userType: snapshot.val().user_type
                });
                this.props.onAuth(id, this.state.userType);
                this.setState({redirect: <Redirect to="/dashboard"/>})
            })
        })
        .catch(err => {
            console.log(err);
            alert(err.message);
        })
    }

    render() {
        let redirect = null;
        if(this.props.isLoggedin) {
            redirect = <Redirect to="/dashboard"/>
        }

        return(
            <div  style={{
                width: '100%',
                height: '100vh',
                textAlign: 'center',
                //backgroundImage: `url(${background})`,
                //backgroundSize: 'contain'
                // backgroundColor: 'cyan'
                
            }}>

                
                
                
                {this.state.redirect}
                {redirect}
                {/* <Paper square style={{
                    marginTop: '5%',
                    padding: '20px',
                    height: '80%',
                    width: '30%',
                    display: 'inline-block'
                }}> */}


<div id="login" className="banner">
  {/* <h3 className="text-center text-black pt-5">Login form</h3> */}
  <div className="container">
    <div id="login-row" className="row justify-content-center align-items-center">
      <div id="login-column" className="col-md-6">
        <div id="login-box" className="col-md-12">
         
            <h3 className="text-center text-white pt-3">Welcome To LMS</h3>
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
            <div id="register-link" className="text-center">
                   <Link to="/register">Create an account</Link>
            </div>
              <label htmlFor="remember-me" className="text-info"><span>Remember me</span>&nbsp;<span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br />
              <Button onClick={this.loginHandler} variant="contained" color="primary">Login</Button>
            </div>
            
       
        </div>
      </div>
    </div>
  </div>
</div>





                    {/* <h3>Login</h3>
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
                    <Link to="/register">Create an account</Link>
                    <br/>
                    <br/>
                    <Button onClick={this.loginHandler} variant="contained" color="primary">Login</Button>
                </Paper> */}
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (token, userType) => dispatch({type: 'LOGIN', value: {token: token, userType: userType}}),
        checkLocal: () => dispatch({type: 'CHECKLOCAL'})
    };
}

const mapStateToProps = state => {
    return {
        isLoggedin: state.uid != null,
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);