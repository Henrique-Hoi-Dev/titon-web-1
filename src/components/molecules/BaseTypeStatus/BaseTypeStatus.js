import { Grid } from '@mui/material'
import BaseText from '../../atoms/BaseText/BaseText'
import { typeStatus, typeStatusTable } from 'utils/status'

export const BaseTypeStatus = ({ sx, props, statusTable = false }) => {
  return (
    <Grid
      item
      bgcolor={
        statusTable
          ? typeStatusTable(props).background
          : typeStatus(props).background
      }
      borderRadius={'8px'}
      sx={{
        ...sx,
        minWidth: '100px',
        textAlign: 'center',
        borderColor: statusTable
          ? typeStatusTable(props).color
          : typeStatus(props).color,
        borderWidth: 2,
        borderStyle: 'solid',
        padding: '5px 8px'
      }}
      p={'5px 8px 5px 8px'}
    >
      <BaseText
        fontsize={'12px'}
        sx={{ fontWeight: '10px' }}
        font_weight="600"
        color={
          statusTable ? typeStatusTable(props).color : typeStatus(props).color
        }
      >
        {statusTable ? typeStatusTable(props).label : typeStatus(props).label}
      </BaseText>
    </Grid>
  )
}
