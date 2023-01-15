import styled from "styled-components";
import login from "../../assets/background-login.png";

export const Wrapper = styled.div`
  height: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding: 0 40px;

  background-image: url(${login});

  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: center;
  background-size: 100% 100%;

  img {
    width: 385px;
    height: 54px;
  }
`;
