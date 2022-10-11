import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function StateTextFields() {
  const [name, setName] = React.useState('');
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (

      <TextField
        id='nomeDoCliente'
        label="Nome do Cliente"
        value={name}
        onChange={handleChange}
      />

  );
}