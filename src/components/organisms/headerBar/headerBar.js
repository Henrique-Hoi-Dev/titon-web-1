import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "store/modules/auth/actions";
import {
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import Text from "components/atoms/text/text";
import Button from "components/atoms/button/button";

const HeaderBar = () => {

  const dispatch = useDispatch();

  const users = useSelector((state) => state?.user);

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
        justifyContent="center"
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
            onClick={(ev) => navigate("/")}
          >
            PERMISSÕES
          </IconButton>
          <IconButton
            color="error"
            fontSize="12px"
            sx={{ mr: 1 }}
            onClick={(ev) => navigate("/")}
          >
            RELATÓRIOS
          </IconButton>
          <IconButton
            color="error"
            fontSize="12px"
            sx={{ mr: 1 }}
            onClick={(ev) => navigate("cart")}
          >
            CARRETAR
          </IconButton>
          <IconButton
            color="error"
            fontSize="12px"
            sx={{ mr: 1 }}
            onClick={(ev) => navigate("truck")}
          >
            CAMINHÕES
          </IconButton>
          <IconButton
            color="error"
            fontSize="12px"
            sx={{ mr: 1 }}
            onClick={(ev) => navigate("driver")}
          >
            MOTORISTAS
          </IconButton>
          <IconButton
            color="error"
            fontSize="12px"
            sx={{ mr: 1 }}
            onClick={(ev) => navigate("financial")}
          >
            FICHAS MOTORISTAS
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
              sx={{ ml: "25px" }}
              onClick={(ev) => handleClick(ev)}
            >
              <Avatar
                sx={{
                  ":hover": {
                    cursor: "pointer",
                  },
                  height: "40px",
                  width: "40px",
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
            width: "300px"
          }}
          open={openSettings}
          onClose={() => setOpenSettings(!openSettings)}
        >
          <Grid 
            item 
            container
            xs={12}
            md={12}
            lg={12}
            mt={2}
            mb={2}
            alignItems="center"
            flexDirection={"column"}
            justifyContent="center"
          >
            <Avatar
              sx={{
                height: "30px",
                width: "30px",
                marginRight: "5px",
              }}
            />
            <Text sx={{ fontWeight: "900" }}>{users?.data?.users?.type_position}</Text>
          </Grid>
          <MenuItem sx={{ fontWeight: "700" }} onClick={() => navigate("/user")}>Usuários</MenuItem>
          <MenuItem sx={{ fontWeight: "700" }} onClick={handleLogOut}>
            <Button 
              sx={{ 
                backgroundColor: "red",
                "&:hover": {
                  backgroundColor: "red"
                }
              }}
            >
              SAIR...              
            </Button>
          </MenuItem>
        </Menu>
      </Grid>
    </>
  );
};

export default HeaderBar;
