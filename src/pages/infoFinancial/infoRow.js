import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { SCell, SRow } from 'components/atoms/BaseTable/BaseTable'
import { formatDate } from 'utils/formatDate'
import { BaseTypeStatus } from 'components/molecules/BaseTypeStatus/BaseTypeStatus'

const InfoRow = (props) => {
  const { data, setCheckId, setShowModalAction } = props

  const isSmallDesktop = useMediaQuery({ maxWidth: '1100px' })
  const isMobile = useMediaQuery({ maxWidth: '730px' })

  const handleAction = (ev, id) => {
    ev.preventDefault()
    setCheckId(id)
    setShowModalAction(true)
  }

  return (
    <>
      <SRow
        key={data.id}
        sx={{
          cursor: 'pointer',
          '&:hover': { border: '2px solid #545454' }
        }}
        onClick={(ev) => handleAction(ev, data?.id)}
      >
        <SCell displaywidth={isMobile ? 1 : 0}>
          <BaseTypeStatus props={data} statusTable />
        </SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>
          {data?.finalFreightCity.toUpperCase() ?? '---'}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {data?.locationTruck?.toUpperCase()}
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
