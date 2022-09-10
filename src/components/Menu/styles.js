import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1;

  background: #353535;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  align-items: center;

  img {
    width: 65px;
    height: 65px;
    border-radius: 50%;

    &:hover {
      border-radius: 20%;
    }
  }
`;

export const Header = styled.div`
  color: #9c98a6;
  display: flex;
  justify-content: space-between;

  div {
    padding: 8px;
    margin-right: 2rem;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  a {
    text-decoration: none;
    font-weight: bold;
  }

  svg {
    margin: 2px;

    border-radius: 5px;
    transition: background 0.5s;

    &:hover {
      background-color: ${darken(0.02, '#333')};
    }
  }
`;

export const Perfil = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  nav {
    margin-right: 1rem;
    display: flex;
    flex-direction: column;
  }

  h4 {
    font-weight: bold;
    display: flex;
    flex-direction: column;
    color: #8945de;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  }

  img {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    border: 3px solid #8945de;
    background: rgba(255, 255, 255, 0.3);
  }
`;
