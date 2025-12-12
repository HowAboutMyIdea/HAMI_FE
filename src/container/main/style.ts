import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("/BG.gif");
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  position: relative;

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
    gap: 3rem;
`;

export const Title = styled.div`
  display: flex;
  font-size: 3rem;
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
  cursor: pointer;
  transition: box-shadow 0.3s ease, border 0.3s ease;

  &::placeholder {
    color: #9EB09E;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 20px #00FF04, 0 0 30px #00FF04;
    border: 1px solid #00FF04;
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  background-color: #fafafa;

  &:hover {
    background-color: #d5d5d5ff;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;
