import React , { Component } from 'react';
import { Typography, Divider, Button } from '@material-ui/core';


import Header from '../../components/Header';
import SubjectList from '../StudentDash/SubjectList';
import SubjectDetails from '../StudentDash/SubjectDetails';
import fire from '../../components/firebase';


class StudentDash extends Component {
    state = {
        loading: true,
        subjects: null,
        selectedSubject: null,
        isSubjectSelected: false
    }

    componentDidMount() {
        if(this.state.loading === true) {
            const ref = fire.database().ref('/subjects').once('value').then((snapshot) => {
                this.setState({
                    subjects: snapshot.val(),
                    loading: false
                })
            })
            .catch(err => {
                console.log(err);
            })

        }
    }

    selectSubject(title) {
        this.setState({
            selectedSubject: title,
            isSubjectSelected: true
        })

        
    }
    

    render() {
        
        return(
           <div>
               <Header {...this.props}/>
               {this.state.redirect}
               <div style={{
                   padding: '50px'
               }}>
                    <Typography variant="h3" gutterBottom>Welcome,</Typography>
                    <Divider/>
                    <br/>
                    {this.state.isSubjectSelected ? <Button onClick={()=> this.setState({isSubjectSelected: false})}>Back</Button> : null}
                    <br/>
                    {
                    !this.state.isSubjectSelected 
                    ? 
                    <SubjectList subjects={this.state.subjects} selectSubject={(subject) => this.selectSubject(subject)}/> 
                    : 
                    <SubjectDetails title={this.state.selectedSubject}/>
                    }
               </div>
           </div>
        );
    }
}


export default StudentDash;