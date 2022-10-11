import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { setPricesAndDate } from '../../mainFunctions';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'hsla(178,100%,15%, 0.8)',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'hsla(178,50%,55%, 0.2)',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  
}));

export default function CustomizedTables() {

  const [vals, keys, years] = setPricesAndDate()
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  const columns = ['Ano', 'Início do Fornecimento', 'Fim do Fornecimento', 'R$ por MWh', 'Data Base']
  const mesIni = parseInt(document.getElementsByClassName('dataIni')[0].getElementsByTagName('input')[0].value.substring(0,2))

  const mesFim = parseInt(document.getElementsByClassName('dataFim')[0].getElementsByTagName('input')[0].value.substring(0,2))

  return (vals.map((val, indexRow) => {
      let values = {
        'Ano' : keys[indexRow],
        'Início do Fornecimento':  ((mesIni != 1) && (indexRow==0))   ? meses[mesIni-1] + '/' + keys[0]    : `Jan/${keys[indexRow]}`,
        'Fim do Fornecimento':  ((mesFim<12) && (val == vals.at(-1))) ? meses[mesFim-1] + '/' + keys.at(-1) : `Dez/${keys[indexRow]}`, 
        'R$ por MWh': (parseFloat(vals[indexRow]).toFixed(2)).replace(".",","),
        'Data Base': meses[new Date().getMonth()] + '/' + years[0]
      }
      return(
      <StyledTableRow key={"row-"+indexRow}>
        {columns.map((key, index) => {return(<StyledTableCell name={key} key={"row" + indexRow + '-cell-' + index} size="small" align="center">{values[key]}</StyledTableCell>)})}
      </StyledTableRow>)
    }
    )
  );
}