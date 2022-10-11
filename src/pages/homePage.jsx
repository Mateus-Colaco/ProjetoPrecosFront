import App from '../App';
import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MainTable from '../components/Table/TableMain';


const style0 = {alignItems:'center', justifyContent:'space-around'}
const style2 = {...style0, height:'100%'}
const style1 = style2
const style3 = {...style0}
export default function HomePage(){
    return(
        <span>
            <Stack direction={{md:'row', sm:'column'}} spacing={0.5} sx={{overflow:'hidden',marginBottom: '1rem', justifyContent:'space-around'}}>
                <Box sx={style1}>
                    <App/>
                </Box>
                <Box sx={{height:"100%", paddingTop:'0.5rem'}}>
                    <div id="root2" style={{width:'50rem'}}></div>
                </Box>
            </Stack>
            <Stack sx={style3} direction={{md:'row', sm:'column'}} spacing={1}>
                <MainTable/>
            </Stack>
        </span>
    )
}