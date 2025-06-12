import { Grid } from '@mui/material';
import Input from 'components/atoms/input/BaseInput';
import Text from 'components/atoms/BaseText/BaseText';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const BasePasswordCompare = ({ validPassword, setPassword, setConfirmPassword, required }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Grid item container xs={12} md={12} lg={12}>
        <Input
          holder={t('field.password')}
          type={showPassword ? 'text' : 'password'}
          onChange={(ev) => setPassword(ev.target.value)}
          isPassword
          onClick={() => setShowPassword(!showPassword)}
          minLength={6}
          required={required}
        />
      </Grid>
      <Grid item container xs={12} md={12} lg={12}>
        <Input
          holder={t('field.confirm_password')}
          type={showConfirmPassword ? 'text' : 'password'}
          onChange={(ev) => setConfirmPassword(ev.target.value)}
          isPassword
          minLength={6}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          required={required}
        />
      </Grid>
      {!validPassword && (
        <Grid item container justifyContent="center" xs={12} md={12} lg={12}>
          <Text type="warning" center>
            {t('error.passwords_not_match')}
          </Text>
        </Grid>
      )}
    </>
  );
};

export default BasePasswordCompare;
