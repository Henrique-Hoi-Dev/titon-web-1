import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 100px;

  .cards {
    min-width: 300px;
    margin: 12px;
    padding: 15px;

    color:  #8945de;

    border-radius: 8px;

    box-shadow: 0px 4px 4px rgb(0 0 0 / 50%);
    background: #353535;

    display: flex;
    flex-direction: column;
    justify-content: center;

    svg {
      font-size: 2rem;
      margin-bottom: 7px;
    }

    hr {
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
    }
    
    .value {
      display: flex;
      flex-direction: column;
      justify-content: center;

      color:  #9c98a6;

      h2 {
        margin: 10px;
      }
      
      strong {
        margin-left: 14px;
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 16px;
        color: #ffff;
      }
    }
  }
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`