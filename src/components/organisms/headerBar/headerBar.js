import React, { useState, useEffect } from "react";
import { Badge, Grid, IconButton, Menu } from "@mui/material";
import { IconNotifications, PointIcon } from "components/atoms/icons/icons";
import { formatDistance, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { api } from "services/api";

import Text from "components/atoms/text/text";
import pt from "date-fns/locale/pt";
import ModalCheck from "pages/home/card/Modal/modalCheck";

const HeaderBar = ({ setFetch, fetch }) => {
  const user = useSelector((state) => state?.user);

  const [anchorElTwo, setAnchorElTwo] = useState(false);
  const [showModalCheck, setShowModalCheck] = useState(false);

  const [checkId, setCheckId] = useState("");

  const [notifications, setNotifications] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get("notifications");

      const data = response.data.dataResult.notifications.map(
        (notifications) => ({
          ...notifications,
          timeDistance: formatDistance(
            parseISO(notifications.created_at),
            new Date(),
            { addSuffix: true, locale: pt }
          ),
        })
      );

      const history = response.data.dataResult.history.map((notifications) => ({
        ...notifications,
        timeDistance: formatDistance(
          parseISO(notifications.created_at),
          new Date(),
          { addSuffix: true, locale: pt }
        ),
      }));

      if (response?.data?.dataResult?.notifications?.length >= 0) {
        setHistory(history);
      }

      setNotifications(data);
    }
    if (fetch === true) {
      if (user?.data.userProps?.type_role === "MASTER") {
        loadNotifications();
      }
      setFetch(false);
    }
  }, [fetch, setFetch, user]);

  useEffect(() => {
    setFetch(true);
  }, [setFetch]);

  async function handleMarkAsRead(id) {
    const result = await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map((res) => (res.id === id ? { ...res, read: true } : res))
    );

    setCheckId(result.data.dataResult.freight_id);
    setShowModalCheck(true);

    setFetch(true);
  }

  const open = Boolean(anchorElTwo);

  const handleClickTwo = (ev) => {
    setAnchorElTwo(ev.currentTarget);
  };

  const handleClose = () => {
    setAnchorElTwo(false);
  };

  const handleCheck = (id) => {
    setCheckId(id);
    setShowModalCheck(!showModalCheck);
  };

  return (
    <>
      <Grid
        container
        xs={6}
        md={6}
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
          xs={7.5}
          md={7.5}
          flexWrap="nowrap"
          flexDirection={"row"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Grid item container xs={12} md={12} lg={12} alignItems="flex-end">
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
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              marginTop: "0px!important",
              marginLeft: "-50px!important",
              maxHeight: "345px",
              overflow: "scroll",
              "& .MuiAvatar-root": {
                width: 52,
                height: 32,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                left: 24,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {notifications.map((res) => (
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
              <Grid
                item
                container
                xs={10}
                md={12}
                lg={12}
                flexDirection={"column"}
                onClick={() => handleMarkAsRead(res?.id)}
              >
                <Text
                  sx={{
                    cursor: "pointer",
                    fontWeight: "900",
                    maxWidth: "380px",
                  }}
                >
                  {res?.content}
                </Text>
                <Text fontSize={"12px"}>{res?.timeDistance}</Text>
              </Grid>
              <Grid
                item
                container
                xs={3}
                md={2}
                lg={3}
                justifyContent={"center"}
              >
                <PointIcon color={`${res.read === false && "#0BB07B"}`} />
              </Grid>
            </Grid>
          ))}
          {history.length > 0 &&
            history.map((res) => (
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
                <Grid
                  item
                  container
                  xs={10}
                  md={12}
                  lg={12}
                  flexDirection={"column"}
                  onClick={() => handleCheck(res?.freight_id)}
                >
                  <Text
                    sx={{
                      cursor: "pointer",
                      fontWeight: "900",
                      maxWidth: "380px",
                    }}
                  >
                    {res?.content}
                  </Text>
                  <Text fontSize={"12px"}>{res?.timeDistance}</Text>
                </Grid>
                <Grid
                  item
                  container
                  xs={3}
                  md={2}
                  lg={3}
                  justifyContent={"center"}
                >
                  <PointIcon color={`${res.read === true && "#86878A"}`} />
                </Grid>
              </Grid>
            ))}
          {notifications?.length === 0 && history?.length === 0 && (
            <Grid
              item
              justifyContent="center"
              alignItems="center"
              pt={5}
              padding={"12px"}
            >
              <Text fontSize={"18px"} center>
                Não há Notificações
              </Text>
            </Grid>
          )}
        </Menu>
      </Grid>

      {showModalCheck && (
        <ModalCheck
          checkId={checkId}
          showModal={showModalCheck}
          setShowModal={setShowModalCheck}
        />
      )}
    </>
  );
};

export default HeaderBar;
