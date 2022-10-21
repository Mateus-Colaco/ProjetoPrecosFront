import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const cellStyle = {fontFamily:'Montserrat', border: '0px solid'}
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const compare = (props.colorDefiner % 2 === 0 )
  const rowStyle = {border:'0px solid', backgroundColor: (compare ? 'hsla(178,50%,55%, 0.2)': 'white'), '& > *': { borderBottom: '0px solid' }, '&:hover':{ backgroundColor: compare ? 'hsla(178,50%,55%, 0.5)' : 'rgba(0,0,0, 0.1)'}}
  return (
    <React.Fragment>
      <TableRow size="small" onClick={() => setOpen(!open)} sx={rowStyle}>
        <TableCell sx={cellStyle}>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        
        <TableCell sx={cellStyle} align="left">{row.cliente}</TableCell>
        <TableCell sx={cellStyle} align="left">{row.Submercado}</TableCell>
        <TableCell sx={cellStyle} align="left">{row.Fonte}</TableCell>
        <TableCell sx={cellStyle} align="left">{row.Encargo}</TableCell>
        <TableCell sx={cellStyle} align="left">{row.Varejo}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {'Preços - ' + row.cliente}
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow hover={true}>
                    <TableCell>Ano</TableCell>
                    <TableCell>Preço</TableCell>
                    <TableCell>Início Fornecimento</TableCell>
                    <TableCell>Fim do Fornecimento</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Ano.map((ano, index) => (
                    <TableRow hover={true} key={index+'-'+ano}>
                      <TableCell>{ano}</TableCell>
                      <TableCell>{row['R$ por MWh'][index]}</TableCell>
                      <TableCell>{row['Início do Fornecimento'][index]}</TableCell>
                      <TableCell>{row['Fim do Fornecimento'][index]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


const headStyle = {
    fontFamily:'Montserrat',
    color:'white'
}

export default function Table2(props) {
  return (
    
    <TableContainer sx={{ borderTopRightRadius:'18px', borderTopLeftRadius:'18px'}} component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow  sx={{bgcolor:'hsla(178,100%,15%, 0.8)'}}>
            <TableCell sx={headStyle}></TableCell>
            <TableCell sx={headStyle}>Cliente</TableCell>
            <TableCell sx={headStyle}>Submercado</TableCell>
            <TableCell sx={headStyle}>Fonte</TableCell>
            <TableCell sx={headStyle}>Encargo</TableCell>
            <TableCell sx={headStyle}>Varejo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, indexRow) => (
            <Row colorDefiner={indexRow} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
