import React, { useEffect, useState, useCallback } from 'react';
import { IconButton, Popover, Badge, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatDistance, parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { pt } from 'date-fns/locale';

import NotificationsIcon from '@mui/icons-material/Notifications';
import api from '@/services/api';
import BaseText from '../BaseText/BaseText';
import { PointIcon } from '@/assets/icons/icons';
import BaseLoading from '../BaseLoading/BaseLoading';

const BaseNotificationsPopover = () => {
  const { user } = useSelector((state) => state?.auth);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [totalUnread, setTotalUnread] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadNotifications = useCallback(
    async (pageToLoad = 1) => {
      try {
        setIsLoadingMore(true);

        const response = await api.get('manager/notifications', {
          params: {
            limit: 10,
            page: pageToLoad
          }
        });

        const { docs, totalPages, totalUnread } = response.data.data;

        const mapped = docs.map((notification) => ({
          ...notification,
          timeDistance: notification.createdAt
            ? formatDistance(parseISO(notification.createdAt), new Date(), {
                addSuffix: true,
                locale: pt
              })
            : t('label.notifications_data_not_available')
        }));

        setTotalUnread(totalUnread);

        setNotifications((prev) => {
          const existingIds = new Set(prev.map((n) => n.id));
          const unique = mapped.filter((n) => !existingIds.has(n.id));
          return [...prev, ...unique];
        });

        setTotalPages(totalPages);
        setPage(pageToLoad);
      } catch (error) {
        console.error('Erro ao carregar notificacoes:', error);
      } finally {
        setIsLoadingMore(false);
      }
    },
    [t]
  );

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 20;

    if (bottom && page < totalPages && !isLoadingMore) {
      loadNotifications(page + 1);
    }
  };

  useEffect(() => {
    if (user.type_role === 'MASTER') {
      loadNotifications();
    }
  }, [user, t, loadNotifications]);

  async function handleMarkAsRead(id) {
    try {
      const result = await api.put(`manager/notifications/${id}/read`);

      setNotifications((prev) =>
        prev.map((res) => (res.id === id ? { ...res, read: true } : res))
      );

      redirection(result?.data?.data?.financialStatementsId);
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
    }
  }

  function redirection(id) {
    navigate(`/info-financial/${id}`);
    handleClose();
  }

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotifications([]);
    setPage(1);
    loadNotifications();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Badge badgeContent={totalUnread} color="error">
          <NotificationsIcon sx={{ color: '#fff' }} />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              width: 520,
              height: 320,
              p: 1,
              backgroundColor: '#2b2b2c',
              display: 'flex',
              flexDirection: 'column',
              color: '#fff',
              overflow: 'hidden'
            }
          }
        }}
      >
        <Box
          onScroll={handleScroll}
          sx={{
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            pr: 1
          }}
        >
          {notifications?.map((res) => (
            <Grid
              key={`noti-${res?.id}`}
              container
              sx={{
                cursor: 'pointer',
                borderRadius: '8px',
                padding: '10px',
                '&:hover': { backgroundColor: '#2F2F2F' }
              }}
              onClick={() =>
                res.read
                  ? redirection(res?.financialStatementsId)
                  : handleMarkAsRead(res?.id)
              }
            >
              <Grid
                item
                xs={12}
                container
                justifyContent={'space-between'}
                alignContent={'center'}
              >
                <BaseText maxWidth={'400px'} fontsize={'18px'}>
                  {res?.content}
                </BaseText>
                <PointIcon color={!res.read ? '#FF5252' : '#0BB07B'} />
              </Grid>
              <Grid item xs={12}>
                <BaseText color={'#A3A3A3'} fontsize={'14px'}>
                  {res?.timeDistance}
                </BaseText>
              </Grid>
            </Grid>
          ))}

          {notifications?.length === 0 && !isLoadingMore && (
            <Grid container justifyContent="center" alignItems="center" p={5}>
              <BaseText fontSize={'18px'} center>
                {t('menu.notFoundNotifications')}
              </BaseText>
            </Grid>
          )}

          {isLoadingMore && <BaseLoading />}
        </Box>
      </Popover>
    </>
  );
};

export default BaseNotificationsPopover;
