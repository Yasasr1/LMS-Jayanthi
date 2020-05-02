import React , { Component } from 'react';
//import background from '../assets/images/login_background.jpg';
import fire from '../components/firebase';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import "./LoginPage.css";
import logo from "../../src/assets/images/scl.jpeg"





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



<div id="login" className="banner h-100 ">
  <div className="d-flex justify-content-center h-100">
    <div className="user_card">
      <div className="d-flex justify-content-center">
        <div className="brand_logo_container">
          <img src={logo} className="brand_logo" alt="Logo" />
        </div>
      </div>
      <div className="d-flex justify-content-center form_container">
        <form>
          <div className="input-group mb-3">
            <div className="input-group-append">
              <span className="input-group-text"><i className="fas fa-at" /></span>
            </div>
            <input type="email"
                    id="email"
                    label="Email"
                    onChange={this.setEmail} className="form-control input_user" placeholder="student@gmail.com" />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-append">
              <span className="input-group-text"><i className="fas fa-key" /></span>
            </div>
            <input type="password" id="password"
                    label="Password"
                    type="password"
                    onChange={this.setPassword} className="form-control input_pass" placeholder="password" />
          </div>
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customControlInline" />
              <label className="custom-control-label text-white" htmlFor="customControlInline">Remember me</label>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3 login_container">
            <button type="button" onClick={this.loginHandler} className="btn login_btn">Login</button>
          </div>
        </form>
      </div>
      <div className="mt-4">
        <div className="d-flex justify-content-center links text-white">
          Don't have an account? <Link to="/register">Create an account</Link>
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