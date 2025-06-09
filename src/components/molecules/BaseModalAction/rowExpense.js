import React from 'react'
import { SCell, SRow } from 'components/atoms/BaseTable/BaseTable'
import { formatDate } from 'utils/formatDate'

const RowExpense = (props) => {
  const { data, index } = props

  return (
    <>
      <SRow key={data.id} alternatingcolors={index}>
        <SCell>{formatDate(data?.date) ?? '---'}</SCell>
        <SCell>{data?.time ?? '---'}</SCell>
        <SCell>{data?.local}</SCell>
        <SCell>{data?.expenseDescription ?? '---'}</SCell>
        <SCell>{data?.payment?.value}</SCell>
        <SCell>{data?.payment?.modo ?? '---'}</SCell>
      </SRow>
    </>
  )
}

export default RowExpense
