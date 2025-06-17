import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '6rem', md: '8rem' },
            fontWeight: 'bold',
            color: '#1877F2',
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: '#F1F3F9',
            mb: 2,
          }}
        >
          {t('not_found.title', 'Página não encontrada')}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#F1F3F9',
            mb: 4,
            maxWidth: '600px',
          }}
        >
          {t('not_found.description', 'Desculpe, a página que você está procurando não existe!')}
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            backgroundColor: '#1877F2',
            '&:hover': {
              backgroundColor: '#1877F2',
              opacity: 0.8,
            },
            padding: '12px 32px',
            fontSize: '1.1rem',
          }}
        >
          {t('not_found.back_home', 'Voltar para Home')}
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
