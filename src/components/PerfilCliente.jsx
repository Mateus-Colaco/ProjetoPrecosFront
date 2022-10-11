import * as React from 'react';
import { Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';


const boxS = '0 3px 4px rgb(0 0 0 / 10%)'

const formControlStyle = {borderRadius:'25px', border:'1px solid rgba(0,0,0,0.1)',boxShadow:boxS}
const layout = {color: '#626262','&.Mui-checked': {color: '#626262'}}
const txtStyle = {fontFamily:'Montserrat',fontWeight:'450', color:'#505050'}
const titleStyle = {fontFamily:'Montserrat', fontWeight:'bold', textAlign:'center', width:'100%'}
const formLabelStyle = {borderRadius:'35px 35px 0px 0px'}
const divLayout = { display:'flex', flexDirection:'column', flexWrap: 'wrap', alignContent: 'space-around'}
const formGroupStyle = {justifyContent:'space-evenly'}

export default function PerfilCliente() {
  const [varejoState, setVarejoState] = useState('vrjNotCheck')
  const [encargoState, setEncargoState] = useState('encNotCheck')

  const handleVarejoChng = ()=>{
    if(document.getElementById('varejoChck').value == 'vrjCheck'){
      setVarejoState('vrjNotCheck')
    } else { setVarejoState('vrjCheck') }
  }

  const handleEncargoChng = ()=>{
    if(document.getElementById('encargoChck').value == 'encCheck'){
      setEncargoState('encNotCheck')
    } else { setEncargoState('encCheck') }
  }
  

  return (
    <FormControl sx={formControlStyle}>
      <FormLabel sx={formLabelStyle}>{<div style={divLayout}><Typography variant="h6" sx={titleStyle} gutterBottom>Produtos</Typography></div>}</FormLabel>
      <FormGroup row sx={formGroupStyle}>
        <FormControlLabel control={<Checkbox id="varejoChck" value={varejoState} onClick={handleVarejoChng} name="varejo"  sx={layout}/>} label={<Typography variant="subtitle1" sx={txtStyle}>Varejo</Typography>} />
        <FormControlLabel control={<Checkbox id="encargoChck" value={encargoState} onClick={handleEncargoChng} name="encargos"  sx={layout}/>} label={<Typography variant="subtitle1" sx={txtStyle}>Encargos</Typography>} />
      </FormGroup>
    </FormControl>
    
  );
}