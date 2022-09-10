import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin: 30px 0 24px 0;
    color: #9c98a6;
  }

  .buttons {
    display: flex;

    button {
      margin: 24px 28px 0;
      height: 3rem;
      width: 12rem;
      background: #8945de;
      font-weight: bold;
      margin-bottom: 1rem;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: ${darken(0.03, '#8945de')};
        transform: scale(1.1);
        transition: all 0.5s;
      }
    }
  }

  svg {
    font-size: 30px;
    margin-left: 8px;
  }

  @media screen and (max-width: 700px) {
    .buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
