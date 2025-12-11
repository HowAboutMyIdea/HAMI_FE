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

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    flex-direction: column;
`;

export const TextGroup = styled.div`
    display: flex;
    width: 60%;
    justify-content: flex-start;
    flex-direction: column;
    gap: 1rem;
`;

export const Title = styled.div`
  display: flex;
  font-size: 4rem;
  text-shadow: 0 0 10px #008D04, 0 0 20px #008D04;
  color: #fafafa;
`;

export const SubTitle = styled.div`
  font-size: 1.5rem;
  color: #fafafa;
  line-height: 1.5;
  text-shadow: 0 0 10px #008D04, 0 0 20px #008D04;
`;

export const Value = styled.div`
  font-size: 1.3rem;
  color: #fafafa;
  line-height: 1.5;
  text-shadow: 0 0 10px #008D04, 0 0 20px #008D04;
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