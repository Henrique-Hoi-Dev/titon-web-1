import styled from 'styled-components';

export const Container = styled.div`
  .header-main {
    display: flex;
    justify-content: center;

    margin: -3rem auto 0rem;
    overflow: hidden; 
  
    .form {
      padding: 35px;

      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 268px 1fr;
      grid-template-areas:
        'info1 info2'
        'info1 info2'
        'button button'
    }
    .info1 {
      grid-area: info1;
      margin-left: 70px;
    }
    .info2 {
      grid-area: info2;
      margin-left: 50px;

      .check {
        display: flex;
        align-items: baseline;

        #status {
          display: none;
        }
      }
    }
    .button {
      grid-area: button;
      display: flex;
      justify-content: center;
      margin-bottom: 14px;
    }

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
     span {
      font: 16px Archivo;
      color: #9c98a6;
      font-weight: bold;
      margin-left: 6px;
     }

     input {
      width: 13rem;
      background: rgba(0, 0, 0, 0.1);
      padding: 0 15px;
      font: 1rem Archivo;
      border-radius: 0.5rem;
      height: 2.2rem;
      padding: 0 1rem;
      margin: 0 0 1rem;
      border: 2px solid #8945de;
      font-weight: bold;
      color: #9c98a6;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }

  .button-close {
    background: #6842c2;
    border: 0;
    color: #000;
    font: 700 20px Archivo;
    cursor: pointer;
    transition: color 0.2s;
    margin-right: 20px;
    border-radius: 4px;
    height: 3rem;
    width: 12rem;

    a {
      color: #000;
      margin-left: 20px;
    }

    &:hover {
      transform: scale(1.1);
      transition: all 0.5s;
    }
  }

  @media screen and (max-width: 700px) {
    .header-main {
      .form {
        display: flex;
        flex-direction: column;
        align-items: center;

        .info1 {
          margin-left: 35px;
        } 
        .info2 {
          margin-left: 0;
        } 
      }
    }

    .button {
      margin-top: 20px;
    }
  }
`;