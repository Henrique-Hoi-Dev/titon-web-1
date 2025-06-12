import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  styled,
  TablePagination,
  TableSortLabel,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const SCell = styled(TableCell)(
  ({ color, textAlign, fontWeight, fontSize, backgroundcolor, displaywidth, minwidth }) => ({
    display: `${displaywidth ? 'none' : ''}`,
    fontSize: `${fontSize ? fontSize : '14px'}`,
    minWidth: `${minwidth ? minwidth : '100px'}`,
    whiteSpace: 'nowrap',
    textAlign: `${textAlign ? textAlign : 'center'}`,
    padding: '7px',
    borderBottom: `0.5px solid #545454`,
    backgroundColor: `${backgroundcolor ? backgroundcolor : 'inherit'}`,
    fontWeight: `${fontWeight ? fontWeight : 'normal'}`,
    color: `${color ? color : '#939395'}`,
    '&.MuiTableCell-root hover': {
      textDecorationLine: 'underline',
    },
  })
);

export const SLabel = styled(TableSortLabel)(({ hideSortIcon }) => ({
  '& :hover': {
    color: '#939395',
    cursor: hideSortIcon ? 'default' : 'pointer',
  },
  '& :focus': {
    color: hideSortIcon ? '#939395' : '#939395',
  },
  '& :active': {
    color: hideSortIcon ? '#939395' : '#939395',
  },
  '& .MuiTableSortLabel-icon': {
    opacity: 1,
  },
  '& .MuiTableSortLabel-icon.Mui-active': {
    color: '#CCCCCC',
  },
  '& .MuiButtonBase.Mui-active': {
    color: '#CCCCCC',
  },
}));

export const STableGrid = styled(DataGrid)(({ display }) => ({
  display: `${display ? '' : 'table'}`,
  overflow: 'auto',
  borderRadius: '8px',
}));

export const STable = styled(Table)(({ display }) => ({
  display: `${display ? '' : 'table'}`,
  overflow: 'auto',
  borderRadius: '16px',
  backgroundColor: `#3A3A3A`,
}));

export const SHead = styled(TableHead)(({ color, backgroundcolor, displaywidth, tableLayout }) => ({
  tableLayout: `${tableLayout}`,
  display: `${displaywidth ? 'none' : ''}`,
  fontSize: 18,
  height: '70px',
  backgroundColor: `${backgroundcolor ? backgroundcolor : '#545454'}`,
  '&.MuiTableCell-root': {
    color: `${color ? 'black' : '#939395'}`,
    fontWeight: `${'900'}`,
  },
  color: '#939395',
  '& :hover': {
    color: '#939395',
  },
}));

export const SRow = styled(TableRow)(({ displaywidth }) => ({
  display: `${displaywidth ? 'none' : ''}`,
  backgroundColor: `#3A3A3A`,
}));

export const SCellTwoHead = styled(TableCell)(
  ({ color, textAlign, fontWeight, fontSize, displaywidth, minwidth }) => ({
    fontSize: `${fontSize ? fontSize : '14px'}`,
    minWidth: `${minwidth ? minwidth : '120px'}`,
    backgroundColor: '#34495ec9',
    display: `${displaywidth ? 'none' : ''}`,
    borderRadius: '4px',
    textAlign: `${textAlign ? textAlign : 'center'}`,
    padding: '7px',
    fontWeight: `${fontWeight ? fontWeight : 'normal'}`,
    color: `${color ? color : 'white'}`,
    '& .MuiTableCell-root hover': {
      textDecorationLine: 'underline',
    },
  })
);

export const STableBody = styled(TableBody)(() => ({
  border: `0.5px solid #545454`,
  backgroundColor: `#3A3A3A`,
}));

export const STablePagination = styled(TablePagination)(({ theme }) => ({
  '& .MuiIconButton-root': {
    background: 'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)',
    color: theme.palette.neutral.color,
    marginLeft: '10px',
    padding: '4px',
    '&:hover': {
      background: 'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)',
      opacity: 0.8,
    },
  },
}));
