import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const SubjectTile = (props) => {
    return(
        <Card variant="elevation" style={{
            maxWidth: '150px',
            overflow: 'hidden',
            wordWrap: 'break-word',
            textAlign: 'center',
            backgroundColor: 'gray'
        }} onClick={() => props.selector(props.title)}>
            <CardContent>
                <Typography variant="h6">{props.title}</Typography>
            </CardContent>
        </Card>
    );
};

export default SubjectTile;