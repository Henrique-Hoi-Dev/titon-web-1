import { Grid } from '@mui/material'
import BaseText from '../../atoms/BaseText/BaseText'
import { typeStatus, typeStatusTable } from 'utils/status'

export const BaseTypeStatus = ({ props, statusTable = false }) => {
  return (
    <Grid
      item
      bgcolor={
        statusTable
          ? typeStatusTable(props).background
          : typeStatus(props).background
      }
      borderRadius={'8px'}
      p={'0 8px 0 8px'}
    >
      <BaseText
        fontsize={'12px'}
        color={
          statusTable ? typeStatusTable(props).color : typeStatus(props).color
        }
      >
        {statusTable ? typeStatusTable(props).label : typeStatus(props).label}
      </BaseText>
    </Grid>
  )
}
