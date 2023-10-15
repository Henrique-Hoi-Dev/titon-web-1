import React, { useState } from 'react'
import { Box, Collapse, IconButton, Menu, MenuItem } from '@mui/material'
import { useMediaQuery } from 'react-responsive'
import { moneyMask } from 'utils/masks'
import { ArrowDownIcon, ArrowUpIcon, IconActions } from 'assets/icons/icons'
import {
  SCell,
  SRow,
  STable,
  STableBody,
  SCellTwoHead
} from 'components/atoms/BaseTable/BaseTable'

const InfoRow = (props) => {
  const { data, index, setShowModalDelete, setShowModalUpdate, setCartId } =
    props

  const [open, setOpen] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)
  const [anchorEl, setAnchorEl] = useState(false)

  const isDesktop = useMediaQuery({ maxWidth: '1250px' })
  const isSmallDesktop = useMediaQuery({ maxWidth: '1100px' })
  const isMobile = useMediaQuery({ maxWidth: '730px' })

  const typeBodywork = [
    { value: 'bucket', label: 'Caçanba' },
    { value: 'bulkCarrier', label: 'Graneleiro' },
    { value: 'sider', label: 'Sider' },
    { value: 'chest', label: 'Bau' },
    { value: 'tank', label: 'Tanque' }
  ]

  const getBodywork = () =>
    typeBodywork.find((item) => item.value === data?.cart_bodyworks)

  const handleClick = (ev) => {
    setOpenSettings(!openSettings)
    setAnchorEl(ev.currentTarget)
  }

  const handleDelete = (id, name) => {
    setShowModalDelete(true)
    setCartId({ id: id, name: name })
    setOpenSettings(false)
  }

  const handleUpdate = (id) => {
    setShowModalUpdate(true)
    setCartId({ id: id })
    setOpenSettings(false)
  }

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

        <SCell displaywidth={isMobile ? 1 : 0}>{data?.cart_brand}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {data?.cart_models.toUpperCase()}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {data?.cart_board.toUpperCase()}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {data?.cart_color.toUpperCase()}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data?.cart_tara}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {getBodywork()?.label.toUpperCase()}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {data?.cart_chassis}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data?.cart_year}</SCell>
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
        <MenuItem onClick={() => handleUpdate(data?.id)}>Editar</MenuItem>
        <MenuItem onClick={() => handleDelete(data?.id, data?.cart_models)}>
          Excluir
        </MenuItem>
      </Menu>
    </>
  )
}

export default InfoRow
