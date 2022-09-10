import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #353535;
  max-width: 54rem;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 0.8rem;

  margin: -3rem auto 2rem;
  padding: 2rem;
  display: flex;

  flex-direction: column;
  align-items: center;

  h2 {
    font-weight: bold;
    font-size: 30px;
    color: #9c98a6;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);

    margin-bottom: 29px;
  }

  span {
    color: red;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  }

  form {
    display: grid; 
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100px 1fr;
    grid-template-areas:
    'data valor-open'
    'but but'
    'erro erro';

    .data {
      grid-area: data;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .valor-open {
      grid-area: valor-open;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .but{
      grid-area: but;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .erro {
      grid-area: erro;
    }
    label {
      padding: 0.5rem;
      font-weight: bold;
      font-size: 20px;
      color: #9c98a6;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    }
  }

  button {
    margin: 5px 18px 0;
    height: 3rem;
    width: 12rem;
    background: #8945de;
    font-weight: bold;
    margin-bottom: 1rem;
    border-radius: 4px;
    font-size: 17px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#8945de')};
      transform: scale(1.1);
      transition: all 0.5s;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
  }

  input {
    background: rgba(0, 0, 0, 0.1);
    padding: 0 15px;
    font: 1rem Archivo;
    border-radius: 0.5rem;
    height: 2.2rem;
    padding: 0 1rem;
    margin: 0 10px 1rem;
    border: 2px solid #8945de;
    font-weight: bold;
    color: #9c98a6;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;
