import React, { useState, useEffect } from "react";
import {
  Badge,
  Grid,
  IconButton,
  Menu,
} from "@mui/material";
import { IconAdd, IconNotifications } from "components/atoms/icons/icons";
import { formatDistance, parseISO } from "date-fns";
import { api } from "services/api";

import Text from "components/atoms/text/text";
import pt from "date-fns/locale/pt";
import CommentIcon from '@mui/icons-material/Comment';
import Input from "components/atoms/input/input";
import Button from "components/atoms/button/button";
import CustomizedMenus from "components/molecules/customizedMenus/customizedMenu";
import ModalAddFinancial from "pages/financialStatement/modalAddFinancial";

const HeaderBar = () => {

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const users = useSelector((state) => state?.user);
  const [showModal, setShowModal] = useState(false);

  // const [openSettings, setOpenSettings] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(false);
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

  // const handleClick = (ev) => {
  //   setOpenSettings(!openSettings);
  //   setAnchorEl(ev.currentTarget);
  // };

  // const handleLogOut = () => {
  //   dispatch(signOut())
  //   navigate("/login");
  // };

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
        justifyContent={"flex-end"}
      >
        <Grid 
          item 
          container
          xs={9.6}
          md={9.6}
          flexWrap="nowrap"
          flexDirection={"row"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Grid 
            item 
            container
            xs={6}
            md={6}
            lg={6}
            alignItems="flex-end"
          >
            <IconButton
              color="error"
              fontSize="12px"
              sx={{ ml: 3, mt: 4, mr: 3 }}
              onClick={(ev) => handleClickTwo(ev)}
            >
              <Badge badgeContent={notifications.length} color="info">
                <IconNotifications sx={{ color: "#fff" }} />
              </Badge>
            </IconButton>

            <CustomizedMenus />
          </Grid>

          <Grid 
            item 
            container
            xs={12}
            md={12}
            lg={12}
            mr={3}
            mt={4}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button 
              onClick={() => setShowModal(true)}
              background={"linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"}
              sx={{
                fontSize: "14px",
                color: "white",
                width: "228px",
                height: "40px",
                marginRight: "15px",
              }}
            >
              Adicionar Nova Ficha <IconAdd sx={{ mt: -0.7 }} />
            </Button>
            <Input
              searches
              searchesType={"searches"}
              styles={{ minWidth: "350px"}}
              placeholder={"Nome, placa..."}
              // onChange={(ev) => setEmail(ev.target.value)}
              required
            />
          </Grid>
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
                  onClick={() => handleMarkAsRead(res?.id)}
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
              <Text fontSize={"18px"} center>
                Não há Notificações
              </Text>
            </Grid>
          )}
        </Menu>
      </Grid>

      <ModalAddFinancial 
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default HeaderBar;
