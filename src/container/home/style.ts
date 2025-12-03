import styled from "@emotion/styled";

export const Contaienr = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("/BG.gif");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
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

export const SubTitle = styled.button`
  display: flex;
  font-size: 1.25rem;
  font-weight: 700;
  text-shadow: 0 0 10px #008D04, 0 0 20px #008D04;
  color: #9EB09E;
  background-color: transparent;
  border: none;
  margin-top: 6rem;
  cursor: pointer;

  @keyframes blink {
    0%, 0%, 100% {
      opacity: 1;
    }
    25%, 75% {
      opacity: 0.85;
    }
  }

  animation: blink 1s infinite;
`;
