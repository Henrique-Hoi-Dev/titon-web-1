import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100vw;

  .header-main {
    background: #353535;
    max-width: 70rem;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    border-radius: 0.8rem;
    margin: -3rem auto 3.2rem;
    padding-top: 3rem;
    overflow: hidden;

    .more {
      display: flex;
      justify-content: flex-end;
      margin: -30px 30px 20px;
      color: #8945de;

      svg {
        &:hover {
          color: ${darken(0.03, '#6842c2')};
          transform: scale(1.1);
          transition: all 0.5s;
        }
      }
    }
  }

  .form-table {
    padding: 0 2.4rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    table {
      background-color: #4d4c4c;
      border: 0.2rem solid #8945de;

      width: 850px;
      border-radius: 0.8rem;
      box-sizing: border-box;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      margin-bottom: 2.4rem;

      font: 1.1rem Archivo;
      color: #9c98a6;
      font-weight: bold;

      th {
        font-size: 21px;
        padding: 7px;
        border-bottom: 0.2rem solid #8945de;
      }

      td {
        color: #fff;
        text-align: center;
        font-weight: 300;
      }
      
      .edit {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 20px;
      }
    }

    svg {
      font-size: 28px;
      cursor: pointer;
    }

    .error {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px;
      margin-bottom: 60px;

      background: #353535;
      border-radius: 0.8rem;
      box-sizing: border-box;

      h3 {
        font-weight: bold;
        font-size: 30px;
        color: #fff;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
      }
    }
  }

  .table-list {
    width: 100%;
    border-radius: 0.8rem;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 2.5rem;

    padding: 1.6rem;
    font: 1.1rem Archivo;
    color: #9c98a6;
    font-weight: bold;

    td,
    th {
      padding: 0.5rem;
      text-align: center;
    }
  }

  @media screen and (max-width: 600px) {
  }
`;
