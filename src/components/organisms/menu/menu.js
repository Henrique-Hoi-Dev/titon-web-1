import React, { useContext, useEffect } from "react";
import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../store/modules/auth/actions";
import { templateContext } from "components/templates/main/main";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FiLogOut } from "react-icons/fi";
import {
  Drawer,
  ListItemCategory,
  IconMenuCategory,
  ButtonMenu,
  DrawerHeader,
  ListText,
  ListSub,
  ListItemCategoryUser,
} from "./styles";

import {
  IconMenuHome,
  IconMenuTruck,
  IconMenuUser,
  IconMenuFile,
  IconMenuTrailer,
  IconMenuTaskAltIcon,
} from "components/atoms/icons/icons";

import logo from "../../../assets/logo.png";

const Menu = ({ setFetch }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(signOut());
    navigate("/login");
  };

  const { openMenu, setOpenMenu } = useContext(templateContext);

  const isSmallDesktop = useMediaQuery({ maxWidth: "710px" });

  useEffect(() => {
    if (isSmallDesktop) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  }, [openMenu, setOpenMenu, isSmallDesktop]);

  return (
    <Drawer variant="permanent" open={openMenu}>
      <DrawerHeader>
        <Grid
          item
          container
          alignItems={"center"}
          mt={2.5}
          sx={{
            display: `${!openMenu && "none"}`,
          }}
        >
          <img
            width={"200px"}
            height={"30px"}
            src={logo}
            alt="img"
            style={{ marginRight: "-15px" }}
          />
        </Grid>
      </DrawerHeader>
      <List sx={{ marginTop: "20px", border: "none" }}>
        <ListItemCategory onClick={() => navigate("/home") || setFetch(true)}>
          <ButtonMenu
            sx={{
              justifyContent: openMenu ? "initial" : "center",
              marginLeft: openMenu ? "25px" : "0px",
            }}
          >
            <Tooltip title={"Home"} placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : "auto" }}>
                <IconMenuHome sx={{ fontSize: "30px" }} />
              </IconMenuCategory>
            </Tooltip>

            <ListItemText
              sx={{
                opacity: openMenu ? 1 : 0,
                fontSize: "1.2rem",
                marginTop: "10px",
              }}
            >
              Home
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>

        <ListItemCategory onClick={() => navigate("/driver") || setFetch(true)}>
          <ButtonMenu
            sx={{
              justifyContent: openMenu ? "initial" : "center",
              marginLeft: openMenu ? "25px" : "0px",
            }}
          >
            <Tooltip title={"Motoristas"} placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : "auto" }}>
                <IconMenuUser sx={{ fontSize: "25px" }} />
              </IconMenuCategory>
            </Tooltip>

            <ListItemText
              sx={{
                opacity: openMenu ? 1 : 0,
                fontSize: "1.2rem",
                marginTop: "10px",
              }}
            >
              Motoristas
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>

        <ListItemCategory
          onClick={() => navigate("/truck")}
          sx={{ display: "block" }}
        >
          <ButtonMenu
            sx={{
              justifyContent: openMenu ? "initial" : "center",
              marginLeft: openMenu ? "25px" : "0px",
            }}
          >
            <Tooltip title="Caminhões" placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : "auto" }}>
                <IconMenuTruck sx={{ fontSize: "30px" }} />
              </IconMenuCategory>
            </Tooltip>

            <ListItemText
              sx={{
                opacity: openMenu ? 1 : 0,
                fontSize: "1.2rem",
                marginTop: "10px",
              }}
            >
              Caminhões
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>

        <ListItemCategory
          onClick={() => navigate("/cart") || setFetch(true)}
          sx={{ display: "block" }}
        >
          <ButtonMenu
            sx={{
              justifyContent: openMenu ? "initial" : "center",
              marginLeft: openMenu ? "25px" : "0px",
            }}
          >
            <Tooltip title="Carretas" placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : "auto" }}>
                <IconMenuTrailer sx={{ fontSize: "27px" }} />
              </IconMenuCategory>
            </Tooltip>

            <ListItemText
              sx={{
                opacity: openMenu ? 1 : 0,
                fontSize: "1.2rem",
                marginTop: "10px",
              }}
            >
              Carretas
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>

        <ListItemCategory onClick={() => navigate("/report")}>
          <ButtonMenu
            sx={{
              justifyContent: openMenu ? "initial" : "center",
              marginLeft: openMenu ? "25px" : "0px",
            }}
          >
            <Tooltip title={"Relatórios"} placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : "auto" }}>
                <IconMenuFile sx={{ fontSize: "30px" }} />
              </IconMenuCategory>
            </Tooltip>

            <ListItemText
              sx={{
                opacity: openMenu ? 1 : 0,
                fontSize: "1.2rem",
                marginTop: "10px",
                fontWeight: "400!important",
              }}
            >
              Relatórios
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>

        <ListItemCategory
          onClick={() => navigate("/check") || setFetch(true)}
          sx={{
            display: "block",
          }}
        >
          <ButtonMenu
            sx={{
              justifyContent: openMenu ? "initial" : "center",
              marginLeft: openMenu ? "25px" : "0px",
            }}
          >
            <Tooltip title="Histórico" placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : "auto" }}>
                <IconMenuTaskAltIcon sx={{ fontSize: "30px" }} />
              </IconMenuCategory>
            </Tooltip>

            <ListItemText
              sx={{
                opacity: openMenu ? 1 : 0,
                fontSize: "1.2rem",
                marginTop: "10px",
              }}
            >
              Checklist
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>
      </List>

      <ListSub>
        <ListItemCategoryUser
          onClick={() => navigate("/user")}
          sx={{
            display: "block",
          }}
        >
          <ButtonMenu
            sx={{
              justifyContent: openMenu ? "initial" : "center",
            }}
          >
            <IconMenuCategory sx={{ mr: openMenu ? 0.4 : "auto" }}>
              <Avatar sx={{ fontSize: "30px" }} />
            </IconMenuCategory>

            <ListText sx={{ opacity: openMenu ? 1 : 0 }}>
              {user?.data?.userProps?.name}
            </ListText>
          </ButtonMenu>

          <IconButton onClick={() => handleLogOut()} sx={{ color: "#fff" }}>
            <FiLogOut style={{ fontSize: "25px" }} />
          </IconButton>
        </ListItemCategoryUser>
      </ListSub>
    </Drawer>
  );
};

export default Menu;
