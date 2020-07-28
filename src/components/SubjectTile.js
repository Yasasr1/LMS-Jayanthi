import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const SubjectTile = (props) => {
    console.log(props.title);
    return(
        <Card variant="elevation" style={{
            maxWidth: '150px',
            height: '100px',
            overflow: 'auto',
            margin: 'auto',
            textAlign: 'center',
            backgroundImage: 'linear-gradient(to bottom right, #8a2a19, #e09200)',
            cursor: 'pointer',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '10'
        }} onClick={() => props.selector(props.title)}>
            <CardContent>
                {props.isGrade
                 ? 
                <Typography variant="h6">Grade {props.title}</Typography> 
                :
                <Typography variant="h6">{props.title}</Typography>
                }
            </CardContent>
        </Card>
    );
};

export default SubjectTile;