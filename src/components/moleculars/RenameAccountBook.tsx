import SquareButton from "@atoms/SquarButton";
import useAccountBook from "@hooks/useAccountBook";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {
  Button,
  Paper,
  Portal,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";

interface RenameAccountBookProps {
  value: number;
}
const RenameAccountBook: React.FC<RenameAccountBookProps> = ({ value }) => {
  const { managerState, update } = useAccountBook();
  const [openRename, setOpenRename] = useState(false);
  const [originName, setOriginName] = useState("");
  const [rename, setRename] = useState("");
  const handleOpenRename = () => {
    const label = [...managerState.accountBooks.keys()][value];

    setOpenRename((openRename) => !openRename);

    setOriginName(label);
    setRename(label);
  };
  const handleCloseRename = () => {
    setOriginName("");
    setRename("");
    setOpenRename(false);
  };

  const handleChangeRename = (e: ChangeEvent<HTMLInputElement>) => {
    setRename(e.target.value);
  };

  const handleRename = () => {
    if (rename !== "") {
      managerState.rename(originName, rename);
      handleCloseRename();
      update();
    }
  };

  return (
    <Stack>
      {openRename && (
        <Portal>
          <Paper
            component={Stack}
            gap={1}
            sx={{
              position: "fixed",
              p: 3,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}>
            <Typography>Account Book Rename</Typography>
            <TextField
              size='small'
              value={rename}
              onChange={handleChangeRename}
            />
            <Button variant='contained' onClick={handleRename}>
              Rename
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={handleCloseRename}>
              Close
            </Button>
          </Paper>
        </Portal>
      )}
      <Tooltip placement='top' title='Rename Account Book'>
        <SquareButton area={38} variant='contained' onClick={handleOpenRename}>
          <DriveFileRenameOutlineIcon />
        </SquareButton>
      </Tooltip>
    </Stack>
  );
};

export default RenameAccountBook;
