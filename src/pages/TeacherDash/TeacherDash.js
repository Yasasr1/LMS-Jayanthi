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
        
            fire.analytics();
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

    openFacebook = () => {
        window.open("https://www.facebook.com/flexlabsSriLanka");
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
                   padding: '20px',
                   minHeight: '1000px',
                   backgroundColor: '#f5f5f5'
               }}>
                    {
                        this.state.isSubjectSelected 
                        ? 
                        <div style={{textAlign: 'center'}}>
                            <Button style={{backgroundColor:'#074e67', color:'white'}} onClick={()=> this.setState({isSubjectSelected: false})}>Back</Button>
                        </div>
                        : 
                        null
                    }
                    {
                        !this.state.isSubjectSelected 
                        ? 
                        <div style={{textAlign: 'center'}}>
                            <Typography variant="h3" gutterBottom>Dashboard</Typography>
                            <Typography variant="caption">Welcome!</Typography>
                            <br/>
                            <UpdateName/>
                        </div>
                        : 
                        null
                    }
                    {
                        this.state.isGradeSelected && !this.state.isSubjectSelected 
                        ? 
                        <div style={{textAlign: 'center'}}>
                            <Button style={{backgroundColor:'#074e67', color:'white'}} onClick={()=> this.setState({isGradeSelected: false})}>Back</Button>
                        </div>
                        : 
                        null
                    }
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
               <footer style={{
                    left: '0',
                    bottom:' 0',
                    width: '100%',
                    backgroundColor: '	#5a175d',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    padding: '10px'
                }}>
                    <div>
                        <Typography style={{color: 'white'}} variant="h5">Contact Us</Typography>
                        <Typography style={{color: 'white'}} variant="body">0717380767</Typography>
                        <br/>
                        <Button onClick={this.openFacebook} style={{color: 'white'}} startIcon={<FacebookIcon/>}>Facebook</Button>
                        <p style={{color: 'white'}}>FlexLabs | All Rights Reserved</p>
                    </div>
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