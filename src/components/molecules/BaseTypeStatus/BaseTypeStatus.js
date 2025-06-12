import { Grid } from '@mui/material';
import { typeStatus, typeStatusTable } from 'utils/status';

import BaseText from 'components/atoms/BaseText/BaseText';

const BaseTypeStatus = ({ sx, props, statusTable = false }) => {
  return (
    <Grid
      item
      bgcolor={statusTable ? typeStatusTable(props).background : typeStatus(props).background}
      borderRadius={'8px'}
      sx={{
        ...sx,
        minWidth: '100px',
        borderColor: statusTable ? typeStatusTable(props).color : typeStatus(props).color,
        borderWidth: 2,
        borderStyle: 'solid',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      p={'5px 8px 5px 8px'}
    >
      <BaseText
        fontsize={'12px'}
        sx={{ fontWeight: '10px' }}
        font_weight="600"
        color={statusTable ? typeStatusTable(props).color : typeStatus(props).color}
      >
        {statusTable ? typeStatusTable(props).label : typeStatus(props).label}
      </BaseText>
    </Grid>
  );
};

export default BaseTypeStatus;
