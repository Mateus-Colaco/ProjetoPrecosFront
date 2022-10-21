import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import MuiButtons from './components/Button'
import FonteRadioButtons from './components/Fonte'
import MaterialUIPickers from './components/DtPicker'
import PerfilCliente from './components/PerfilCliente'
import RadioButtons1 from './components/subMercado'
import InputName from './components/InputName'

function App() {
  return (
      <Stack id="formsContainer" spacing={2} sx={{justifyContent:'space-around' ,padding: "0.5rem" }}>
          <InputName/>
          <MaterialUIPickers />
          <FonteRadioButtons />
          <RadioButtons1 />
          <PerfilCliente />
        <Grid sx={{marginTop:'1.25rem !important'}} container justifyContent="space-around">
          <MuiButtons text='Gerar Preços' />
        </Grid>
      </Stack>

  )
}

export default App
