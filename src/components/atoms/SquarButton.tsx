import { Button, styled } from "@mui/material";

const SquareButton = styled(Button)<{ area: number }>(({ area }) => ({
  border: 0,
  minWidth: 0,
  width: area,
  height: area,
}));

export default SquareButton;
