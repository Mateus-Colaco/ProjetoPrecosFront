import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const columns = ['Ano', 'Início do Fornecimento', 'Fim do Fornecimento', 'R$ por MWh', 'Data Base']
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'hsla(178,100%,15%, 0.8)',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

export default function MainTable(){
return(
    <TableContainer sx={{ maxWidth: '75%', borderTopRightRadius:'18px', borderTopLeftRadius:'18px'}} component={Paper}>
        <Table size="small" >
            <TableHead>
                <TableRow>
                    {columns.map((column, index) => {return(<StyledTableCell sx={{borderBottom: "0px solid"}} key={column + index} align="center">{column}</StyledTableCell>)})}
                </TableRow>
            </TableHead>
            <TableBody id="root3">
            </TableBody>
        </Table>
    </TableContainer>
    )
}
