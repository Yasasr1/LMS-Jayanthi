import React , { Component } from 'react';
import { Typography, Divider, Button } from '@material-ui/core';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import SubjectList from '../StudentDash/SubjectList';
import SubjectDetails from '../StudentDash/SubjectDetails';
import fire from '../../components/firebase';


class StudentDash extends Component {
    state = {
        loading: true,
        subjects: null,
        selectedSubject: null,
        isSubjectSelected: false,
        user: null
    }

    componentDidMount() {
        if(this.state.loading === true) {
            const userRef = fire.database().ref('/users/' + this.props.uid).once('value').then((sp) => {
                let userData = sp.val()
                this.setState({
                    user: userData
                })
                //console.log(userData);
                const subjectRef = fire.database().ref('/subject').once('value').then((snapshot) => {
                    const subs = snapshot.val()[userData.grade]
                    if(subs != null){
                        this.setState({
                            subjects: subs,
                            loading: false
                        })
                    }
                    else{
                        this.setState({
                            loading: false
                        })
                    }
                    //console.log(snapshot.val()[userData.grade]);
                    //console.log(userData.grade);
                })
                .catch(err => {
                    console.log(err);
                })

            });



        }
    }

    selectSubject(title) {
        const subject = this.state.subjects.find((sub) => {
            return sub.title === title;
        })
        //console.log(subject);
        this.setState({
            selectedSubject: subject,
            isSubjectSelected: true
        })


        
    }
    

    render() {
    
        return(
           <div style={{
               backgroundColor: '#f0f0f0',
               height: '100vh'
           }}>
               <Header {...this.props}/>
               <div style={{
                   padding: '50px'
               }}>
                    {this.state.isSubjectSelected ? <Button onClick={()=> this.setState({isSubjectSelected: false})}>Back</Button> : null}
                    {!this.state.isSubjectSelected ? <Typography variant="h3" gutterBottom>Welcome,</Typography> : null}
                    <Divider/>
                    <br/>
                    {
                      this.state.loading === false && this.state.subjects === null ?   
                     <p>No subs</p>
                    : !this.state.isSubjectSelected 
                    ? 
                    <SubjectList subjects={this.state.subjects} selectSubject={(subject) => this.selectSubject(subject)}/> 
                    : 
                    <SubjectDetails subject={this.state.selectedSubject}/>
                    }
               </div>
           </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        uid: state.uid,
    }
}

export default connect(mapStateToProps,null)(StudentDash);