import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  border-radius: 0.8rem;

  margin: -4rem auto 0;
  padding: 3rem;
  display: flex;

  flex-direction: column;
  align-items: center;

  h2 {
    font-weight: bold;
    font-size: 30px;
    color: #9c98a6;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);

    margin-bottom: 29px;
  }

  .table-list {
    width: 100%;
    max-width: 65rem;
    background: #353535;
    border-radius: 0.8rem;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);

    padding: 1.6rem;
    font: 16px Archivo;
    color: #9c98a6;
    font-weight: bold;

    td {
      max-height: 5px;
      border-bottom: 0.2rem solid #8945de;
    } 

    td,
    th {
      padding: 0.5rem;
      text-align: center;
    }
  }
  
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    margin-top: 29px;

    background: #353535;
    border-radius: 0.8rem;
    box-sizing: border-box;

    h3 {
      font-weight: bold;
      font-size: 20px;
      color: #fff;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    }
  }
`;