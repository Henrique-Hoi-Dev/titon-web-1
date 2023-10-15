import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'
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
  const { data, index, setShowModalDelete, setShowModalUpdate, setTruckId } =
    props

  const [open, setOpen] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)
  const [anchorEl, setAnchorEl] = useState(false)

  const isDesktop = useMediaQuery({ maxWidth: '1250px' })
  const isSmallDesktop = useMediaQuery({ maxWidth: '1100px' })
  const isMobile = useMediaQuery({ maxWidth: '730px' })

  const handleClick = (ev) => {
    setOpenSettings(!openSettings)
    setAnchorEl(ev.currentTarget)
  }

  const handleDelete = (id, name) => {
    setShowModalDelete(true)
    setTruckId({ id: id, name: name })
    setOpenSettings(false)
  }

  const handleUpdate = (id) => {
    setShowModalUpdate(true)
    setTruckId({ id: id })
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
            sx={{ height: '70px', width: '70px', marginLeft: '12px' }}
            src={data.truck_avatar}
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
        <MenuItem onClick={() => handleUpdate(data?.id)}>Editar</MenuItem>
        <MenuItem
          onClick={() =>
            handleDelete(
              data?.id,
              `${data?.truck_name_brand + ' ' + data?.truck_models}`
            )
          }
        >
          Excluir
        </MenuItem>
      </Menu>

      <SRow displaywidth={isDesktop ? 0 : 1} sx={{ backgroundColor: 'white' }}>
        <SCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 4 }}>
              <STable aria-label="purchases">
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  <STableBody>
                    <SRow sx={{ backgroundColor: 'white' }}>
                      <SCellTwoHead displaywidth={isMobile ? 0 : 1}>
                        ID
                      </SCellTwoHead>
                      <SCell displaywidth={isMobile ? 0 : 1}>
                        {data.roomid}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: 'white' }}>
                      <SCellTwoHead displaywidth={isSmallDesktop ? 0 : 1}>
                        ID
                      </SCellTwoHead>
                      <SCell displaywidth={isSmallDesktop ? 0 : 1}>
                        {data.userid}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: 'white' }}>
                      <SCellTwoHead displaywidth={isSmallDesktop ? 0 : 1}>
                        value
                      </SCellTwoHead>
                      <SCell displaywidth={isSmallDesktop ? 0 : 1}>
                        {moneyMask(data.value || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: 'white' }}>
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                        trst
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                        {data.date}
                      </SCell>
                    </SRow>
                  </STableBody>
                </Box>
              </STable>
            </Box>
          </Collapse>
        </SCell>
      </SRow>
    </>
  )
}

export default InfoRow
