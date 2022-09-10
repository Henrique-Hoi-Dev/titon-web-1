import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  .header {
    display: flex;
    width: 630px;
    margin-bottom: 40px;

    svg {
      background-color: #8945de;
    }

    h1 {
      color: #9c98a6;
      margin: 23px 0px 0 0;
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
    grid-template-columns: 270px 270px;
    grid-template-rows: 1fr;
    grid-template-areas:
      'status tipo-venda'
      'but but';

    .status {
      grid-area: status;
      display: flex;
      flex-direction: column;
      height: 20px;
    }

    .tipo-venda {
      grid-area: tipo-venda;
      margin: 8px;
      display: flex;
      flex-direction: column;
    }

    .tipo-venda-1 {
      grid-area: tipo-venda-1;
      display: flex;
      flex-direction: column;
    }

    .but {
      grid-area: but;
      display: flex;
      flex-direction: row;
      margin-top: 10px;
    }

    label {
      padding: 0.5rem;
      font: 700 1.4rem Archivo;

      color: #9c98a6;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    }

    p {
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      line-height: 2.4rem;
      color: #9c98a6;
    }

    svg {
      margin-right: 1rem;
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
  select {
    min-width: 15rem;
    background: rgba(0, 0, 0, 0.1);
    padding: 0 15px;
    font: 1rem Archivo;
    border-radius: 0.5rem;
    height: 3.2rem;
    padding: 0 1rem;
    margin: 0 0 1rem;
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
      width: 300px;

      h1 {
        font-size: 24px;
      }
    }

    form {
      display: flex;
      flex-direction: column;

      .status {
        height: 100px;
      }
    }
  }
`;
