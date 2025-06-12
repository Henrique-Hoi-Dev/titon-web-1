import * as React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Grid } from '@mui/material';
import {
  // IconSubMenuTrendingDownIcon,
  // IconSubMenuTrendingUpIcon,
  PointIcon,
} from 'assets/icons/icons';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    backgroundColor: '#1C1C1C', // Define o fundo escuro no modo dark
    color: '#ffffff', // Define a cor do texto
    boxShadow:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.1) 0px 0px 10px'
        : 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? '#1E1E1E'
            : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

export default function BaseMenuHomeFilterFinancial({ setSearchStatus, setSearchOrder }) {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClear = () => {
    setSearchOrder('');
    setSearchStatus('');
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        sx={{ color: '#ffff' }}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {t('subMenu.label')}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Grid item container p={1} ml={2} sx={{ color: '#1877F2' }}>
          {t('subMenu.label1')}
        </Grid>
        <MenuItem
          onClick={() => handleClear() || handleClose()}
          disableRipple
          sx={{ ml: 2, width: '80%', lineHeight: 'unset', fontWeight: '700' }}
        >
          {t('subMenu.label2')}
        </MenuItem>
        <Divider sx={{ my: 0.3, width: '85%', ml: 2, mt: -2 }} />
        <MenuItem
          onClick={() => setSearchOrder('ASC') || handleClose()}
          disableRipple
          sx={{ ml: 2, width: '80%', lineHeight: 'unset', fontWeight: '700' }}
        >
          A-Z
        </MenuItem>
        <Divider sx={{ my: 0.3, width: '85%', ml: 2, mt: -2 }} />
        <MenuItem
          onClick={() => setSearchOrder('DESC') || handleClose()}
          disableRipple
          sx={{ ml: 2, width: '85%', lineHeight: 'unset', fontWeight: '700' }}
        >
          Z-A
        </MenuItem>
        {/* <Divider sx={{ my: 0.3, width: '85%', ml: 2 }} />
        <MenuItem
          onClick={handleClose}
          disableRipple
          sx={{ ml: 2, width: '85%', lineHeight: 'unset', fontWeight: '700' }}
        >
          $ <IconSubMenuTrendingUpIcon />
        </MenuItem>
        <Divider sx={{ my: 0.3, width: '85%', ml: 2 }} />
        <MenuItem
          onClick={handleClose}
          disableRipple
          sx={{ ml: 2, width: '85%', lineHeight: 'unset', fontWeight: '700' }}
        >
          $ <IconSubMenuTrendingDownIcon />
        </MenuItem> */}
        <Divider sx={{ my: 0.3, width: '85%', ml: 2 }} />
        <MenuItem
          onClick={() => setSearchStatus('PENDING') || handleClose()}
          disableRipple
          sx={{ ml: 2, width: '85%', lineHeight: 'unset', fontWeight: '700' }}
        >
          <PointIcon
            sx={{
              verticalAlign: 'middle',
              fontSize: '20px!important',
              marginRight: '0px!important',
            }}
            color={'#FFCE52'}
          />
          {t('subMenu.labelStatus1')}
        </MenuItem>
        <Divider sx={{ my: 0.3, width: '85%', ml: 2 }} />
        <MenuItem
          onClick={() => setSearchStatus('APPROVED') || handleClose()}
          disableRipple
          sx={{ ml: 2, width: '85%', lineHeight: 'unset', fontWeight: '700' }}
        >
          <PointIcon
            sx={{
              verticalAlign: 'middle',
              fontSize: '20px!important',
              marginRight: '0px!important',
            }}
            color={'#0BB07B'}
          />
          {t('subMenu.labelStatus2')}
        </MenuItem>
        <Divider sx={{ my: 0.3, width: '85%', ml: 2 }} />
        <MenuItem
          onClick={() => setSearchStatus('DENIED') || handleClose()}
          disableRipple
          sx={{ ml: 2, width: '85%', lineHeight: 'unset', fontWeight: '700' }}
        >
          <PointIcon
            sx={{
              verticalAlign: 'middle',
              fontSize: '20px!important',
              marginRight: '0px!important',
            }}
            color={'#F03D3D'}
          />
          {t('subMenu.labelStatus3')}
        </MenuItem>
        <Divider sx={{ my: 0.3, width: '85%', ml: 2 }} />
        <MenuItem
          onClick={() => setSearchStatus('FINISHED') || handleClose()}
          disableRipple
          sx={{ ml: 2, width: '85%', lineHeight: 'unset', fontWeight: '700' }}
        >
          <PointIcon
            sx={{
              verticalAlign: 'middle',
              fontSize: '20px!important',
              marginRight: '0px!important',
            }}
            color={'#86878A'}
          />
          {t('subMenu.labelStatus4')}
        </MenuItem>
        <Divider sx={{ my: 0.3, width: '85%', ml: 2 }} />
      </StyledMenu>
    </div>
  );
}
