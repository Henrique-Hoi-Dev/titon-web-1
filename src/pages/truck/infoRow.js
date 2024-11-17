import React, { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DropUpSharpIcon
} from 'assets/icons/icons';
import { SCell, SRow } from 'components/atoms/BaseTable/BaseTable';
import { useTranslation } from 'react-i18next';

const InfoRow = (props) => {
  const { t } = useTranslation();

  const { data, index, setShowModalDelete, setShowModalUpdate, setTruckId } =
    props;

  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  const isDesktop = useMediaQuery({ maxWidth: '1250px' });
  const isSmallDesktop = useMediaQuery({ maxWidth: '1100px' });
  const isMobile = useMediaQuery({ maxWidth: '730px' });

  const handleClick = (ev) => {
    setOpenSettings(!openSettings);
    setAnchorEl(ev.currentTarget);
  };

  const handleDelete = (id, name) => {
    setShowModalDelete(true);
    setTruckId({ id: id, name: name });
    setOpenSettings(false);
  };

  const handleUpdate = (id) => {
    setShowModalUpdate(true);
    setTruckId({ id: id });
    setOpenSettings(false);
  };

  return (
    <>
      <SRow key={data.id} alternatingcolors={index}>
        <SCell minwidth={'0px'} displaywidth={isDesktop ? 0 : 1}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </IconButton>
        </SCell>

        <SCell displaywidth={isMobile ? 1 : 0}>{data.truck_name_brand}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data.truck_models}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {data.truck_board.toUpperCase()}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data.truck_color}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data.truck_km} KM</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {data.truck_chassis}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data.truck_year}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          <Avatar
            alt="img"
            sx={{
              height: '70px',
              width: '70px',
              marginLeft: '12px',
              borderRadius: '8px'
            }}
            src={data.truck_avatar}
          />
        </SCell>
        <SCell>
          <IconButton
            color="default"
            size="small"
            sx={{
              background: '#1877F2',
              '& .icon': {
                transition: 'transform 0.3s ease-in-out'
              },
              '&:hover': {
                backgroundColor: '#1657A2',
                transform: 'scale(1.1)',
                transition: 'background-color 0.3s ease, transform 0.3s ease'
              }
            }}
            onClick={(ev) => handleClick(ev)}
          >
            <DropUpSharpIcon
              className="icon"
              sx={{
                color: '#fff',
                transform: `${openSettings ? '' : 'rotate(180deg)'}`
              }}
            />
          </IconButton>
        </SCell>
      </SRow>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        sx={{
          zIndex: 10,
          mt: 5,
          '& .MuiPaper-root': {
            bgcolor: '#333',
            color: '#fff',
            '& .MuiMenuItem-root': {
              '&:hover': {
                bgcolor: '#444'
              }
            }
          }
        }}
        open={openSettings}
        onClose={() => setOpenSettings(!openSettings)}
      >
        <MenuItem onClick={() => handleUpdate(data?.id)}>
          {t('modal.edit')}
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleDelete(
              data?.id,
              `${data?.truck_name_brand + ' ' + data?.truck_models}`
            )
          }
        >
          {t('button.delete')}
        </MenuItem>
      </Menu>
    </>
  );
};

export default InfoRow;
