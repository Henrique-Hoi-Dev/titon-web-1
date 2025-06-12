import { Paper, styled } from '@mui/material';

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  margin: '2px',
  color: '#fff',
  background: '#707070',
  borderRadius: '50%',
  height: '35px',
  width: '35px',
  lineHeight: '37px',
}));
