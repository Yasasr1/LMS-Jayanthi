import React , { Component } from 'react';

import SubjectTile from '../../components/SubjectTile';
import { GridListTile, GridList, CircularProgress } from '@material-ui/core';


class SubjectList extends Component {
    


    render() {
        let subjects = <div style={{display: 'flex'}}>
                <CircularProgress color="secondary"/>
            </div>;
        if(this.props.subjects != null) {
            let array = Array.from(this.props.subjects);
            subjects = array.map(subject => {
                return <GridListTile key={subject.title}>
                    <SubjectTile isGrade={false} selector={this.props.selectSubject} title={subject.title}/>
                </GridListTile> 
            })
        }
        
        return(
           <div>
               <GridList cols={5}>
                   {subjects}
               </GridList>
           </div>
        );
    }
}


export default SubjectList;