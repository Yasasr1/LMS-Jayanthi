import React, { Component } from 'react';
import SubjectItem from '../../components/SubjectItem';

class SubjectDetails extends Component {
    render(){
        let topics = <p>No topics...</p>
        if(this.props.subject.topics) {
            topics = this.props.subject.topics.map((topic => {
                return <SubjectItem key={topic.topic} title={topic.topic} videos={topic.videos}/>
            }))
        }
        
        return(
            <div style={{
                backgroundColor: '#f0f0f0',
                height: '100vh'
            }}>
                <h2>{this.props.subject.title}</h2>
                {topics}
            </div>
        )
    }
};

export default SubjectDetails;