import React , { Component } from 'react';

import Header from '../../components/Header';


class StudentDash extends Component {

    

    render() {
        return(
           <div>
               <Header {...this.props}/>
               <h3>Student Dash</h3>
           </div>
        );
    }
}


export default StudentDash;