import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: -30px;

  svg {
    font-size: 100px;
    background-color: transparent!important;
    margin: 20px 0px 13px -29px!important;

    &:hover {
      transform: scale(1.1);
      transition: all 0.5s;
    }
  }

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    h4 {
      margin-left: 10px;
    }

    img {
      height: 100px;
      width: 150px;
      border-radius: 10%;
      border: 2px solid #8945de;
      background: #fff;
    }

    input {
      display: none;
    }
  }

  @media (max-width: 700px) {
    label {
      display: flex;
      flex-direction: column;
      align-items: center;      

      h4 {
        margin-top: 10px;
      }
    }
  }
`;
