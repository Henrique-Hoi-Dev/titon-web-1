import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  font-size: 0.8rem;

  .header-main {
    #container-input {
      display: grid;
      grid-template-columns: 1fr 238px;
      grid-template-rows: 0px 180px 300px;
      grid-template-areas:
        'name name name'
        'campo2  campo4 campo3'
        'button button camp5';
    }

    .name-campo {
      grid-area: name;
    }

    .campo2 {
      grid-area: campo2;
    }
    .campo3 {
      grid-area: campo3;

      ul {
        display: flex;
        flex-direction: column;
      }
    }
    .campo4 {
      grid-area: campo4;
    }
    .camp5 {
      grid-area: camp5;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .buttons-container {
      grid-area: button;
    }

    input {
      font: 1rem Archivo;
      cursor: pointer;
      border-radius: 0.5rem;
      height: 2.7rem;
      width: 215px;
      padding: 0 1rem;
      margin: 12px 0px 10px;
      border: 2px solid #8945de;
      font-weight: bold;
      color: #9c98a6;
      background: rgba(0, 0, 0, 0.1);
    }

    select {
      font: 1rem Archivo;
      cursor: pointer;
      border-radius: 0.5rem;
      width: 13.5rem;
      height: 2.7rem;
      padding: 0 1rem;
      margin: 7px 0px 10px;
      border: 2px solid #8945de;
      font-weight: bold;
      color: #9c98a6;
      background: rgba(0, 0, 0, 0.1);
    }

    .form-input {
      padding: 0 2.4rem;
      margin-left: 1rem;

      svg {
        background-color: #8945de;
        margin: 15px 0px 13px -29px;

        &:hover {
          transform: scale(1.1);
          transition: all 0.5s;
        }
      }
    }
  }
  .footer {
    margin-top: 5rem;
  }

  button {
    margin: 5px -8px 0;
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
    border-radius: 11px;
    margin: 30px;

    label {
      font: 700 1.4rem Archivo;
      color: #9c98a6;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    span {
      color: #ff0000;
      margin: 0 0 0 28px;
      font-weight: bold;
    }

    p {
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      line-height: 2.4rem;
      color: #9c98a6;
    }

    main {
      margin: 3.2rem auto;
      width: 90%;
    }

    footer {
      padding: 1.4rem;
      display: flex;
      flex-direction: column;

      svg {
        margin-right: 1rem !important;
        /* background-color: #4d4c4c !important; */
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

      footer {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      p { 
        margin: 0 0 31px 13px;
      }

      .campo4 {
        margin-right: 20px;
      }

      .campo3 ul {
        margin-right: 30px;
      }

      .form-input svg {
        margin: 15px 0px 13px 0px;
      }
    }
  }
`;
