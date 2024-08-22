import { Box } from "@mui/material";
import styled, { keyframes } from "styled-components";

// Keyframes for pulsing animation
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
`;

// Keyframes for rotating circles
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled-components
const SpinnerContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
`;

const SpinnerWrapper = styled(Box)`
  position: relative;
  width: 100px;
  height: 100px;
  animation: ${rotate} 2s linear infinite;
`;

const Circle = styled(Box)`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: ${(props: any) => props.color};
  border-radius: 50%;
  animation: ${pulse} 1s ease-in-out infinite;
  &:nth-child(1) {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    animation-delay: 0s;
  }
  &:nth-child(2) {
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    animation-delay: 0.4s;
  }
  &:nth-child(4) {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    animation-delay: 0.6s;
  }
`;

const Loader = () => {
  return (
    <SpinnerContainer>
      <SpinnerWrapper>
        <Circle color="#ff6f61" />
        <Circle color="#f9a825" />
        <Circle color="#00e676" />
        <Circle color="#2979ff" />
      </SpinnerWrapper>
    </SpinnerContainer>
  );
};

export default Loader;
