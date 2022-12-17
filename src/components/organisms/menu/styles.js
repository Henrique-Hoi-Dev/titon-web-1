import { 
  Collapse, 
  Grid,
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  List
} from "@mui/material";
import { styled } from "@mui/system";
import { MENU_WIDTH } from "utils/constants";

import MuiDrawer from "@mui/material/Drawer";

export const ListItemCategoryUser = styled(ListItem)({
  cursor: "pointer",
  color: "#FFFFFF",  
  display: 'flex!important',
  transition: "2s",
  marginLeft: "-12px",
  marginTop: "12px",
  borderRadius: "8px",
  width: "260px",
  padding: 0,
});

export const ListItemCategory = styled(ListItem)({
  cursor: "pointer",
  color: "#FFFFFF",  
  display: 'block',
  transition: "2s",
  marginLeft: "-12px",
  marginTop: "12px",
  borderRadius: "8px",
  width: "240px",
  padding: 0,

  "& .css-10hburv-MuiTypography-root": { 
    fontSize: "1.2rem", 
    fontWeight: "400",
  },
  "& :focus": {
    background: "#0C59BB",
    borderRadius: "8px",
  },
});

export const ButtonMenu = styled(ListItemButton)({
  color: "#FFFFFF",  
  height: "40px",
  px: 2.5,
});

export const ListSub = styled(List)({
  display: "flex",
  alignItems: "flex-end",
  height: "100%",
  paddingBottom: "24px",
});

export const IconMenuCategory = styled(ListItemIcon)({
  cursor: "pointer",
  color: "#FFFFFF",  
  justifyContent: 'center',
});

export const ListText = styled(ListItemText)({
  cursor: "pointer",
  color: "#F1F3F9",
  fontSize: "1.1rem",
  "& .css-10hburv-MuiTypography-root": { fontWeight: "400" },
  marginTop: 0,
  marginBottom: "-4px"
});

export const MenuCollapse = styled(Collapse)({
  "& .css-9l5vo-MuiCollapse-wrapperInner": { width: "auto!important" },
  color: "#34475a",
  background: "#1C1C1C",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
});

export const SubList = styled(Grid)({
  cursor: "pointer",
  padding: "0px 65px",
  margin: "10px 0 10px 20px",
  justifyContent: "center",
  display: 'block',
  color: "#34475a",
  background: "#1C1C1C",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  "& :hover": {
    backgroundColor: "transparent!important",
    transform: "scale(1.04)",
    transition: "all 0.8s",
  },
});

export const openedMixin = (theme) => ({
  width: MENU_WIDTH,
  transition:  theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  border: "none",
  background: "#1C1C1C",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
});

export const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  border: "none",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  background: "#1C1C1C",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: "0 17px",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: MENU_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
