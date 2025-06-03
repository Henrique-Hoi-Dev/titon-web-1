import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { DropUpSharpIcon } from 'assets/icons/icons';
import { SCell, SRow } from 'components/atoms/BaseTable/BaseTable';
import { useTranslation } from 'react-i18next';

import enums from '@/utils/enums';

const InfoRow = (props) => {
  const { t } = useTranslation();

  const { data, index, setShowModalDelete, setShowModalUpdate, setCartId } =
    props;

  const [openSettings, setOpenSettings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  const getBodywork = () =>
    enums.typeBodywork.find((item) => item.value === data?.cartBodyworks);

  const handleClick = (ev) => {
    setOpenSettings(!openSettings);
    setAnchorEl(ev.currentTarget);
  };

  const handleDelete = (id, name) => {
    setShowModalDelete(true);
    setCartId({ id: id, name: name });
    setOpenSettings(false);
  };

  const handleUpdate = (id) => {
    setShowModalUpdate(true);
    setCartId({ id: id });
    setOpenSettings(false);
  };

  return (
    <>
      <SRow key={data.id} alternatingcolors={index}>
        <SCell>{data?.cartBrand}</SCell>
        <SCell>{data?.cartModels?.toUpperCase()}</SCell>
        <SCell>{data?.cartBoard?.toUpperCase()}</SCell>
        <SCell>{data?.cartColor?.toUpperCase()}</SCell>
        <SCell>{data?.cartTara}</SCell>
        <SCell>{getBodywork()?.label?.toUpperCase()}</SCell>
        <SCell>{data?.cartChassis}</SCell>
        <SCell>{data?.cartYear}</SCell>
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
          {' '}
          {t('modal.edit')}
        </MenuItem>
        <MenuItem onClick={() => handleDelete(data?.id, data?.cart_models)}>
          {t('button.delete')}
        </MenuItem>
      </Menu>
    </>
  );
};

export default InfoRow;
