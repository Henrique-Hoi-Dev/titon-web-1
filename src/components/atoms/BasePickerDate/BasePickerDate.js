import React from 'react';
import { TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import BaseText from 'components/atoms/BaseText/BaseText';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1877F2', // Cor primária
    },
    background: {
      default: '#31363F', // Cor de fundo
      paper: '#424242', // Cor de fundo dos componentes
    },
    text: {
      primary: '#fff',
      secondary: '#B0B0B0',
    },
  },
});

const BasePickerDate = ({ size, label, styles, labelText, ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <BaseText fontsize={'14px'} color={'#1877F2'}>
        {labelText}
      </BaseText>
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <DesktopDatePicker
            {...props}
            label={label}
            inputFormat="dd/MM/yyyy"
            renderInput={(props) => (
              <TextField
                size={`${size === 'medium' ? 'medium' : 'small'}`}
                variant="filled"
                {...props}
                inputProps={{
                  ...props.inputProps,
                  readOnly: true,
                }}
                sx={{
                  fontWeight: 'bold',
                  ...styles,
                  mt: '5px',
                  color: '#fff',
                  background: '#31363F',
                  borderRadius: '8px 8px 0px 0px',
                  '& .MuiFilledInput-input': {
                    color: '#fff',
                    opacity: '0.5',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#fff',
                    opacity: '0.5',
                  },
                  '& .MuiFilledInput-underline:before': {
                    borderBottomColor: '#1877F2',
                  },
                  '& .MuiFilledInput-underline:after': {
                    borderBottomColor: '#1877F2',
                  },
                  '& .MuiFilledInput-underline:hover:after': {
                    borderBottomColor: '#1877F2!important',
                  },
                  '& .MuiFilledInput-underline:hover:before': {
                    borderBottomColor: '#1877F2!important',
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
};

export default BasePickerDate;
