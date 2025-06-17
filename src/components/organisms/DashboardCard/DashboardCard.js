import React from 'react';
import { Box, Grid, Typography, MenuItem, Select, Divider, Link } from '@mui/material';

const DashboardCard = () => {
  const [uf, setUf] = React.useState('SP');

  const handleChange = (event) => {
    setUf(event.target.value);
  };

  return (
    <Box pl={6} color="#fff" width="100%">
      <Grid container flexWrap="nowrap">
        <Grid item xs={3} md={3} lg={3}>
          <Typography variant="subtitle2" color="gray">
            Média Diesel
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Select
              value={uf}
              onChange={handleChange}
              size="small"
              sx={{ color: '#2196f3', borderBottom: '1px solid #2196f3' }}
              variant="standard"
            >
              <MenuItem value="SP">SP</MenuItem>
              <MenuItem value="RJ">RJ</MenuItem>
              <MenuItem value="MG">MG</MenuItem>
            </Select>
            <Typography>R$ 6,25/l</Typography>
          </Box>

          <Box mt={3}>
            <Typography variant="subtitle2" color="gray">
              Gasto em combustível:
            </Typography>
            <Typography variant="h6">R$ 7.543,78</Typography>
          </Box>

          <Box mt={3}>
            <Typography variant="subtitle2" color="gray">
              Gasto em manutenção:
            </Typography>
            <Typography variant="h6">R$ 10.124,78</Typography>
          </Box>
        </Grid>

        <Grid item xs={5} md={5} lg={5}>
          <Typography variant="subtitle2" color="gray">
            Caminhão
          </Typography>

          {[
            'Mercedes ABC-1234',
            'Volkswagen ABC-1234',
            'Volvo ABC-1234',
            'Mercedes ABC-1234',
            'Scania ABC-1234',
          ].map((truck, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              mt={index === 0 ? 1 : 0.5}
            >
              <Typography>{truck}</Typography>
              <Typography>R$ 7.453,00</Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2, borderColor: '#333' }} />

          <Box display="flex" justifyContent="space-between">
            <Typography>
              Viagens Efetuadas: <strong>14</strong>
            </Typography>
            <Typography>
              Média de Viagem:{' '}
              <Link href="#" underline="hover" color="primary">
                R$ 6.500
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardCard;
