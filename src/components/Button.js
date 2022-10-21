import axios from 'axios';
import * as React from 'react';
import { AppPlot } from './Plot';
import { Button } from "@mui/material";
import ReactDOM from 'react-dom/client';
import { ButtonGroup } from "@mui/material";
import CustomizedTables from './Table/PriceTable';
import { setPricesAndDate, setDataToSave } from '../mainFunctions';

const btnStyle = {padding:'0.9rem', backgroundColor: '#E98E29', borderRadius:"30px", transition: '0.6s','&:hover': {backgroundColor: 'hsla(32,81%,60%, 1)'}}


function createPlot(prices, periodo){
    if (window.innerWidth >800){
        document.getElementById('root2').style.width = '50rem'
        document.getElementById('root2').style.marginLeft = '1rem'
    } else { document.getElementById('root2').style.width = 'auto' }
    document.getElementById('root2').className = 'plotted';
    ReactDOM.createRoot(document.getElementById('root2')).render(<AppPlot data={[prices, periodo]}/>);
    ReactDOM.createRoot(document.getElementById('root3')).render(<CustomizedTables/> );
}


function MuiButtons(props){
    function handleSubmit() {
        const [prices, periodo] = setPricesAndDate()
        if (document.getElementById('usernameVal').innerHTML !== ''){
            createPlot(prices, periodo)
            setTimeout(()=>axios.post('http://177.71.194.1:8626/', { params: setDataToSave() }), 500)
        } else { alert('Login Não realizado') }
    } 
    return(
        <span>
            <ButtonGroup>
                <Button sx={btnStyle} onClick={()=>{ handleSubmit()}} variant="contained" disableElevation>{props.text}</Button>
            </ButtonGroup>
        </span>
    )
}


export default MuiButtons
export { createPlot }
