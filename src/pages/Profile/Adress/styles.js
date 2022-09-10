import styled from 'styled-components';

export const Container = styled.div`
  margin: 50px auto;
  width: 500px;

  h2 {
    padding: 0.5rem;
    font-weight: bold;
    margin-top: 60px;

    color: #9c98a6;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  }

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 10px;

    input {
      background: rgba(0, 0, 0, 0.1);
      padding: 0 15px;
      width: 500px;
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

    select {
      font: 1rem Archivo;
      border-radius: 0.5rem;
      width: 500px;
      height: 2.2rem;
      padding: 0 1rem;
      margin: 0 0 1rem;
      border: 2px solid #8945de;
      font-weight: bold;
      color: #9c98a6;
      background: rgba(0, 0, 0, 0.1);

      ::-webkit-scrollbar {
        width: 1px;
        height: 10px;
      }
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }

    .but {
      display: flex;
      justify-content: space-between;

      .adresses {
        margin: 4px 19px 0 19px;
        width: 200px;
        color: #fff;
        margin-left: 5px;
        height: 44px;
        background: #8945de;
        font-weight: bold;
        margin-bottom: 1rem;
        border-radius: 4px;
        font-size: 16px;
        transition: background 0.2s;

        a {
          color: #fff;
          margin-top: 15px;
          text-decoration: none;
          font-weight: bold;
          font-size: 16px;
          opacity: 0.8;
        }

          &:hover {
            transform: scale(1.1);
            transition: all 0.5s;
          }
        }
      }
    }

  @media screen and (max-width: 600px) {
    form {
      input {
        width: 300px;
      }
      select {
        width: 300px;
      }

      .but {
        display: flex;
        flex-direction: column;
      }
    }
    width: 300px;
  }
`;
