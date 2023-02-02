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
  },
}));

export const STable = styled(Table)(({ display }) => ({
  display: `${display ? "" : "table"}`,
  overflow: "auto",
  borderRadius: "8px",
}));

export const SHead = styled(TableHead)(
  ({
    color,
    backgroundColor,
    fontweight,
    displaywidth,
    tableLayout,
    border,
  }) => ({
    tableLayout: `${tableLayout}`,
    display: `${displaywidth ? "none" : ""}`,
    fontSize: 18,
    backgroundColor: `${
      backgroundColor ? backgroundColor : "##CCD6EB!important"
    }`,
    "& :hover": { color: "black" },
    "& .MuiTableCell-root": {
      color: `${color ? "black" : "black"}`,
      fontWeight: `${"900"}`,
    },
  })
);

export const SCell = styled(TableCell)(
  ({
    color,
    textAlign,
    fontWeight,
    fontSize,
    backgroundcolor,
    displaywidth,
    minwidth,
  }) => ({
    display: `${displaywidth ? "none" : ""}`,
    fontSize: `${fontSize ? fontSize : "14px"}`,
    minWidth: `${minwidth ? minwidth : "100px"}`,
    whiteSpace: "nowrap",
    textAlign: `${textAlign ? textAlign : "center"}`,
    padding: "7px",
    backgroundColor: `${backgroundcolor ? backgroundcolor : "inherit"}`,
    fontWeight: `${fontWeight ? fontWeight : "normal"}`,
    color: `${color ? color : "#000"}`,
    "& .MuiTableCell-root hover": {
      textDecorationLine: "underline",
    },
  })
);

export const SRow = styled(TableRow)(
  ({ theme, displaywidth, alternatingcolors }) => ({
    display: `${displaywidth ? "none" : ""}`,
    backgroundColor: `${
      (alternatingcolors % 2 !== 0 && "#CCD6EB") ||
      (alternatingcolors % 2 === 0 && "white")
    }`,
  })
);

export const SCellTwoHead = styled(TableCell)(
  ({ color, textAlign, fontWeight, fontSize, displaywidth, minwidth }) => ({
    fontSize: `${fontSize ? fontSize : "14px"}`,
    minWidth: `${minwidth ? minwidth : "120px"}`,
    backgroundColor: "#34495ec9",
    display: `${displaywidth ? "none" : ""}`,
    borderRadius: "4px",
    textAlign: `${textAlign ? textAlign : "center"}`,
    padding: "7px",
    fontWeight: `${fontWeight ? fontWeight : "normal"}`,
    color: `${color ? color : "white"}`,
    "& .MuiTableCell-root hover": {
      textDecorationLine: "underline",
    },
  })
);

export const STableBody = styled(TableBody)(({ theme, border }) => ({
  border: `${border ? "2px solid #000000" : ""}`,
  borderTop: `${border ? "none" : ""}`,
}));

export const STablePagination = styled(TablePagination)(({ theme }) => ({
  "& .MuiIconButton-root": {
    background: "linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)",
    color: theme.palette.neutral.color,
    marginLeft: "10px",
    padding: "4px",
    ":hover": {
      background: "linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)",
      opacity: 0.8,
    },
  },
}));
