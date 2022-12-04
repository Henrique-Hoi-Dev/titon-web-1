import React, { useContext, useEffect } from "react";
import { Grid, List, ListItemText, Tooltip } from "@mui/material";
import { templateContext } from "components/templates/main/main";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { 
  Drawer, 
  ListItemCategory, 
  IconMenuCategory, 
  ButtonMenu,
  DrawerHeader
} from "./styles";

import { 
  IconMenuHome,
  IconArrowLeft,
  IconHamburger,
  IconMenuBox,
  IconMenuTruck,
  IconMenuUser,
  IconMenuFile,
  IconMenuTrailer
} from "components/atoms/icons/icons";

import logo from '../../../assets/logo.png'

const Menu = () => {
  const {openMenu, setOpenMenu} = useContext(templateContext);

  const isSmallDesktop = useMediaQuery({ maxWidth: "710px" });

  useEffect(() => {
    if (isSmallDesktop) {
      setOpenMenu(false)
    }
  }, [
    openMenu, 
    setOpenMenu, 
    isSmallDesktop
  ])

  const navigate = useNavigate();

  return (
    <Drawer variant="permanent" open={openMenu} >
      <DrawerHeader>
        {!openMenu && (
          <Grid item  sx={{
            ml: `${openMenu ? "268px" : "60px"}`,
          }}>
            <IconHamburger
              aria-label="open drawer"
              onClick={() => setOpenMenu(true)}
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
                fontSize: "30px",
                color: "#ffff",
                pl: 2,
                width: "45px",
                height: "45px",
                display: `${!isSmallDesktop ? "" : "none"}`,
                ...(openMenu && { display: "none" }),
              }}
            />
          </Grid>
        )}
  
        {openMenu && (
          <Grid item container alignItems={"center"} sx={{
            ml: `${openMenu ? "0px" : "268px"}`,
          }}>
            <img 
              width={"200px"}
              height={"30px"} 
              src={logo} 
              alt="img" 
              style={{ marginRight: "-15px" }}
            />
            <IconArrowLeft
              aria-label="close drawer"
              onClick={() => setOpenMenu(false)}
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
                fontSize: "40px",
                color: "#ffff",
                pl: 2,
                width: "45px",
                height: "45px",
                display: `${!isSmallDesktop ? "" : "none"}`,
                ...(!openMenu && { display: "none" }),
              }}
            />
        </Grid>
      )}
      </DrawerHeader>
      <List sx={{ marginTop: "20px", border: "none" }}>
        <ListItemCategory
          onClick={() => navigate("/home")}
        >
          <ButtonMenu
            sx={{ 
              justifyContent: openMenu ? 'initial' : 'center',
              marginLeft: openMenu ? '25px' : '0px',
            }}     
          >
            <Tooltip title={"Home"} placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : 'auto' }}>
                <IconMenuHome sx={{ fontSize: "30px" }}/>
              </IconMenuCategory>
            </Tooltip>
           
            <ListItemText sx={{ opacity: openMenu ? 1 : 0, fontSize: "1.2rem", marginTop: "10px" }}>
              Home
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>

        <ListItemCategory
          onClick={() => navigate("/home")}
        >
          <ButtonMenu 
            sx={{ 
              justifyContent: openMenu ? 'initial' : 'center',
              marginLeft: openMenu ? '25px' : '0px',
            }}     
          >
            <Tooltip title={"Relatórios"} placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : 'auto' }}>
                <IconMenuFile sx={{ fontSize: "30px" }}/>
              </IconMenuCategory>
            </Tooltip>
            
            <ListItemText 
              sx={{ opacity: openMenu ? 1 : 0, fontSize: "1.2rem", marginTop: "10px", fontWeight: "400!important" }} 
            >
              Relatórios
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>

        <ListItemCategory
          onClick={() => navigate("/driver")}
        >
          <ButtonMenu 
            sx={{ 
              justifyContent: openMenu ? 'initial' : 'center',
              marginLeft: openMenu ? '25px' : '0px',
            }}           
          >
            <Tooltip title={"Motoristas"} placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : 'auto'}}>
                <IconMenuUser sx={{ fontSize: "25px" }}/>
              </IconMenuCategory>
            </Tooltip>
            
            <ListItemText 
              sx={{ opacity: openMenu ? 1 : 0, fontSize: "1.2rem", marginTop: "10px" }} 
            >
              Motoristas
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>

        <ListItemCategory 
          onClick={() => navigate("/truck")}
          sx={{ display: 'block' }} 
        >
          <ButtonMenu 
            sx={{ 
              justifyContent: openMenu ? 'initial' : 'center',
              marginLeft: openMenu ? '25px' : '0px',
            }}
          >
            <Tooltip title="Caminhões" placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : 'auto'}}>
                <IconMenuTruck sx={{ fontSize: "30px" }}/>
              </IconMenuCategory>
            </Tooltip>
            
            <ListItemText
              sx={{ opacity: openMenu ? 1 : 0, fontSize: "1.2rem", marginTop: "10px" }}
            >
              Caminhões
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>

        <ListItemCategory 
          onClick={() => navigate("/cart")}
          sx={{ display: 'block' }} 
        >
          <ButtonMenu 
            sx={{ 
              justifyContent: openMenu ? 'initial' : 'center',
              marginLeft: openMenu ? '25px' : '0px',
            }}
          >
            <Tooltip title="Carretas" placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : 'auto'}}>
                <IconMenuTrailer sx={{ fontSize: "27px" }}/>
              </IconMenuCategory>
            </Tooltip>
            
            <ListItemText
              sx={{ opacity: openMenu ? 1 : 0, fontSize: "1.2rem", marginTop: "10px" }}
            >
              Carretas
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>

        <ListItemCategory 
          sx={{ 
            display: 'block' 
          }}
        >
          <ButtonMenu 
            sx={{ 
              justifyContent: openMenu ? 'initial' : 'center',
              marginLeft: openMenu ? '25px' : '0px',
            }}
          >
            <Tooltip title="Histórico" placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : 'auto'}}>
                <IconMenuBox sx={{ fontSize: "30px" }}/>
              </IconMenuCategory>
            </Tooltip>
            
            <ListItemText
              sx={{ opacity: openMenu ? 1 : 0, fontSize: "1.2rem", marginTop: "10px" }}
            >
              Histórico
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>
      </List>
    </Drawer>
  );
};

export default Menu;