import React , { Component } from 'react';
import { Typography, Divider, Button, GridList, GridListTile, Grid, CircularProgress } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from '../../components/Header';
import SubjectTile from '../../components/SubjectTile';
import SubjectDetails from '../StudentDash/SubjectDetails';
import fire from '../../components/firebase';
import logo from '../../assets/images/logo.png';


class StudentDash extends Component {
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
        let redirect = null;
        if(this.props.isLoggedin) {
            redirect = <Redirect to="/dashboard"/>
        }

        let headingSection = <div style={{textAlign: 'center'}}>
            <img style={{height: '100px', width: '100px', borderRadius: '50%'}} src={logo} alt="school logo"></img>
            <br/>
            <Typography variant="h4">Jayanthi Vidyalaya, Colombo</Typography>
            <br/>
            <Typography variant="overline">Learning Management System</Typography>
        </div>

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
                <Header {...this.props}/>
                {redirect}
                <div style={{
                   padding: '50px',
                   minHeight: '1000px',
                   backgroundColor: '#f5f5f5'
               }}>
                    {
                        this.state.isSubjectSelected 
                        ? 
                        <div style={{textAlign: 'center'}}>
                            <Button style={{backgroundColor:'#074e67', color:'white'}} onClick={()=> this.setState({isSubjectSelected: false})}>Back</Button>
                        </div> 
                        : null
                    }
                    {
                        !this.state.isSubjectSelected ? headingSection : null
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
                    color: 'white',
                    backgroundColor: '#67074e',
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
}

const mapStateToProps = state => {
    return {
        isLoggedin: state.uid != null,
    }
}

export default connect(mapStateToProps,null)(StudentDash);