import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { templateContext } from "components/templates/main/main";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { signOut } from "store/modules/auth/actions";
// import { useStateValue } from "context/state";
// import { useMediaQuery } from "react-responsive";
import {
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import getUnicodeFlagIcon from "country-flag-icons/unicode";

const HeaderBar = () => {
  const { t, i18n } = useTranslation();

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

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
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
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid 
          item 
          container
          xs={6}
          md={8}
          flexWrap="nowrap"
          alignItems="center"
          justifyContent="flex-end"
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
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            minWidth="180px"
            sx={{ padding: 1, mt: 1 }}
          >
            {t("field.language")}
            <Grid
              container
              item
              direction="row"
              mt={1}
              ml={2}
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid
                item
                lg={4}
                alignItems="center"
                onClick={() => handleChangeLanguage("en")}
                sx={{ cursor: "pointer"}}
              >
                {getUnicodeFlagIcon("US")}
              </Grid>
              <Grid
                item
                lg={4}
                onClick={() => handleChangeLanguage("es")}
                sx={{ cursor: "pointer"}}
              >
                {getUnicodeFlagIcon("ES")}
              </Grid>
              <Grid
                item
                lg={4}
                onClick={() => handleChangeLanguage("pt")}
                sx={{ cursor: "pointer" }}
              >
                {getUnicodeFlagIcon("BR")}
              </Grid>
            </Grid>
          </Grid>
          <MenuItem onClick={handleLogOut}>{t("field.log_out")}</MenuItem>
        </Menu>
      </Grid>
    </>
  );
};

export default HeaderBar;
