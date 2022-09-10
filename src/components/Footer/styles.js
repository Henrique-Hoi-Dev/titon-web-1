import styled from 'styled-components';

export const Container = styled.div`
width: 100%;
height: 8rem;

background: #353535;

display: flex;

flex-direction: column;
justify-content: space-between;

  .info {
    display: flex;
    justify-content: space-around;
    margin: 13px;
    color: #9c98a6;

    .contato, .site {
      h4 {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin: 7px;
      }
      svg {
        font-size: 25px;
        margin-left: 10px;
      }
    }
  }

  footer {
    display: flex;

    justify-content: center;
    align-items: center;
    
    color: #8090a6;
    height: 30px;
    background: #222222;
  }
`