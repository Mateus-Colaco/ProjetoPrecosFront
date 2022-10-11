import axios from 'axios'
import * as React from 'react';
import Box from '@mui/material/Box';
import ReactDOM from 'react-dom/client';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import HomePage from '../../pages/homePage';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

var LoginData
axios.get('https://mainbacktest.herokuapp.com/login').then((resp) => {LoginData = resp.data})

const style = {
  position: 'absolute',
  top: '50%', 
  left: '50%', 
  transform: 'translate(-50%, -50%)', 
  bgcolor: 'background.paper',
  borderRadius: '2rem',
  border: '1px solid #D9D9D9',
  boxShadow: '0 3px 4px rgb(0 0 0 / 10%)',
  pt: 2, px: 4, pb: 3, fontFamily: 'Montserrat'};
const btnStyle = {mt: 2, padding:'0.8rem', borderRadius: '1.5rem', color:'#fff !important', fontFamily:'Montserrat Semibold'}
var [userValidate, readOnly] = [false, true]
var [userIndex, passwordIndex] = [NaN, NaN]


export default function NestedModal() {
  const [open, setOpen] = React.useState(true);
  const [user, setUser] = React.useState('');
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const [validate, setValidate] = React.useState(false);

  const handleUserChange = (event) => {
    readOnly=false
    setUser(event.target.value);
    userValidate = LoginData[Object.keys(LoginData)[1]].includes(event.target.value)
    userIndex = LoginData[Object.keys(LoginData)[1]].indexOf(event.target.value)
    userValidate ? document.getElementById('password').removeAttribute('disabled') : document.getElementById('password').setAttribute('disabled', '')
  };

  const handlePasswordChange = (event) => {
    setValues({...values, password:event.target.value});
    passwordIndex = LoginData[Object.keys(LoginData)[2]].indexOf(event.target.value)
  };

  const handleChange = () => {
    document.getElementById('validateBtn').style.backgroundColor = '#626262'
    document.getElementById('validateBtn').style.transition = 'background-color 1000ms ease'
    if((passwordIndex==userIndex)){ setValidate(true) } else { setValidate(false) }
  };
  
  const handleClick = () => {
    if ((validate) && (user!='')) {
      setOpen(false);
      document.getElementById('usernameVal').innerHTML = user
      ReactDOM.createRoot(document.getElementById('root1')).render(<HomePage/>)
      
    } else {
      
      document.getElementById('validateBtn').style.backgroundColor = '#CE4446'
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
      <Modal
        onChange={handleChange}
        open={open}
        onBackdropClick={()=>{}}
        disableEscapeKeyDown={true}
        onClose={()=>{}}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 320, '&:focus-visible':{outline: 0}}}>
          <h2 id="parent-modal-title" style={{color:'#626262'}}>Login</h2>
          <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '85%' },}} noValidate autoComplete="off">
          <TextField
          id="userName"
          label="Usuário"
          onChange={handleUserChange}
          value={user} />

        <FormControl sx={{ m: 1, width: '85%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="password"
            autoComplete="true"
            readOnly={readOnly}
            type={values.showPassword ? 'text' : 'password'}
            onChange={handlePasswordChange}
            onKeyDown={(e) => {e.key=='Enter' ? handleClick() : NaN}}
            value={values.password}
            label="Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        </Box>
          <Button id="validateBtn" sx={btnStyle} disableElevation onClick={handleClick}>Entrar</Button>
        </Box>
      </Modal>

  );
}
export {LoginData}
