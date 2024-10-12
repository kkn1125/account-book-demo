import SquareButton from "@atoms/SquarButton";
import useAccountBook from "@hooks/useAccountBook";
import useKeyBoardEvent from "@hooks/useKeyBoardEvent";
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
import React, { ChangeEvent, useRef, useState } from "react";

interface RenameAccountBookProps {
  value: number;
}
const RenameAccountBook: React.FC<RenameAccountBookProps> = ({ value }) => {
  useKeyBoardEvent({
    escape: handleCloseRename,
  });
  const { decorate, managerState } = useAccountBook();
  const [openRename, setOpenRename] = useState(false);
  const [originName, setOriginName] = useState("");
  const [rename, setRename] = useState("");
  const handleOpenRename = () => {
    const label = [...managerState.accountBooks.keys()][value];

    setOpenRename((openRename) => !openRename);

    setOriginName(label);
    setRename(label);
  };

  function handleCloseRename() {
    setOriginName("");
    setRename("");
    setOpenRename(false);
  }

  const handleChangeRename = (e: ChangeEvent<HTMLInputElement>) => {
    setRename(e.target.value);
  };

  const handleRename = () => {
    if (rename !== "") {
      decorate((managerState) => {
        managerState.rename(originName, rename);
      });
      handleCloseRename();
    }
  };

  return (
    <Stack>
      {openRename && (
        <Portal>
          <Paper
            component='form'
            onSubmit={handleRename}
            sx={{
              position: "fixed",
              p: 3,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}>
            <Stack gap={1}>
              <Typography>Account Book Rename</Typography>
              <TextField
                onFocus={(e) => {
                  e.currentTarget.select();
                }}
                size='small'
                value={rename}
                autoFocus
                onChange={handleChangeRename}
              />
              <Button variant='contained' type='submit'>
                Rename
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={handleCloseRename}>
                Close
              </Button>
            </Stack>
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
