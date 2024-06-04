import React, { useState, useEffect } from 'react'
import { Badge, Grid, IconButton, Menu } from '@mui/material'
import { IconNotifications, PointIcon } from 'assets/icons/icons'
import { formatDistance, parseISO } from 'date-fns'
import { useSelector } from 'react-redux'
import { api } from 'services/api'

import Text from 'components/atoms/BaseText/BaseText'
import pt from 'date-fns/locale/pt'
import ModalCheck from 'components/organisms/ModalCheck'
import logo from '../../../assets/logo.png'

const HeaderBar = ({ setFetch, fetch }) => {
  const user = useSelector((state) => state?.user)

  const [anchorElTwo, setAnchorElTwo] = useState(false)
  const [showModalCheck, setShowModalCheck] = useState(false)

  const [checkId, setCheckId] = useState('')

  const [notifications, setNotifications] = useState([])
  const [, setHistory] = useState([])

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications')

      const data = response.data.notifications.map((notifications) => ({
        ...notifications,
        timeDistance: formatDistance(
          parseISO(notifications.created_at),
          new Date(),
          { addSuffix: true, locale: pt }
        )
      }))

      const history = response.data.history.map((notifications) => ({
        ...notifications,
        timeDistance: formatDistance(
          parseISO(notifications.created_at),
          new Date(),
          { addSuffix: true, locale: pt }
        )
      }))

      if (response?.data?.notifications?.length >= 0) {
        setHistory(history)
      }

      setNotifications(data)
    }
    if (fetch === true) {
      if (user?.data.userProps?.type_role === 'MASTER') {
        loadNotifications()
      }
      setFetch(false)
    }
  }, [fetch, setFetch, user])

  useEffect(() => {
    setFetch(true)
  }, [setFetch])

  async function handleMarkAsRead(id) {
    const result = await api.put(`notifications/${id}`)

    setNotifications(
      notifications.map((res) => (res.id === id ? { ...res, read: true } : res))
    )

    setCheckId({
      freightId: result.data.freight_id,
      driverId: result.data.driver_id
    })
    setShowModalCheck(true)

    setFetch(true)
  }

  const open = Boolean(anchorElTwo)

  const handleClickTwo = (ev) => {
    setAnchorElTwo(ev.currentTarget)
  }

  const handleClose = () => {
    setAnchorElTwo(false)
  }

  // const handleCheck = (freightId, driverId) => {
  //   setCheckId({ freightId: freightId, driverId: driverId })
  //   setShowModalCheck(!showModalCheck)
  // }

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

          <IconButton
            color="error"
            fontSize="12px"
            onClick={(ev) => handleClickTwo(ev)}
          >
            <Badge badgeContent={notifications.length} color="info">
              <IconNotifications sx={{ color: '#fff' }} />
            </Badge>
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
          {notifications.map((res) => (
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

          {/* {history.length > 0 &&
            history.map((res) => (
              <Grid
                item
                container
                xs={12}
                md={12}
                lg={12}
                flexWrap={'nowrap'}
                alignItems={'center'}
                key={res.id}
                sx={{ padding: '10px' }}
              >
                <Grid
                  item
                  container
                  xs={10}
                  md={12}
                  lg={12}
                  flexDirection={'column'}
                  onClick={() => handleCheck(res?.freight_id, res?.driver_id)}
                >
                  <Text
                    sx={{
                      cursor: 'pointer',
                      fontWeight: '900',
                      maxWidth: '380px'
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
                  <PointIcon color={`${res.read === true && '#86878A'}`} />
                </Grid>
              </Grid>
            ))} */}

          {notifications?.length === 0 && (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              p={5}
              padding={'12px'}
            >
              <Text fontSize={'18px'} center>
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
  )
}

export default HeaderBar
