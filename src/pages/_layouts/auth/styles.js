import styled from 'styled-components';
import login from '../../../assets/login.jpg'

export const Wrapper = styled.div`
  height: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-image: url(${login});

  background-size: contain;
  background-repeat: no-repeat;

  @media (max-width: 980px) {
    background: none;
    width: 100%;
  }
`;

export const Content = styled.div`
  width: 55%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 2rem;
  text-align: center;
  background: #333;

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 2rem;
  }

  h2 {
    color: #fff;
    margin: 0 0 1rem;
  }

  input {
    width: 60%;
    background: #f8f8fc;
    border: 1px solid #e6e6f0;
    font: 1rem Archivo;

    border-radius: 0.1rem;
    height: 2.2rem;
    padding: 0 1rem;
    margin: 0 0 1rem;
  }

  span {
    color: #ff0000;
    margin: 0 0 1rem;
  }

  button {
    width: 60%;
    height: 44px;
    margin: 5px 0 0;
    background: #8945de;
    font-weight: bold;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.3s;

    &:hover {      
      transform: scale(1.1);
      transition: all 0.5s;
    }
  }

  a {
    color: #fff;
    margin-top: 15px;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    opacity: 0.8;

    &:hover {
      opacity: 2;
      transform: scale(1.1);
      transition: all 0.5s;
    }
  }

  @media (min-width: 1000px) {
    form {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
    }

    input {
      width: 60%;
      background: #f8f8fc;
      border: 1px solid #e6e6f0;
      font: 1rem Archivo;

      border-radius: 0.6rem;
      height: 2.5rem;
      padding: 0 1.5rem;
      margin: 0 0 1rem;
    }

    span {
      color: #ff0000;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      font-weight: bold;
      border: 0;
      border-radius: 4px;
      font-size: 16px;

      &:hover {
        transform: scale(1.1);
        transition: all 0.5s;
      }
    }

    a {
      color: #ffffff;
      margin-top: 15px;
      text-decoration: none;
      font-weight: bold;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }

  @media (max-width: 980px) {
    width: 100%;

    input {
      width: 40%;
    }

    button {
      width: 40%;
    }
  }

  @media (max-width: 560px) {
    width: 100%;

    input {
      width: 90%;
    }

    button {
      width: 90%;
    }
  }
`;
