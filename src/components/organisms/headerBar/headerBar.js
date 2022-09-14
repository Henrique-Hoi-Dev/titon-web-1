import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { templateContext } from "components/templates/main/main";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { signOut } from "store/modules/auth/actions";
import { useStateValue } from "context/state";
import { useMediaQuery } from "react-responsive";

import Autocomplete from "components/atoms/autocomplete/autocomplete";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

import {
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Text from "components/atoms/text/text";

const HeaderBar = () => {
  const { t, i18n } = useTranslation();

  const isSmallDesktop = useMediaQuery({ maxWidth: "710px" });

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [roomIds, setRoomIds] = useState(null);
  const [, setState] = useStateValue();

  const { openMenu, } = useContext(templateContext);
  const [openSettings, setOpenSettings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  useEffect(() => {
    setState({ type: 'roomId', payload: roomIds });
  }, [setState, roomIds, isSmallDesktop])

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
          ml: `${openMenu ? "268px" : "60px"}`,
          width: `${openMenu ? "calc(100% - 268px)" : "calc(100% - 60px)"}`,
        }}
        justifyContent="flex-end"
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
          <Text sx={{ margin: "18px" }} >{t("field.room")}s</Text>
          <Grid item xs={10} md={3.2} mt={-3} maxHeight="20px" flexDirection="row">
            <Autocomplete 
                sx={{
                  "& .MuiOutlinedInput-root": { padding: "5.5px 8px 0.5px 34px"},
                  "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": { top: "-4px" }
                }}
                options={user?.data ?? []}
                getOptionLabel={(option) => option?.nick || ''}
                onChange={(ev, newValue) => {
                    if(newValue === null) {
                      return setRoomIds(() => '')
                    }
                    setRoomIds(() => newValue.id)
                }}          
            />
          </Grid>

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
