import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  font-size: 0.8rem;

  svg {
    &:hover {
      transform: scale(1.1);
      transition: all 0.5s;
    }
  }

  .header-main {
    border-radius: 0.8rem;
    overflow: hidden;

    #container-input {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 195px;
      grid-template-areas:
        'campo2 campo'
        'button button';
    }
    .campo2 {
      grid-area: campo2;
      margin: 10px;
    }
    .campo {
      grid-area: campo;
      margin: 10px;
    }
    .buttons-container {
      grid-area: button;
    }

    input {
      font: 1rem Archivo;
      border-radius: 0.5rem;
      background: rgba(0, 0, 0, 0.1);
      height: 2.2rem;
      width: 13.5rem;
      padding: 0 1rem;
      margin: 0 0 1rem;
      border: 2px solid #8945de;
      font-weight: bold;
      color: #9c98a6;
    }

    select {
      font: 1rem Archivo;
      border-radius: 0.5rem;
      background: rgba(0, 0, 0, 0.1);
      width: 13.5rem;
      height: 2.2rem;
      padding: 0 1rem;
      margin: 0 0 1rem;
      border: 2px solid #8945de;
      font-weight: bold;
      color: #9c98a6;
    }

    .form-input {
      margin-top: -17px;
      margin-left: 50px;
    }
  }

  button {
    margin: 5px 55px 0;
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

  .header-title {
    padding: 42px;

    label {
      font: 700 1.4rem Archivo;
      color: #8945de;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-bottom: 1rem;
      margin-top: 0.5rem;
    }

    p {
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      line-height: 2.4rem;
      color: #9c98a6;
    }

    footer {
      padding: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      svg {
        margin-right: 1rem;
      }
    }
  }

  @media (max-width: 700px) {
    .header-main {
      #container-input {
        display: flex;
        flex-direction: column;
        align-items: center;
      }      
    }

    .buttons-container {
      display: flex;
      flex-direction: column;

      button {
        margin: 5px 12px 0;
      }
    }
  }
`;
