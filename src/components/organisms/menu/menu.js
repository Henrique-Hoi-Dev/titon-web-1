import React, { useContext } from 'react'
import { IconButton, List, ListItemText, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '@/store/modules/auth/authSlice'
import { templateContext } from '@/components/templates/main'
import { useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import {
  Drawer,
  ListItemCategory,
  IconMenuCategory,
  ButtonMenu,
  DrawerHeader,
  ListText,
  ListSub,
  ListItemCategoryUser,
} from './styles'

import { IconMenuHome, IconMenuTruck, IconMenuUser, IconMenuTrailer } from 'assets/icons/icons'
import { useLocation } from 'react-router-dom'

import BaseAvatar from '@/components/molecules/BaseAvatar/BaseAvatar'

const Menu = ({ setFetch }) => {
  const user = useSelector((state) => state?.auth?.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { t } = useTranslation()
  const { openMenu } = useContext(templateContext)

  const handleLogOut = () => {
    dispatch(signOut())
  }

  const isActive = (path) => location.pathname === path

  if (!openMenu) return null

  return (
    <Drawer variant="permanent" open={openMenu}>
      <DrawerHeader></DrawerHeader>
      <List sx={{ marginTop: '20px', border: 'none' }}>
        {/* home */}
        <ListItemCategory onClick={() => navigate('/') || setFetch(true)}>
          <ButtonMenu
            sx={{
              justifyContent: openMenu ? 'initial' : 'center',
              marginLeft: openMenu ? '25px' : '0px',
              color: isActive('/') ? '#fff' : 'inherit',
              backgroundColor: isActive('/home') ? '#1877F2' : 'inherit',
              borderRadius: '8px',
            }}
          >
            <Tooltip title={'Home'} placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : 'auto' }}>
                <IconMenuHome sx={{ fontSize: '30px' }} />
              </IconMenuCategory>
            </Tooltip>

            <ListItemText
              sx={{
                opacity: openMenu ? 1 : 0,
                fontSize: '1.2rem',
                marginTop: '10px',
              }}
            >
              {t('menu.home')}
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>
        {/* driver */}
        <ListItemCategory onClick={() => navigate('/driver') || setFetch(true)}>
          <ButtonMenu
            sx={{
              justifyContent: openMenu ? 'initial' : 'center',
              marginLeft: openMenu ? '25px' : '0px',
              color: isActive('/driver') ? '#fff' : 'inherit',
              backgroundColor: isActive('/driver') ? '#1877F2' : 'inherit',
              borderRadius: '8px',
            }}
          >
            <Tooltip title={'Motoristas'} placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : 'auto' }}>
                <IconMenuUser sx={{ fontSize: '25px' }} />
              </IconMenuCategory>
            </Tooltip>

            <ListItemText
              sx={{
                opacity: openMenu ? 1 : 0,
                fontSize: '1.2rem',
                marginTop: '10px',
              }}
            >
              {t('menu.drivers')}
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>
        {/* truck */}
        <ListItemCategory onClick={() => navigate('/truck')} sx={{ display: 'block' }}>
          <ButtonMenu
            sx={{
              justifyContent: openMenu ? 'initial' : 'center',
              marginLeft: openMenu ? '25px' : '0px',
              color: isActive('/truck') ? '#fff' : 'inherit',
              backgroundColor: isActive('/truck') ? '#1877F2' : 'inherit',
              borderRadius: '8px',
            }}
          >
            <Tooltip title="Caminhões" placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : 'auto' }}>
                <IconMenuTruck sx={{ fontSize: '30px' }} />
              </IconMenuCategory>
            </Tooltip>

            <ListItemText
              sx={{
                opacity: openMenu ? 1 : 0,
                fontSize: '1.2rem',
                marginTop: '10px',
              }}
            >
              {t('menu.trucks')}
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>
        {/* cart */}
        <ListItemCategory
          onClick={() => navigate('/cart') || setFetch(true)}
          sx={{ display: 'block' }}
        >
          <ButtonMenu
            sx={{
              justifyContent: openMenu ? 'initial' : 'center',
              marginLeft: openMenu ? '25px' : '0px',
              color: isActive('/cart') ? '#fff' : 'inherit',
              backgroundColor: isActive('/cart') ? '#1877F2' : 'inherit',
              borderRadius: '8px',
            }}
          >
            <Tooltip title="Carretas" placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : 'auto' }}>
                <IconMenuTrailer sx={{ fontSize: '27px' }} />
              </IconMenuCategory>
            </Tooltip>

            <ListItemText
              sx={{
                opacity: openMenu ? 1 : 0,
                fontSize: '1.2rem',
                marginTop: '10px',
              }}
            >
              {t('menu.carts')}
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>

        {/* menus desativados até  */}
        {/* <ListItemCategory onClick={() => navigate('/report')}>
          <ButtonMenu
            sx={{
              justifyContent: openMenu ? 'initial' : 'center',
              marginLeft: openMenu ? '25px' : '0px'
            }}
          >
            <Tooltip title={'Relatórios'} placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : 'auto' }}>
                <IconMenuFile sx={{ fontSize: '30px' }} />
              </IconMenuCategory>
            </Tooltip>

            <ListItemText
              sx={{
                opacity: openMenu ? 1 : 0,
                fontSize: '1.2rem',
                marginTop: '10px',
                fontWeight: '400!important'
              }}
            >
              {t('menu.reports')}
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>

        <ListItemCategory
          onClick={() => navigate('/check') || setFetch(true)}
          sx={{
            display: 'block'
          }}
        >
          <ButtonMenu
            sx={{
              justifyContent: openMenu ? 'initial' : 'center',
              marginLeft: openMenu ? '25px' : '0px'
            }}
          >
            <Tooltip title="Histórico" placement="top">
              <IconMenuCategory sx={{ mr: openMenu ? 0.4 : 'auto' }}>
                <IconMenuTaskAltIcon sx={{ fontSize: '30px' }} />
              </IconMenuCategory>
            </Tooltip>

            <ListItemText
              sx={{
                opacity: openMenu ? 1 : 0,
                fontSize: '1.2rem',
                marginTop: '10px'
              }}
            >
              {t('menu.check')}
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory> */}
      </List>

      <ListSub>
        <ListItemCategoryUser
          onClick={() => navigate('/user')}
          sx={{
            display: 'block',
          }}
        >
          <ButtonMenu
            sx={{
              justifyContent: openMenu ? 'initial' : 'center',
            }}
          >
            <IconMenuCategory sx={{ mr: openMenu ? 0.4 : 'auto' }}>
              <BaseAvatar src={user?.avatar} styles={{ fontSize: '30px' }} />
            </IconMenuCategory>

            <ListText sx={{ opacity: openMenu ? 1 : 0 }}>{user?.name ?? 'user'}</ListText>
          </ButtonMenu>

          <IconButton onClick={() => handleLogOut()} sx={{ color: '#fff' }}>
            <FiLogOut style={{ fontSize: '25px' }} />
          </IconButton>
        </ListItemCategoryUser>
      </ListSub>
    </Drawer>
  )
}

export default Menu
