import React , { Component } from 'react';
import axios from 'axios';

import SubjectTile from '../../components/SubjectTile';
import { GridListTile, GridList } from '@material-ui/core';


class SubjectList extends Component {
    


    render() {
        let subjects = <p>Loading...</p>;
        if(this.props.subjects != null) {
            let array = Array.from(this.props.subjects);
            subjects = array.map(subject => {
                return <GridListTile key={subject.title}>
                    <SubjectTile selector={this.props.selectSubject} title={subject.title}/>
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