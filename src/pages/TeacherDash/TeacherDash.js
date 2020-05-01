import React, { Component } from 'react';
import { Typography, Divider, Button, GridList, GridListTile } from '@material-ui/core';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import fire from '../../components/firebase';
import SubjectTile from '../../components/SubjectTile';
import SubjectDetails from '../StudentDash/SubjectDetails';

class TeacherDash extends Component {
    state = {
        isSubjectSelected: false,
        isGradeSelected: false,
        loading: true,
        subjects: null,
        selectedGrade: null,
        selectedGradeIndex: null,
        selectedSubjectIndex: null,
        selectedSubject: null
    }

    componentDidMount() {
        if(this.state.loading === true) {
            const subjectRef = fire.database().ref('/subject').once('value').then((snapshot) => {
                const subs = snapshot.val()
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
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    gradeSelectHandler(grade) {
        //console.log(grade)
        const gradeData = this.state.subjects[grade];
        this.setState({
            selectedGrade: gradeData,
            selectedGradeIndex: grade,
            isGradeSelected: true
        })
    }

    subjectSelectHandler(title) {
        console.log(title);
        const subject = this.state.selectedGrade.find((sub, index) => {
            if(sub.title === title.title) {
                this.setState({selectedSubjectIndex: index});
                return sub;
            }
            
        })
        console.log(subject);
        this.setState({
            selectedSubject: subject,
            isSubjectSelected: true
        })


        
    }

    render() {
        //saving the selected grade and subject to redux
        if(this.state.selectedGrade && this.state.selectedSubject) {
            this.props.setGradeSubject(this.state.selectedGradeIndex, this.state.selectedSubjectIndex);
        }

        let data = <p>loading...</p>

        if(this.state.subjects) {
            let array = Array.from(this.state.subjects);
            data = array.map((grade, index) => {
                //because in database grade starts from index 1
                if(grade){
                    return <GridListTile key={index}>
                        <SubjectTile isGrade={true} selector={(grade) => this.gradeSelectHandler(grade)} title={index}/>
                    </GridListTile>
                    
                }
            })
        }

        if(this.state.isGradeSelected) {
            data = this.state.selectedGrade.map((subject) => {
                return <GridListTile key={subject.title}>
                    <SubjectTile isGrade={false} title={subject.title} selector={() => this.subjectSelectHandler(subject)}/>
                </GridListTile>
            })
        }

        if(this.state.isSubjectSelected) {
            data = <SubjectDetails subject={this.state.selectedSubject}/>
        }
        return(
            <div>
                <Header {...this.props}/>
                <div style={{
                   padding: '50px'
               }}>
                    {this.state.isSubjectSelected ? <Button onClick={()=> this.setState({isSubjectSelected: false})}>Back</Button> : null}
                    {!this.state.isSubjectSelected ? <Typography variant="h3" gutterBottom>Dashboard</Typography> : null}
                    {this.state.isGradeSelected && !this.state.isSubjectSelected ? <Button onClick={()=> this.setState({isGradeSelected: false})}>Back</Button> : null}
                    <br/>
                    <Divider/>
                    <br/>
                    { !this.state.isSubjectSelected ? 
                    <GridList cols={3}>
                        {data}
                    </GridList>
                    : <div>{data}</div>
                    }
                    <br/>
               </div>
            </div>
        );
    }
};


const mapDispatchToProps = dispatch => {
    return {
        setGradeSubject: (grade, subject) => dispatch({type: 'SET_GRADE_SUBJECT', value: {grade: grade, subject: subject}})
    };
}

export default connect(null,mapDispatchToProps)(TeacherDash);