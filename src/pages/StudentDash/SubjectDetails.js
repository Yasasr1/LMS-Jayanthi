import React, { Component } from 'react';

class SubjectDetails extends Component {
    render(){
        return(
            <div>
                <h4>{this.props.title}</h4>
                <p>subject topics...</p>
            </div>
        )
    }
};

export default SubjectDetails;