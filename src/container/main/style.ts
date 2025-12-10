import styled from "@emotion/styled";

export const Contaienr = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("/BG.gif");
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  position: relative;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

export const TextGroup = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
  font-size: 4rem;
  text-shadow: 0 0 10px #008D04, 0 0 20px #008D04;
  color: #fafafa;
`;

export const SubTitle = styled.input`
  display: flex;
  font-size: 1.5rem;
  text-align: center;
  width: 60rem;
  text-shadow: 0 0 10px #008D04, 0 0 40px #008D04;
  box-shadow: 0 0 10px #008D04, 0 0 20px #008D04;
  color: #9EB09E;
  background-color: transparent;
  border: 1px solid #008D04;
  padding: 1.5rem;
  border-radius: 4px;
  margin-top: 6rem;
  cursor: pointer;

  &::placeholder {
    color: #9EB09E;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 20px #00FF04, 0 0 30px #00FF04;
    border: 1px solid #00FF04;
  }
`;