import '../styles/menu.css';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from '../pages/homePage';
import Historico from '../pages/historico';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { LoginData } from "../components/loginComponents/Popup";
import HistoryIcon from '@mui/icons-material/History';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Typography, IconButton, ListItemText, ListItemButton, Toolbar, AppBar, Drawer, List, ListItem, Box  } from '@mui/material';

var root1
var funcao
setTimeout(() => {
  root1 = ReactDOM.createRoot(document.getElementById('root1'))
}, 10);


const clseBtnStl = {marginLeft:'0.75rem', color:"white"}
export default function CreateHeader(props) {
  const [homePg, setHomePg] = React.useState(true)
  const [histPg, setHistPg] = React.useState(false)
  const [state, setState] = React.useState({
    left: false,
  });
  
  const handleHomePg = () => {
    if (!(homePg)){
      setHistPg(false)
      setHomePg(true)
      root1.render(<HomePage/>)
      }
  };
  
  const handleHist = () => {
    if (!(histPg)){
      setHomePg(false)
      setHistPg(true)
      root1.render(<Historico/>)
      }
      
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    funcao = LoginData['Funcao'][LoginData['Nome'].indexOf(document.getElementById('usernameVal').innerHTML)]; 
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor, props) => (
    <Box
      role="presentation"
      sx={{ width: 210 }}
      onKeyDown={toggleDrawer(anchor, false)}
    > 
      <List>
        <IconButton
        sx={clseBtnStl}
        color="inherit"
        onClick={toggleDrawer(anchor, false)}
        size="large"
        edge="start"
        id="find"
        ><CloseOutlinedIcon/></IconButton>
          <ListItem sx={{marginTop: '0.5rem'}} key={'HomePage'} disablePadding>
            <ListItemButton onClick={()=>handleHomePg()}>
              <ListItemText sx={{marginLeft:'0.5rem', color:"white"}}  primary='Página Inicial' />
                <HomeIcon sx={{color:"white", marginRight:'0.5rem'}}/>
            </ListItemButton>
            </ListItem>
            <ListItem key={'Histórico'} disablePadding>
            <ListItemButton onClick={()=>handleHist()}>
              <ListItemText sx={{marginLeft:'0.5rem', color:"white"}} primary='Histórico' />
                <HistoryIcon sx={{color:"white", marginRight:'0.5rem'}}/>
            </ListItemButton>
            </ListItem>
            
      </List>
    </Box>
  );

  function Menu(props) {

    return (
          <Drawer 
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left', props)}
          </Drawer>
    );
  }
  const menu = (func) => {return Menu(func)}
  return (
    <Box id="header">
      <AppBar sx={{backgroundColor:'#00807b'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          {menu(funcao)}         
          <Typography variant="h6" component="div" sx={{ fontFamily:'Montserrat Semibold', flexGrow: 1 }}>
            Exponencial - Gerador de Preços
          </Typography>
          <Typography variant="h6" id="usernameVal" component="div" sx={{ fontFamily:'Montserrat'}}>
            {props.loginName}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
