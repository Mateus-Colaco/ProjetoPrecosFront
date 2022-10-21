import dayjs from 'dayjs';
import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import ReactDOM from 'react-dom/client';
import Select from '@mui/material/Select';
import BasicCard  from '../components/Cards';
import Grid from '@mui/material/Unstable_Grid2'
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Table2 from '../components/Table/CollapsibleTable'
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import { LoginData } from "../components/loginComponents/Popup";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const btnStyle = {padding:'0.9rem', backgroundColor: '#E98E29', borderRadius:"30px",color:'white', fontFamily:'Montserrat Semibold', transition: '0.6s','&:hover': {backgroundColor: 'hsla(32,81%,60%, 1)'}}
const style0 = {alignItems:'center', justifyContent:'space-around'}
const style3 = {...style0}

export default function BasicSelect() {
    const date = new Date()
    function DateSelector(){
        const [valueDt, setValueDt] = React.useState(dayjs(date));
        const handleChangeDt = (newValue) => {
            setValueDt(newValue);
        };
        return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
            label="Data da Pesquisa"
            inputFormat="DD/MM/YYYY"
            value={valueDt}
            onChange={handleChangeDt}
            maxDate={new Date()}
            renderInput={(params) => <TextField sx={{width:'300px'}}  {...params} />}
            />
            <span style={{margin:0, visibility:'hidden', height:0}} id='searchDBDate'>{String(valueDt.date()) + String(valueDt.month()+1) + String(valueDt.year())}</span>
        </LocalizationProvider>)
    }

    const [name, setName] = React.useState(document.getElementById('usernameVal').innerHTML);
    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleClick = ()=>{
        axios.get('http://177.71.194.1:8626/historico', { params: {'usuario': name, 'pesquisado_dia': document.getElementById('searchDBDate').innerHTML} }).then(
            (resp) => {
                let clientes = []
                let varejistas = []
                let i
                ReactDOM.createRoot(document.getElementById('histROOT')).render(<Table2 rows={resp.data}/>);
                resp.data.forEach((val) => clientes = [... clientes, val['cliente']])
                resp.data.forEach((val) => varejistas = [... varejistas, val['Varejo']].sort())
                i = varejistas.filter((val)=>{return val==='true'}).length
                ReactDOM.createRoot(document.getElementById('dataCards')).render(
                    <span>
                    <Grid container rowSpacing={2} columnSpacing={1}>
                        <Grid> <BasicCard titulo="N° de Clientes" content={[...new Set(clientes)].length}/> </Grid>
                        <Grid> <BasicCard titulo="N° de Propostas" content={resp.data.length}/> </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid xs={12}> <BasicCard titulo="N° de Varejistas" content={i}/> </Grid>
                    </Grid>
                    </span>
                );            
        }
        )
        
    }
    let check = LoginData['Funcao'][LoginData['Nome'].indexOf(document.getElementById('usernameVal').innerHTML)]
    let logins = check === 'exponencial' ? LoginData['Nome'] : [document.getElementById('usernameVal').innerHTML]
    return (
    <span>
    <Stack direction={{md:'row', sm:'column'}} spacing={0.5} sx={{justifyContent:'center', alignItems:'center',width:'100%',marginTop:'2rem', marginBottom: '1rem'}}>
        <Stack direction='column' spacing={3} sx={{ paddingTop:'0.5rem', width:'30%' , alignItems:'center', justifyContent:'center'}}>

                <FormControl sx={{width:'300px'}}>
                    <InputLabel id="users-list1">Usuário</InputLabel>
                    <Select
                    id="userList"
                    value={name}
                    label="Usuarios"
                    onChange={handleChange}
                    >
                        {logins.map((val, index) => <MenuItem value={val} key={val}>{val}</MenuItem>)}
                    </Select>
                </FormControl>
    
            <DateSelector/>
            <Button sx={{...btnStyle, width:'150px'}} onClick={handleClick} endIcon={<SearchIcon/>}>Procurar</Button>
        </Stack>
        <Box sx={{height:"100%", paddingTop:'0.5rem'}} id="dataCards"></Box>
    </Stack>
    <Stack sx={style3} direction={{md:'row', sm:'column'}} spacing={1}>
        <Box id="histROOT" sx={{width:'60%'}}></Box>
    </Stack>
    
    </span>  
    );
}

