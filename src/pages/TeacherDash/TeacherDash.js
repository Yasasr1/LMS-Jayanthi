import React, { Component } from 'react';
import { Typography, Divider, Button, GridList, GridListTile, Grid, CircularProgress } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import fire from '../../components/firebase';
import SubjectTile from '../../components/SubjectTile';
import SubjectDetails from '../StudentDash/SubjectDetails';
import UpdateName from '../TeacherDash/UpdateName';

class TeacherDash extends Component {
    state = {
        isSubjectSelected: false,
        isGradeSelected: false,
        loading: true,
        subjects: null,
        selectedGrade: null,
        selectedGradeIndex: null,
        selectedSubjectIndex: null,
        selectedSubject: null,
    }

    componentDidMount() {
        
            fire.database().ref('/subject').on('value',(snapshot) => {
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
        //// eslint-disable-next-line
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
        if(this.props.uid === null){
            this.props.history.replace('/');
        }

        //saving the selected grade and subject to redux
        if(this.state.selectedGrade && this.state.selectedSubject) {
            this.props.setGradeSubject(this.state.selectedGradeIndex, this.state.selectedSubjectIndex);
        }

        let data = <div style={{display: 'flex'}}>
                    <CircularProgress color="secondary"/>
                   </div>;

        if(this.state.subjects) {
            //// eslint-disable-next-line
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
                <Header isLoggedIn={true} {...this.props}/>
                <div style={{
                   padding: '50px',
                   minHeight: '1000px'
               }}>
                    {this.state.isSubjectSelected ? <Button onClick={()=> this.setState({isSubjectSelected: false})}>Back</Button> : null}
                    {!this.state.isSubjectSelected ? <Typography variant="h3" gutterBottom>Dashboard</Typography> : null}
                    {this.state.isGradeSelected && !this.state.isSubjectSelected ? <Button onClick={()=> this.setState({isGradeSelected: false})}>Back</Button> : null}
                    <br/>
                    <Divider/>
                    <br/>
                    <Grid container spacing={0}>
                        <Grid item md={9}>
                            { !this.state.isSubjectSelected ? 
                            <GridList cols={3}>
                                {data}
                            </GridList>
                            : <div>{data}</div>
                            }
                        </Grid>
                        <Grid item md={1}>
                            <Divider orientation="vertical"/>
                        </Grid>
                        <Grid item md={1}>
                            <UpdateName/>
                        </Grid>
                    </Grid>
                    <br/>
               </div>
               <footer style={{
                    left: '0',
                    bottom:' 0',
                    width: '100%',
                    backgroundColor: '	#5a175d',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    padding: '10px'
                }}>
                        <Grid container>
                            <Grid item md={12}>
                                <Typography style={{float:'left'}} variant="h5">Contact Us</Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Button style={{float:'left'}} startIcon={<FacebookIcon/>}>Facebook</Button>
                            </Grid>
                            <Grid item md={12}>
                                <p>Name | All Rights Reserved</p>
                            </Grid>
                        </Grid>
                </footer>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        uid: state.uid,
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        setGradeSubject: (grade, subject) => dispatch({type: 'SET_GRADE_SUBJECT', value: {grade: grade, subject: subject}})
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(TeacherDash);