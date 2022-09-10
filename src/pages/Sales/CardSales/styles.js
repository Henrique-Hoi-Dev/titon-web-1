import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;

  .cards {
    margin: 12px;
    padding: 7px;

    border-radius: 8px;

    box-shadow: 0px 4px 4px rgb(0 0 0 / 50%);
    background: #353535;

    display: grid;
    grid-template-columns: 110px;
    grid-template-rows: 170px 70px 70px 70px;
    justify-content: center;
    grid-template-areas:
      'avatar avatar '
      'area-1  area-2'
      'area-3 area-4'
      'area-6 area-7'
      'area-5 area-5';

    .area-1 {
      grid-area: area-1;
      text-align: center;
    }
    .area-2 {
      grid-area: area-2;
      text-align: center;
    }
    .area-3 {
      grid-area: area-3;
      text-align: center;
    }
    .area-4 {
      grid-area: area-4;
      text-align: center;
    }
    .area-5 {
      grid-area: area-5;
      text-align: center;
      display: flex;
      justify-content: center;

      svg {
        margin: 9px 19px 9px 19px;
      }
    }
    .area-6 {
      grid-area: area-6;
      text-align: center;
    }
    .area-7 {
      grid-area: area-7;
      text-align: center;
    }

    svg {
      font-size: 2rem;
      margin-bottom: 7px;
    }

    hr {
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
    }

    .avatar {
      grid-area: avatar;
      display: flex;
      justify-content: center;

      img {
        border-radius: 3%; 
        width: 210px;
        height: 170px;

        margin-bottom: 10px;
      }  
    }
    
    .area-1, .area-2, .area-3, .area-4, .area-6, .area-7 {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      color:  #8945de;

      hr {
        height: 1px;
        background: rgba(255, 255, 255, 0.2);
      }
      
      strong {
        margin-bottom: 6px;
        font-weight: bold;
        font-size: 16px;
        color: #ffff;
      }
    }
  }
`