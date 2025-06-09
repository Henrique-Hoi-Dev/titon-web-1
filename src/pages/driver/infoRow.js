import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { moneyMask } from 'utils/masks'
import { DropUpSharpIcon } from 'assets/icons/icons'
import { SCell, SRow } from 'components/atoms/BaseTable/BaseTable'
import { useTranslation } from 'react-i18next'

const InfoRow = ({
  data,
  index,
  setShowModalDelete,
  setShowModalUpdate,
  setShowModalCredit,
  setDriveId,
}) => {
  const { t } = useTranslation()

  const [openSettings, setOpenSettings] = useState(false)
  const [anchorEl, setAnchorEl] = useState(false)

  const handleClick = (ev) => {
    setOpenSettings(!openSettings)
    setAnchorEl(ev.currentTarget)
  }

  const handleDelete = (id, name) => {
    setShowModalDelete(true)
    setDriveId({ id: id, name: name })
    setOpenSettings(false)
  }

  const handleUpdate = (id) => {
    setShowModalUpdate(true)
    setDriveId({ id: id })
    setOpenSettings(false)
  }

  const handleCredit = (id, name) => {
    setShowModalCredit(true)
    setDriveId({ id: id, name: name })
    setOpenSettings(false)
  }

  return (
    <>
      <SRow key={data.id} alternatingcolors={index}>
        <SCell>{data.id}</SCell>
        <SCell>{data.name}</SCell>
        <SCell
          sx={{
            color: `${(data.credit > 0 && 'green') || (data.credit < 0 && 'red')}`,
          }}
        >
          {moneyMask(data.credit || [0])}
        </SCell>
        <SCell>{data?.truck?.truckModels?.toUpperCase() ?? '--'}</SCell>
        <SCell>{data?.cart?.cartModels?.toUpperCase() ?? '--'}</SCell>
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
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        open={openSettings}
        onClose={() => setOpenSettings(!openSettings)}
      >
        <MenuItem onClick={() => handleUpdate(data?.id)}>{t('button.edit')}</MenuItem>
        <MenuItem onClick={() => handleCredit(data?.id, data.name)}>
          {t('button.credit/debit')}
        </MenuItem>
        <MenuItem onClick={() => handleDelete(data?.id, data.name)}>{t('button.delete')}</MenuItem>
      </Menu>
    </>
  )
}

export default InfoRow
