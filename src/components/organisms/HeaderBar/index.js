import React, { useState, useEffect } from 'react';
import { Badge, Grid, IconButton, Menu } from '@mui/material';
import { IconNotifications, PointIcon } from 'assets/icons/icons';
import { formatDistance, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import api from '@/services/api';
import Text from '@/components/atoms/BaseText/BaseText';
import pt from 'date-fns/locale/pt';
import logo from '../../../assets/logo.png';
import BaseModalCheck from '../../molecules/BaseModalCheck/BaseModalCheck';

const HeaderBar = ({ setFetch, fetch }) => {
  const { user } = useSelector((state) => state?.auth);
  const { t } = useTranslation();

  const [anchorElTwo, setAnchorElTwo] = useState(false);
  const [showModalCheck, setShowModalCheck] = useState(false);

  const [checkId, setCheckId] = useState('');

  const [notifications, setNotifications] = useState([]);
  const [, setHistory] = useState([]);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const response = await api.get('manager/notifications');

        const data = response.data.data.notifications.map((notifications) => ({
          ...notifications,
          timeDistance: notifications.created_at
            ? formatDistance(parseISO(notifications.created_at), new Date(), {
                addSuffix: true,
                locale: pt
              })
            : 'Data não disponível'
        }));

        const history = response.data.data.history.map((notifications) => ({
          ...notifications,
          timeDistance: notifications.created_at
            ? formatDistance(parseISO(notifications.created_at), new Date(), {
                addSuffix: true,
                locale: pt
              })
            : 'Data não disponível'
        }));

        if (response?.data?.data?.notifications?.length >= 0) {
          setHistory(history);
        }

        setNotifications(data);
      } catch (error) {
        console.error('Erro ao carregar notificações:', error);
      }
    }

    if (fetch === true && user.type_role === 'MASTER') {
      loadNotifications();
      setFetch(false);
    }
  }, [fetch, setFetch, user]);

  useEffect(() => {
    setFetch(true);
  }, [setFetch]);

  async function handleMarkAsRead(id) {
    try {
      const result = await api.put(`manager/notifications/${id}/read`);

      setNotifications(
        notifications.map((res) =>
          res.id === id ? { ...res, read: true } : res
        )
      );

      if (result?.data?.data?.freight_id && result?.data?.data?.driver_id) {
        setCheckId({
          freightId: result.data.data.freight_id,
          driverId: result.data.data.driver_id
        });
        setShowModalCheck(true);
      }

      setFetch(true);
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
    }
  }

  const open = Boolean(anchorElTwo);

  const handleClickTwo = (ev) => {
    setAnchorElTwo(ev.currentTarget);
  };

  const handleClose = () => {
    setAnchorElTwo(false);
  };

  return (
    <>
      <Grid
        item
        container
        xs={12}
        md={12}
        pl={4}
        sx={{
          position: 'fixed',
          background: '#1C1C1C',
          width: '100%',
          height: '64px',
          zIndex: 10
        }}
        alignItems="center"
        justifyContent={'flex-end'}
      >
        <Grid
          item
          container
          flexWrap="nowrap"
          alignItems="center"
          justifyContent={'flex-start'}
        >
          <img
            width={'200px'}
            height={'30px'}
            src={logo}
            alt="img"
            style={{ marginRight: '40px' }}
          />

          {user?.type_role === 'MASTER' && (
            <IconButton
              color="error"
              fontSize="12px"
              onClick={(ev) => handleClickTwo(ev)}
            >
              <Badge badgeContent={notifications.length} color="info">
                <IconNotifications sx={{ color: '#fff' }} />
              </Badge>
            </IconButton>
          )}
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
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              background: '#2B2B2C',
              paddingTop: '15px',
              paddingLeft: '10px',
              marginTop: '0px!important',
              marginLeft: '-25px!important',
              maxHeight: '345px',
              overflow: 'scroll',
              width: '560px',
              '& .MuiAvatar-root': {
                width: 52,
                height: 32,
                mr: 1
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 24,
                width: 10,
                height: 10,
                bgcolor: '#2B2B2C',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {notifications?.map((res) => (
            <Grid
              item
              container
              xs={12}
              md={12}
              lg={12}
              flexWrap={'nowrap'}
              alignItems={'center'}
              key={res.id}
              p={'10px'}
            >
              <Grid
                item
                container
                xs={10}
                md={12}
                lg={12}
                flexDirection={'column'}
                onClick={() => handleMarkAsRead(res?.id)}
                sx={{
                  cursor: 'pointer'
                }}
              >
                <Text
                  sx={{
                    fontWeight: '900',
                    maxWidth: '500px'
                  }}
                >
                  {res?.content}
                </Text>
                <Text fontSize={'12px'}>{res?.timeDistance}</Text>
              </Grid>
              <Grid
                item
                container
                xs={3}
                md={2}
                lg={3}
                justifyContent={'center'}
              >
                <PointIcon color={`${res.read === false && '#0BB07B'}`} />
              </Grid>
            </Grid>
          ))}

          {notifications?.length === 0 && (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              p={5}
              padding={'12px'}
            >
              <Text fontSize={'18px'} center>
                {t('menu.notFoundNotifications')}
              </Text>
            </Grid>
          )}
        </Menu>
      </Grid>

      {showModalCheck && (
        <BaseModalCheck
          checkId={checkId}
          showModal={showModalCheck}
          setShowModal={setShowModalCheck}
        />
      )}
    </>
  );
};

export default HeaderBar;
