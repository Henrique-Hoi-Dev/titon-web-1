import styled from 'styled-components';
import login from '../../../assets/map.png'

export const Wrapper = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${login});

  background-size: contain;
  background-color: rgb(40, 39, 39);
`;