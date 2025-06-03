import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import { formatDate } from 'utils/formatDate';
import { ArrowDownIcon, ArrowUpIcon, IconActions } from 'assets/icons/icons';
import { SCell, SRow } from 'components/atoms/BaseTable/BaseTable';
import { useTranslation } from 'react-i18next';
import BaseAvatar from '@/components/molecules/BaseAvatar/BaseAvatar';

const InfoRow = (props) => {
  const { t } = useTranslation();
  const { data, index, setShowModalDelete, setFinancialId } = props;

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

  const handleDelete = (id) => {
    setShowModalDelete(true);
    setFinancialId(id);
    setOpenSettings(false);
  };

  // const handleUpdate = (id) => {
  //   setShowModalUpdate(true)
  //   setFinancialId(id)
  //   setOpenSettings(false)
  // }

  return (
    <>
      <SRow key={data?.id} alternatingcolors={index}>
        <SCell minwidth={'0px'}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </IconButton>
        </SCell>

        <SCell displaywidth={isMobile ? 1 : 0}>{data?.driver_name}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {data?.truck_models}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data?.cart_models}</SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>
          {formatDate(data?.start_date)}
        </SCell>
        <SCell>
          <BaseAvatar
            src={data?.truck_avatar}
            styles={{ height: '40px', width: '40px', marginLeft: '35px' }}
          />
        </SCell>
        <SCell>
          <IconButton
            color="inherit"
            fontSize="20px"
            sx={{ mr: 1 }}
            onClick={(ev) => handleClick(ev)}
          >
            <IconActions
              sx={{
                color: '#ff443a',
                height: '30px',
                width: '30px'
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
          zIndex: 4444,
          mt: 5
        }}
        open={openSettings}
        onClose={() => setOpenSettings(!openSettings)}
      >
        {/* <MenuItem onClick={() => handleUpdate(data?.id)}>Editar</MenuItem> */}
        <MenuItem onClick={() => handleDelete(data?.id)}>
          {t('modal.delete')}
        </MenuItem>
      </Menu>
    </>
  );
};

export default InfoRow;
