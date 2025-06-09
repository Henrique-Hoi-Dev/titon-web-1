import React from 'react'
import { Checkbox } from '@mui/material'
import { useMediaQuery } from 'react-responsive'
import { formatDate } from 'utils/formatDate'

import { SCell, SRow } from 'components/atoms/BaseTable/BaseTable'

const InfoRow = (props) => {
  const { data, index } = props

  const isDesktop = useMediaQuery({ maxWidth: '1250px' })
  const isSmallDesktop = useMediaQuery({ maxWidth: '1100px' })
  const isMobile = useMediaQuery({ maxWidth: '730px' })

  // const handleUpdate = (id) => {
  //   setShowModalUpdate(true)
  //   setFinancialId(id)
  //   setOpenSettings(false)
  // }

  return (
    <>
      <SRow key={data?.id} alternatingcolors={index}>
        <SCell minwidth={'0px'}>
          <Checkbox
            color="primary"
            // checked={isItemSelected}
            inputProps={
              {
                // 'aria-labelledby': labelId,
              }
            }
          />
        </SCell>

        <SCell displaywidth={isMobile ? 1 : 0}>{data?.driver_name}</SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>{formatDate(data?.start_date)}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data?.truck_models}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data?.cart_models}</SCell>
      </SRow>
    </>
  )
}

export default InfoRow
