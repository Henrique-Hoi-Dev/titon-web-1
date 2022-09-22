import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { templateContext } from "components/templates/main/main";
import { useNavigate } from "react-router-dom";
import { signOut } from "store/modules/auth/actions";
// import { useStateValue } from "context/state";
// import { useMediaQuery } from "react-responsive";
import {
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

const HeaderBar = () => {
  // const isSmallDesktop = useMediaQuery({ maxWidth: "710px" });

  const dispatch = useDispatch();

  // const user = useSelector((state) => state.user);

  // const { openMenu, } = useContext(templateContext);
  const [openSettings, setOpenSettings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  const handleClick = (ev) => {
    setOpenSettings(!openSettings);
    setAnchorEl(ev.currentTarget);
  };

  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(signOut())
    navigate("/login");
  };

  return (
    <>
      <Grid
        container
        sx={{
          position: "sticky",
          backgroundColor: "inherit",
          height: "64px",
        }}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Grid 
          item 
          container
          xs={6}
          md={10}
          flexWrap="nowrap"
          alignItems="center"
        >
          <IconButton
            color="error"
            fontSize="12px"
            sx={{ mr: 1 }}
            onClick={(ev) => navigate("/home")}
          >
            HOME
          </IconButton>
          <IconButton
            color="error"
            fontSize="12px"
            sx={{ mr: 1 }}
            onClick={(ev) => navigate("/conjuntos")}
          >
            CONJUNTOS
          </IconButton>
          <IconButton
            color="error"
            fontSize="12px"
            sx={{ mr: 1 }}
            onClick={(ev) => navigate('permission')}
          >
            PERMISSÕES
          </IconButton>
          <IconButton
            color="error"
            fontSize="12px"
            sx={{ mr: 1 }}
            onClick={(ev) => navigate("/report")}
          >
            RELATÓRIOS
          </IconButton>
          <IconButton
            color="error"
            fontSize="12px"
            sx={{ mr: 1 }}
            onClick={(ev) => navigate("driver")}
          >
            MOTORISTAS
          </IconButton>

          <Grid 
            item 
            container
            xs={12}
            md={12}
            lg={12}
            alignItems="center"
            justifyContent="flex-end"
          >
            <IconButton
              color="inherit"
              fontSize="12px"
              sx={{ mr: 1 }}
              onClick={(ev) => handleClick(ev)}
            >
              <Avatar
                sx={{
                  ":hover": {
                    cursor: "pointer",
                  },
                  height: "30px",
                  width: "30px",
                }}
              />
            </IconButton>          
          </Grid>          
        </Grid>

        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          sx={{
            zIndex: 4444,
            mt: 5,
          }}
          open={openSettings}
          onClose={() => setOpenSettings(!openSettings)}
        >
          <MenuItem onClick={() => navigate("/user")}>Usuários</MenuItem>
          <MenuItem onClick={handleLogOut}>SAIR...</MenuItem>
        </Menu>
      </Grid>
    </>
  );
};

export default HeaderBar;
