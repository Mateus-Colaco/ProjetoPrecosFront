import Radio from '@mui/material/Radio';
import { Typography } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';


const boxS = '0 3px 4px rgb(0 0 0 / 10%)'
const formControlStyle = {borderRadius:'25px', border:'1px solid rgba(0,0,0,0.1)',boxShadow:boxS}
const txtStyle = {fontFamily:'Montserrat Semibold'}
const formControlLabelStyle = {color:'hsla(178,100%,15%,1)', marginBottom:'0.5rem'}
const style = {color:'hsla(178,50%,25%, 1)','&.Mui-checked':{color:'hsla(178,50%,15%, 1)'}}
const titleStyle = {fontFamily:'Montserrat', fontWeight:'bold', textAlign:'center', width:'100%'}
const divLayout = { display:'flex', flexDirection:'column', flexWrap: 'wrap', alignContent: 'space-around'}

export default function RadioButtons1() {
  const [subM, setSubM] = useState('seco')
  const handleChange = (event) => {
    setSubM(event.target.value)
  }
  return (
    <FormControl sx={formControlStyle}>
      <FormLabel>{<div style={divLayout}><Typography variant="h6" sx={titleStyle} gutterBottom>Submercado</Typography></div>}</FormLabel>
      <RadioGroup
        sx={{justifyContent:'center'}}
        defaultValue="seco"
        row
        name="subM-val"
        value={subM}
        onChange={handleChange}
      >
        <FormControlLabel sx={formControlLabelStyle} label={<Typography sx={txtStyle} variant="subtitle1">Se/Co</Typography>} control={<Radio sx={style}/>} value="seco" />
        <FormControlLabel sx={formControlLabelStyle} label={<Typography sx={txtStyle} variant="subtitle1">Sul</Typography>} control={<Radio sx={style}/>} value="s" />
        <FormControlLabel sx={formControlLabelStyle} label={<Typography sx={txtStyle} variant="subtitle1">Nordeste</Typography>} control={<Radio sx={style}/>} value="ne" />
        <FormControlLabel sx={formControlLabelStyle} label={<Typography sx={txtStyle} variant="subtitle1">Norte</Typography>} control={<Radio sx={style}/>} value="n" />
      </RadioGroup>
    </FormControl>
  );
}