import { Grid } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

import BaseSelect from '../BaseSelect/BaseSelect';
import BaseInput from '../BaseInput/BaseInput';

const BaseSelectWithInput = ({
  labelTextSelect,
  requiredInput,
  onChangeSelect,
  options,
  value,
  labelText,
  label,
  onChange,
  placeholder,
  getOptionLabel,
  xs,
  md,
  lg,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 500 });

  return (
    <Grid
      container
      item
      xs={xs ? xs : isMobile ? 12 : 6}
      md={md ? md : 4}
      lg={lg ? lg : 2}
      direction={'row'}
      gap={2}
      sx={{ flexWrap: 'nowrap' }}
    >
      <BaseSelect
        sx={{ minWidth: '140px' }}
        labelText={labelTextSelect}
        placeholder={placeholder}
        options={options}
        getOptionLabel={getOptionLabel}
        onChange={onChangeSelect}
      />
      <BaseInput
        required={requiredInput}
        value={value}
        label={label}
        labelText={labelText}
        onChange={onChange}
      />
    </Grid>
  );
};

export default BaseSelectWithInput;
