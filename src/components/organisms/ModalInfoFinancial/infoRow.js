import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { SCell, SRow } from 'components/atoms/BaseTable/BaseTable'
import { formatDate } from 'utils/formatDate'
import { Button } from '@mui/material'
import { status } from 'utils/status'

const InfoRow = (props) => {
  const { data, index, setCheckId, setShowModalAction } = props

  const isSmallDesktop = useMediaQuery({ maxWidth: '1100px' })
  const isMobile = useMediaQuery({ maxWidth: '730px' })

  const getStatus = (res) => status.find((item) => item.value === res) ?? ''

  const handleAction = (ev, id) => {
    ev.preventDefault()
    setCheckId(id)
    setShowModalAction(true)
  }

  return (
    <>
      <SRow key={data.id} alternatingcolors={index}>
        <SCell displaywidth={isMobile ? 1 : 0}>
          <Button
            style={{ color: getStatus(data?.status).color }}
            onClick={(ev) => handleAction(ev, data?.id)}
          >
            {getStatus(data?.status).label}
          </Button>
        </SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>
          {data?.finalFreightCity.toUpperCase() ?? '---'}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {data?.locationTruck.toUpperCase()}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {formatDate(data?.date)}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {data?.totalFreight}
        </SCell>
      </SRow>

      {/* <SRow 
        displaywidth={isDesktop ? 0 : 1} 
        sx={{ backgroundColor: "white" }}>
        <SCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={6}
        >
          <Collapse 
            // in={open} 
            timeout="auto" 
            unmountOnExit
          >
            <Box sx={{ margin: 4 }}>
              <STable aria-label="purchases">
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  <STable aria-label="purchases" sx={{ borderRadius: "8px" }}>
                    <SHead>
                      <SRow>
                        <SCell displaywidth={isDesktop ? 0 : 1}>
                          <SLabel
                            active={query?.sort_field === "start_km"}
                            direction={query?.sort_order?.toLowerCase()}
                            onClick={() => handleSort("start_km")}
                          >
                            Valor Tonelada
                          </SLabel>
                        </SCell>
                        <SCell displaywidth={isDesktop ? 0 : 1}>
                          <SLabel
                            active={query?.sort_field === "preview_value_diesel"}
                            direction={query?.sort_order?.toLowerCase()}
                            onClick={() => handleSort("preview_value_diesel")}
                          >
                            Valor Prévia Diesel
                          </SLabel>
                        </SCell>
                        <SCell displaywidth={isDesktop ? 0 : 1}>
                          <SLabel
                            active={query?.sort_field === "start_date"}
                            direction={query?.sort_order?.toLowerCase()}
                            onClick={() => handleSort("start_date")}
                          >
                            Data Check Frete
                          </SLabel>
                        </SCell>
                      </SRow>
                    </SHead>
                    <STableBody>
                      <SRow alternatingcolors={index}>
                        <SCell displaywidth={isDesktop ? 0 : 1}>{moneyMask(data.value_tonne)}</SCell>
                        <SCell displaywidth={isDesktop ? 0 : 1}>{moneyMask(data.preview_value_diesel)}</SCell>
                        <SCell displaywidth={isDesktop ? 0 : 1}>{formatDate(data.createdAt)}</SCell>
                      </SRow>                      
                    </STableBody>
                  </STable>
                </Box>
              </STable>
            </Box>
          </Collapse>
        </SCell>
      </SRow> */}
    </>
  )
}

export default InfoRow
