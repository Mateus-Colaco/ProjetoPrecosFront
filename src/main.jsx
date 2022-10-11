
import React from 'react'
import Grid from '@mui/material/Grid'
import ReactDOM from 'react-dom/client';
import CreateHeader from './components/PgHeader';
import NestedModal from './components/loginComponents/Popup';


ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
        <div className="section" style={{position:'sticky', top:'0', left:'0', zIndex:'100'}}><CreateHeader/></div>
        <div id="root1"></div>
        <div>
          <NestedModal/>
        </div>
  </div>
)

