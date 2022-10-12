import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "store/modules/auth/actions";
import {
  Avatar,
  Badge,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { formatDistance, parseISO } from "date-fns";
import { api } from "services/api";

import NotificationsIcon from '@mui/icons-material/Notifications';
import Text from "components/atoms/text/text";
import Button from "components/atoms/button/button";
import pt from "date-fns/locale/pt";
import CommentIcon from '@mui/icons-material/Comment';
import logo from '../../../assets/logo.png'

const HeaderBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state?.user);

  const [openSettings, setOpenSettings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [anchorElTwo, setAnchorElTwo] = useState(false);
  const [fetch, setFetch] = useState(false)

  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications')

      const data = response.data.dataResult.map(notifications => ({
        ...notifications,
        timeDistance: formatDistance(
          parseISO(notifications.created_at),
          new Date(),
          { addSuffix: true, locale: pt }
        )
      }))

      setNotifications(data)
    }
    if (fetch === true) {
      loadNotifications()
      setFetch(false)
    }
    
  }, [fetch])

  useEffect(() => {
    setFetch(true)
  }, [])

  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`)
    setFetch(true)

    setNotifications(
      notifications.map(res => 
        res.id === id ? { ...res, read: true } : res 
      )
    )
  }

  const open = Boolean(anchorElTwo);

  const handleClickTwo = (ev) => {
    setAnchorElTwo(ev.currentTarget);
  };

  const handleClose = () => {
    setAnchorElTwo(false);
  };

  const handleClick = (ev) => {
    setOpenSettings(!openSettings);
    setAnchorEl(ev.currentTarget);
  };

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
        alignItems="center"
        justifyContent={"flex-start"}
      >
        <Grid
          item 
          container
          xs={2}
          md={2}
          lg={2}
          justifyContent={"center"}
        >
          <img height={"70px"} src={logo} alt="img"/>
        </Grid>
        <Grid 
          item 
          container
          xs={6}
          md={6}
          flexWrap="nowrap"
          alignItems="center"
          justifyContent={"space-between"}
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
            RELATÓRIOS
          </IconButton>
          {/* <IconButton
            color="error"
            fontSize="12px"
            sx={{ mr: 1 }}
            onClick={(ev) => navigate("permission")}
          >
            PERMISSÕES
          </IconButton> */}
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
          <IconButton
            color="error"
            fontSize="12px"
            sx={{ ml: 3 }}
            onClick={(ev) => handleClickTwo(ev)}
          >
            <Badge badgeContent={notifications.length} color="info">
              <NotificationsIcon sx={{ color: "#fff" }} />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            fontSize="12px"
            sx={{ width: "80px" }}
            onClick={(ev) => handleClick(ev)}
          >
            <Grid 
              item 
              container
              xs={12}
              md={12}
              lg={12}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Avatar
                sx={{
                  ":hover": {
                    cursor: "pointer",
                  },
                  height: "50px",
                  width: "50px",
                }}
              />
            </Grid>
          </IconButton>              
        </Grid>

        <Menu
          anchorEl={anchorElTwo}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 52,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {notifications.map(res => (
            <Grid 
              item 
              container
              xs={12}
              md={12}
              lg={12}
              flexWrap={"nowrap"}
              alignItems={"center"}
              key={res.id}
              sx={{ padding: "10px" }}
            >
              <Grid item container xs={10} md={12} lg={12} flexDirection={'column'}>
                <Text 
                  sx={{ 
                    fontWeight: "900", 
                    maxWidth: "380px",
                    color: `${(res.read === true && "red") || 
                    (res.read === false && "green")}`   
                  }}
                >
                  {res?.content}
                </Text>  
                <Text fontSize={'12px'}>
                  {res?.timeDistance}
                </Text>                 
              </Grid>
              <Grid item container xs={3} md={2} lg={2} justifyContent={"flex-end"}>
                <IconButton 
                  onClick={() => (navigate("/permission") || handleMarkAsRead(res?.id))}
                >
                  <CommentIcon 
                    color={`${(res.read === true && "error") || 
                    (res.read === false && "success")}`} 
                  />
                </IconButton>                
              </Grid>
            </Grid>          
          ))}
          {notifications?.length === 0 && (
            <Grid item justifyContent="center" alignItems="center" pt={5} padding={"12px"}>
              <Text fontSize={"28px"} center>
                Não há Notificações
              </Text>
            </Grid>
          )}
        </Menu>

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
