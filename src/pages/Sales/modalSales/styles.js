import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;

  justify-content: center;
  flex-direction: column;

  .header {
    display: flex;
    width: 630px;
    margin-bottom: 20px;

    svg {
      background-color: #8945de;
    }

    h1 {
      color: #9c98a6;
      margin: 23px 60px 0 0;
    }
  }

  .titulo {
    display: flex;
    justify-content: center;

    h1 {
      padding: 0.5rem;
      font-weight: bold;

      color: #9c98a6;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    }
  }

  form {
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
      'status tipo-venda'
      'tipo-venda-1 tipo-venda-2'
      'but but';

    .status {
      grid-area: status;
      display: flex;
      flex-direction: column;
      margin: 10px;
    }

    .tipo-venda {
      grid-area: tipo-venda;
      display: flex;
      flex-direction: column;
      margin: 10px;
    }

    .tipo-venda-1 {
      grid-area: tipo-venda-1;
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
      margin-top: 25px;

      h2 {
        color: #2ecc71;
        margin-top: 10px;
      }
    }

    .tipo-venda-2 {
      grid-area: tipo-venda-2;
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
      margin-top: 25px;

      h2 {
        color: #2ecc71;
        margin-top: 10px;
      }
    }

    .but {
      grid-area: but;
      display: flex;
      flex-direction: row;
      margin-top: 20px;
    }

    label {
      font: 700 1.4rem Archivo;

      color: #9c98a6;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    }
  }

  a {
    text-align: center;
    text-decoration: none;
    color: #ffff;
    font-weight: bold;
    margin-bottom: 1rem;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
  }

  button {
    margin: 5px 18px 0;
    height: 3rem;
    width: 12rem;
    background: #8945de;
    font-weight: bold;
    margin-bottom: 1rem;
    border-radius: 4px;
    font-size: 16px;
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

  input,
  select,
  .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root {
    min-width: 16rem;
    background: rgba(0, 0, 0, 0.1);
    padding: 0 15px;
    font: 1rem Archivo;
    border-radius: 0.5rem;
    height: 3.2rem;
    padding: 0 1rem;
    margin: 7px 0 7px;
    border: 2px solid #8945de;
    font-weight: bold;
    color: #9c98a6;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    &::-webkit-scrollbar {
      width: 1px;
      height: 10px;
    }
  }

  @media screen and (max-width: 700px) {
    .header {
      width: 225px;

      h1 {
        margin: 23px 0px 0 0;
      }

      svg {
        margin-right: 20px;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
