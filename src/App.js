import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';


import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import StudentDash from './pages/StudentDash';


class App extends Component {

  

  render() {
    let routes = <Switch>
      <Route path="/" exact component={LoginPage}/>
      <Route path="/register" component={RegisterPage}/>
      <Route path="/dashboard" render={() => <h1>Not Found</h1>} />
    </Switch>

    if(this.props.uid && this.props.userType === 'student') {
      console.log("loggedin");
      routes = <Switch>
        <Route path="/" exact component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/dashboard" component={StudentDash}/>
      </Switch>
    }
    return (
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
      uid: state.uid,
      userType: state.userType
  }
}

export default connect(mapStateToProps,null)(App);
