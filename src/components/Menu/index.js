import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../store/modules/auth/actions';
import { makeStyles } from '@material-ui/core/styles';
import { TiThMenu } from 'react-icons/ti';
import { Container, Header, Perfil } from './styles';
import { ListItemText } from '@material-ui/core';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Logout from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

export default function Home() {
  const data = useSelector((state) => state.user.profile);

  const [state, setState] = useState({
    top: false,
  });
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 200,
        marginTop: '70px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        color: '#9c98a6',
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{}}>
        <ListItem>
          <DashboardIcon sx={{ marginRight: '10px' }} />{' '}
          <Link style={{ color: '#9c98a6' }} to="/dashboard">
            Dashboard
          </Link>
        </ListItem>
        <ListItem>
          <PointOfSaleIcon sx={{ marginRight: '10px' }} />{' '}
          <Link style={{ color: '#9c98a6' }} to={`/caixa/${data?.id}`}>
            Caixa
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List sx={{}}>
        <ListItem>
          <ListAltIcon sx={{ marginRight: '10px' }} />{' '}
          <Link style={{ color: '#9c98a6' }} to="/listProducts">
            Produtos
          </Link>
        </ListItem>
        <ListItem>
          <ListAltIcon sx={{ marginRight: '10px' }} />{' '}
          <Link style={{ color: '#9c98a6' }} to="/listServico">
            Serviços
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }

  const useStyles = makeStyles({
    root: {
      borderRadius: 3,
      border: 0,
      height: '20px',
      color: '#9c98a6',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: '16px',
      '&:hover': {
        color: '#9c98a6',
      },
    },
    exit: {
      color: 'red',
    },
    menu: {},
  });

  const classes = useStyles();
  
  return (
    <Container>
      <Header>
        <div>
          {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                <TiThMenu
                  size={50}
                  color="#4D4C4C"
                  onClick={toggleDrawer(true)}
                />
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
        <Perfil>
          <nav>
            <h4>Profissional:</h4>
            <strong>{data?.name ?? "Desconhecido"}</strong>
            <h4>Cargo:</h4>
            <strong>{data?.company_position ?? 'sem cargo'}</strong>
          </nav>
          <img
            onClick={handleClick}
            src={data?.avatar ?? 'https://i.pinimg.com/474x/a6/70/05/a67005e9bf90bc529088205650784bba.jpg'}
            alt="avatar"
          />
          <Menu
            anchorEl={anchorEl}
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
                  width: 32,
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
            getContentAnchorEl={null}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem className={classes.menu}>
              <Avatar sx={{ background: '#353535' }} />
              <Link className={classes.root} to={`/perfil/${data?.id}`}>
                Profile
              </Link>
            </MenuItem>
            <Divider />
            <MenuItem className={classes.exit} onClick={handleSignOut}>
              <Logout
                sx={{ marginRight: '7px', marginLeft: '10px', color: '#fff' }}
              />
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Perfil>
      </Header>
    </Container>
  );
}
