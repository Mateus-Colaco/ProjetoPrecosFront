import dayjs from 'dayjs';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function MaterialUIPickers() {
  const date = new Date()
  const [value, setValue] = React.useState(dayjs(date));
  const [value2, setValue2] = React.useState(dayjs('2036-12'));

  const handleChange = (newValue) => {
    setValue(newValue);
    let dt = new Date(Date.parse(newValue))
    if(Date.parse(newValue)>=Date.parse(value2)){
      dt.setMonth(dt.getMonth())
        setValue2(dt)
    }   
  };
  const handleChange2 = (newValue2) => {
    setValue2(newValue2);
  };

  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction={{lg:'row', sm:'column'}} spacing={2} sx={{width:'100%', justifyContent:'space-around'}}>
        <DesktopDatePicker
          views={['month', 'year']}
          label="Data Inicial"
          className='dataIni'
          inputFormat="MM/YYYY"
          value={value}
          onChange={handleChange}
          minDate={new Date()}
          maxDate={new Date("2036-12-31T00:00:00Z")}
          renderInput={(params) => <TextField {...params} />}
        />
        <div style={{margin:'0.2rem'}} value={`${value} ${value2}`}></div>
        <DesktopDatePicker
          label="Data Final"
          className='dataFim'
          views={['month', 'year']}
          inputFormat="MM/YYYY"
          value={value2}
          onChange={handleChange2}
          minDate={value}
          disablePast={true}
          maxDate={new Date("2036-12-31T00:00:00Z")}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>

  );
}
