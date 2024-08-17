import { Box } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import styled, { keyframes } from "styled-components";

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Spinner = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Note = styled(MusicNoteIcon)`
  font-size: 40px;
  color: #3f51b5;
  animation: ${float} 2s ease-in-out infinite;
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
  &:nth-child(4) {
    animation-delay: 0.6s;
  }
  &:nth-child(5) {
    animation-delay: 0.8s;
  }
`;

const Loader = () => {
  return (
    <Spinner>
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
    </Spinner>
  );
};

export default Loader;
