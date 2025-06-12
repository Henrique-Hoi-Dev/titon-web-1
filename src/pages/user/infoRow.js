import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { DropUpSharpIcon } from 'assets/icons/icons';
import { SCell, SRow } from 'components/atoms/BaseTable/BaseTable';

export default function InfoRow({
  data,
  index,
  setShowModalDelete,
  setShowModalUpdate,
  setUserId,
}) {
  const [openSettings, setOpenSettings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  const handleClick = (ev) => {
    setOpenSettings(!openSettings);
    setAnchorEl(ev.currentTarget);
  };

  const handleDelete = (id, name) => {
    setShowModalDelete(true);
    setUserId({ id: id, name: name });
    setOpenSettings(false);
  };

  const handleUpdate = (id) => {
    setShowModalUpdate(true);
    setUserId({ id: id });
    setOpenSettings(false);
  };

  return (
    <>
      <SRow key={data.id} alternatingcolors={index}>
        <SCell>{data.id}</SCell>
        <SCell>{data.name}</SCell>
        <SCell>{data.email}</SCell>
        <SCell>{data.typeRole}</SCell>
        <SCell>
          <IconButton
            color="default"
            size="small"
            sx={{
              background: '#1877F2',
              '& .icon': {
                transition: 'transform 0.3s ease-in-out',
              },
              '&:hover': {
                backgroundColor: '#1657A2',
                transform: 'scale(1.1)',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
              },
            }}
            onClick={(ev) => handleClick(ev)}
          >
            <DropUpSharpIcon
              className="icon"
              sx={{
                color: '#fff',
                transform: `${openSettings ? '' : 'rotate(180deg)'}`,
              }}
            />
          </IconButton>
        </SCell>
      </SRow>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          zIndex: 10,
          mt: 5,
          '& .MuiPaper-root': {
            bgcolor: '#333',
            color: '#fff',
            '& .MuiMenuItem-root': {
              '&:hover': {
                bgcolor: '#444',
              },
            },
          },
        }}
        open={openSettings}
        onClose={() => setOpenSettings(!openSettings)}
      >
        <MenuItem onClick={() => handleUpdate(data?.id)}>Editar</MenuItem>
        <MenuItem onClick={() => handleDelete(data?.id, data.name)}>Excluir</MenuItem>
      </Menu>
    </>
  );
}
