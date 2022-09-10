import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100vw;

  .header-main {
    background: #353535;
    max-width: 63rem;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    border-radius: 0.8rem;
    margin: -8rem auto 3.2rem;
    padding-top: 1rem;
    overflow: hidden;

    .page {
      margin-left: 40px;
      color: #fff;

      p {
        font-size: 1.3rem;
      }
    }

    .more {
      display: flex;
      justify-content: flex-end;
      margin-right: 20px;
      color: #8945de;

      svg {
        &:hover {
          color: ${darken(0.03, '#6842c2')};
          transform: scale(1.1);
          transition: all 0.5s;
        }
      }
    }

    .form-table {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 50px;
    }

    .pagination {
      display: flex;
      justify-content: center;

      margin-bottom: 30px;
      margin-top: -50px;

      button {
        color: #fff;
        font-size: 17px;
      }
    }
  }

  @media screen and (max-width: 600px) {}
`;
