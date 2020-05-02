import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import StudentDash from './pages/StudentDash/StudentDash';
import TeacherDash from './pages/TeacherDash/TeacherDash';


class App extends Component {
 

  componentDidMount(){
    this.props.checkLocal();

  }
  
  render() {
    let routes = <Switch>
      <Route path="/" exact component={LoginPage}/>
      <Route path="/register" component={RegisterPage}/>
      <Route path="/dashboard" render={() => <h1>Not Found</h1>} />
    </Switch>

    if(this.props.uid && this.props.userType === 'student') {
      routes = <Switch>
        <Route path="/" exact component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/dashboard" component={StudentDash}/>
      </Switch>
    }

    if(this.props.uid && this.props.userType === 'teacher') {
      routes = <Switch>
        <Route path="/" exact component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/dashboard" component={TeacherDash}/>
      </Switch>
    }

    return (
      <HashRouter>
        {routes}
      </HashRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
      uid: state.uid,
      userType: state.userType
  }
}


const mapDispatchToProps = dispatch => {
  return {
      checkLocal: () => dispatch({type: 'CHECKLOCAL'})
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
