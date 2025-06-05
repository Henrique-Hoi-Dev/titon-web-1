import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { DropUpSharpIcon } from 'assets/icons/icons';
import { SCell, SRow } from 'components/atoms/BaseTable/BaseTable';
import { useTranslation } from 'react-i18next';
import BaseAvatar from '@/components/molecules/BaseAvatar/BaseAvatar';

const InfoRow = ({
  data,
  index,
  setShowModalDelete,
  setShowModalUpdate,
  setTruckId
}) => {
  const { t } = useTranslation();

  const [openSettings, setOpenSettings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  const handleClick = (ev) => {
    setOpenSettings(!openSettings);
    setAnchorEl(ev.currentTarget);
  };

  const handleDelete = (id, name) => {
    setTruckId({ id: id, name: name });
    setShowModalDelete(true);
    setOpenSettings(false);
  };

  const handleUpdate = (id) => {
    setTruckId({ id: id });
    setShowModalUpdate(true);
    setOpenSettings(false);
  };

  return (
    <>
      <SRow key={data.id} alternatingcolors={index}>
        <SCell>{data?.truckNameBrand}</SCell>
        <SCell>{data?.truckModels}</SCell>
        <SCell>{data?.truckBoard?.toUpperCase()}</SCell>
        <SCell>{data?.truckColor}</SCell>
        <SCell>{data?.truckKm} KM</SCell>
        <SCell>{data?.truckChassis}</SCell>
        <SCell>{data?.truckYear}</SCell>
        <SCell>
          <BaseAvatar
            uuid={data?.imageTruck?.uuid}
            category={data?.imageTruck?.category}
            styles={{
              height: '70px',
              width: '70px',
              marginLeft: '12px',
              borderRadius: '8px'
            }}
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
              `${data?.truckNameBrand + ' ' + data?.truckModels}`
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
