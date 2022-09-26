import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  styled,
  TablePagination,
  TableSortLabel,
} from "@mui/material";

export const SLabel = styled(TableSortLabel)(({ theme, hideSortIcon }) => ({
  "&:hover": {
    color: "#333",
    opacity: 1,
    cursor: hideSortIcon ? "default" : "pointer",
  },
  "&:focus": {
    color: hideSortIcon ? "#FFFFFF" : "none",
    opacity: 1,
  },
  "& .MuiTableSortLabel-icon": {
    opacity: 1,
  },
  "& .MuiTableSortLabel-icon.Mui-active": {
    color: "#CCCCCC",
  },
  "& .MuiButtonBase.Mui-active": {
    color: "#CCCCCC",
  }
}));

export const STable = styled(Table)(({ theme }) => ({ }));

export const SHead = styled(TableHead)
(({ color, backgroundColor, fontweight, displaywidth }) => ({
  display: `${displaywidth ? "none" : ""}`,
  fontSize: 18,
  backgroundColor: `${backgroundColor ? backgroundColor : "#fff!important"}`,
  "& :hover": { color: "black" },
  "& .MuiTableCell-root": {
    color: `${color ? "black" : "black"}`,
    fontWeight: `${'900'}`,
  },
}));

export const SCell = styled(TableCell)
(({color, textAlign, fontWeight, fontSize, backgroundcolor, displaywidth, minwidth}) => ({
  display: `${displaywidth ? "none" : ""}`,
  fontSize: `${fontSize ? fontSize : '14px'}`,
  minWidth: `${minwidth ? minwidth : '100px'}`,
  whiteSpace: "nowrap",
  textAlign: `${textAlign ? textAlign : "center"}`,
  padding: "7px",
  backgroundColor: `${backgroundcolor ? backgroundcolor : "inherit"}`,
  fontWeight: `${fontWeight ? fontWeight : 'normal'}`,
  color: `${color ? color : '#000'}`,
  "& .MuiTableCell-root hover": {
    textDecorationLine: "underline",
  },
}));

export const SRow = styled(TableRow) 
(({ theme, displaywidth, alternatingcolors }) => ({
  display: `${displaywidth ? "none" : ""}`,
  backgroundColor: `${( alternatingcolors % 2 !== 0 && "#3333330d" ) || 
  ( alternatingcolors % 2 === 0 && "white")}`,
}));

export const SCellTwoHead = styled(TableCell)
(({color, textAlign, fontWeight, fontSize, displaywidth, minwidth}) => ({
  fontSize: `${fontSize ? fontSize : '14px'}`,
  minWidth: `${minwidth ? minwidth : "120px"}`,
  backgroundColor: "#34495ec9",
  display: `${displaywidth ? "none" : ""}`,
  borderRadius: "4px",
  textAlign: `${textAlign ? textAlign : "center"}`,
  padding: "7px",
  fontWeight: `${fontWeight ? fontWeight : 'normal'}`,
  color: `${color ? color : 'white'}`,
  "& .MuiTableCell-root hover": {
    textDecorationLine: "underline",
  },
}));

export const STableBody = styled(TableBody)(({ theme }) => ({}));

export const STablePagination = styled(TablePagination)(({ theme }) => ({
  "& .MuiIconButton-root": {
    backgroundColor: theme.palette.neutral.backgroundColor,
    color: theme.palette.neutral.color,
    marginLeft: "10px",
    padding: "4px",
    ":hover": {
      backgroundColor: theme.palette.neutral.backgroundColor,
      opacity: 0.8,
    },
  },
}));


