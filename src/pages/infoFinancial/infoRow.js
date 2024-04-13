import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { SCell, SRow } from 'components/atoms/BaseTable/BaseTable'
import { formatDate } from 'utils/formatDate'
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
      <SRow
        key={data.id}
        alternatingcolors={index}
        sx={{
          cursor: 'pointer',
          '&:hover': { border: '2px solid #545454' }
        }}
        onClick={(ev) => handleAction(ev, data?.id)}
      >
        <SCell sx={{ p: 2 }} displaywidth={isMobile ? 1 : 0}>
          <div style={{ color: getStatus(data?.status).color }}>
            {getStatus(data?.status).label}
          </div>
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
    </>
  )
}

export default InfoRow
