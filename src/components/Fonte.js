import { useState } from 'react';
import Radio from '@mui/material/Radio';
import { Typography } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

const boxS = '0 3px 4px rgb(0 0 0 / 10%)'
const txtStyle = {fontFamily:'Montserrat Semibold'}
const style = { color:'hsla(178,50%,25%, 1)','&.Mui-checked':{ color:'hsla(178,50%,15%, 1)' } }
const titleStyle = { fontFamily:'Montserrat',fontWeight:'bold', textAlign:'center', width:'100%' }
const divLayout = { display:'flex', flexDirection:'column', flexWrap: 'wrap', alignContent: 'space-around' }
const formControlStyle = {borderRadius:'25px', border:'1px solid rgba(0,0,0,0.1)',boxShadow:boxS}
const formCtrlLblStyle = {color:'hsla(178,100%,15%,1)', marginBottom:'0.5rem'}

export default function FonteRadioButtons() {
  const [font,setFont] = useState('Conv')
  const handleChange=(event)=>{
    setFont(event.target.value)
  }

  return (
    <FormControl sx={formControlStyle}>
      <FormLabel>{<div style={divLayout}><Typography variant="h6" sx={titleStyle} gutterBottom>Fonte</Typography></div>}</FormLabel>
      <RadioGroup
        defaultValue="i50%"
        row
        name="fontRdBtn"
        value={font}
        onChange={handleChange}
        sx={{justifyContent:'center'}}
      >
        <FormControlLabel sx={formCtrlLblStyle} value="Conv" control={<Radio sx={style}/>} label={<Typography sx={txtStyle} variant="subtitle1">Conv</Typography>} />
        <FormControlLabel sx={formCtrlLblStyle} value="i0%" control={<Radio sx={style}/>} label={<Typography sx={txtStyle} variant="subtitle1">i0%</Typography>} />
        <FormControlLabel sx={formCtrlLblStyle} value="i50%" control={<Radio sx={style}/>} label={<Typography sx={txtStyle} variant="subtitle1">i50%</Typography>}/>
        <FormControlLabel sx={formCtrlLblStyle} value="i100%" control={<Radio sx={style}/>} label={<Typography sx={txtStyle} variant="subtitle1">i100%</Typography>}/>
      </RadioGroup>
    </FormControl>
  );
}
