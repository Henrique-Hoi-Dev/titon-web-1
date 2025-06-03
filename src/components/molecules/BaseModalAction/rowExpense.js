import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { SCell, SRow } from 'components/atoms/BaseTable/BaseTable'
import { formatDate } from 'utils/formatDate'

const RowExpense = (props) => {
  const { data, index } = props

  const isSmallDesktop = useMediaQuery({ maxWidth: '1100px' })
  const isMobile = useMediaQuery({ maxWidth: '730px' })

  return (
    <>
      <SRow key={data.id} alternatingcolors={index}>
        <SCell displaywidth={isMobile ? 1 : 0}>
          {formatDate(data?.date) ?? '---'}
        </SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>{data?.time ?? '---'}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data?.local}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {data?.expenseDescription ?? '---'}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {data?.payment?.value}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {data?.payment?.modo ?? '---'}
        </SCell>
      </SRow>
    </>
  )
}

export default RowExpense
