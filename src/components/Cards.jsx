import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function BasicCard(props) {
  return (
    <Card sx={{ minWidth:'200px' }}>
        <CardContent sx={{bgcolor:'#e98e29'}}>
        <Typography sx={{textAlign:'center', color:'white', fontFamily:'Montserrat', fontWeight:'bold'}} variant="h5">
                {props.titulo}
            </Typography>
        </CardContent>
        <CardContent>
                {props.content}
        </CardContent>
    </Card>
  );
}
