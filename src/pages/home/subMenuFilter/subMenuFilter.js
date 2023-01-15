import * as React from "react";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { Grid } from "@mui/material";
import {
  IconSubMenuTrendingDownIcon,
  IconSubMenuTrendingUpIcon,
  PointIcon,
} from "components/atoms/icons/icons";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function SubMenuFilter({ setSearchStatus, setSearchOrder }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClear = () => {
    setSearchOrder("");
    setSearchStatus("");
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        sx={{ color: "#ffff" }}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Organizar fichas por
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Grid item container p={1} ml={2} sx={{ color: "#1877F2" }}>
          Organizar por:
        </Grid>
        <MenuItem
          onClick={handleClear}
          disableRipple
          sx={{ ml: 2, width: "80%", lineHeight: "unset", fontWeight: "700" }}
        >
          LIMPAR FILTRO
        </MenuItem>
        <Divider sx={{ my: 0.3, width: "85%", ml: 2, mt: -2 }} />
        <MenuItem
          onClick={() => setSearchOrder("ASC")}
          disableRipple
          sx={{ ml: 2, width: "80%", lineHeight: "unset", fontWeight: "700" }}
        >
          A-Z
        </MenuItem>
        <Divider sx={{ my: 0.3, width: "85%", ml: 2, mt: -2 }} />
        <MenuItem
          onClick={() => setSearchOrder("DESC")}
          disableRipple
          sx={{ ml: 2, width: "85%", lineHeight: "unset", fontWeight: "700" }}
        >
          Z-A
        </MenuItem>
        <Divider sx={{ my: 0.3, width: "85%", ml: 2 }} />
        <MenuItem
          onClick={handleClose}
          disableRipple
          sx={{ ml: 2, width: "85%", lineHeight: "unset", fontWeight: "700" }}
        >
          $ <IconSubMenuTrendingUpIcon />
        </MenuItem>
        <Divider sx={{ my: 0.3, width: "85%", ml: 2 }} />
        <MenuItem
          onClick={handleClose}
          disableRipple
          sx={{ ml: 2, width: "85%", lineHeight: "unset", fontWeight: "700" }}
        >
          $ <IconSubMenuTrendingDownIcon />
        </MenuItem>
        <Divider sx={{ my: 0.3, width: "85%", ml: 2 }} />
        <MenuItem
          onClick={() => setSearchStatus("APPROVAL_PROCESS")}
          disableRipple
          sx={{ ml: 2, width: "85%", lineHeight: "unset", fontWeight: "700" }}
        >
          <PointIcon
            sx={{
              verticalAlign: "middle",
              fontSize: "20px!important",
              marginRight: "0px!important",
            }}
            color={"#FFCE52"}
          />
          ANALISE
        </MenuItem>
        <Divider sx={{ my: 0.3, width: "85%", ml: 2 }} />
        <MenuItem
          onClick={() => setSearchStatus("APPROVED")}
          disableRipple
          sx={{ ml: 2, width: "85%", lineHeight: "unset", fontWeight: "700" }}
        >
          <PointIcon
            sx={{
              verticalAlign: "middle",
              fontSize: "20px!important",
              marginRight: "0px!important",
            }}
            color={"#0BB07B"}
          />
          APROVADO
        </MenuItem>
        <Divider sx={{ my: 0.3, width: "85%", ml: 2 }} />
        <MenuItem
          onClick={() => setSearchStatus("DENIED")}
          disableRipple
          sx={{ ml: 2, width: "85%", lineHeight: "unset", fontWeight: "700" }}
        >
          <PointIcon
            sx={{
              verticalAlign: "middle",
              fontSize: "20px!important",
              marginRight: "0px!important",
            }}
            color={"#F03D3D"}
          />
          NEGADO
        </MenuItem>
        <Divider sx={{ my: 0.3, width: "85%", ml: 2 }} />
        <MenuItem
          onClick={() => setSearchStatus("FINISHED")}
          disableRipple
          sx={{ ml: 2, width: "85%", lineHeight: "unset", fontWeight: "700" }}
        >
          <PointIcon
            sx={{
              verticalAlign: "middle",
              fontSize: "20px!important",
              marginRight: "0px!important",
            }}
            color={"#86878A"}
          />
          FINALIZADO
        </MenuItem>
        <Divider sx={{ my: 0.3, width: "85%", ml: 2 }} />
      </StyledMenu>
    </div>
  );
}
