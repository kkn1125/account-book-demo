import SquareButton from "@atoms/SquarButton";
import useAccountBook from "@hooks/useAccountBook";
import { AccountBook } from "@models/AccountBook";
import { AccountBookTable } from "@moleculars/AccountBookTable";
import RenameAccountBook from "@moleculars/RenameAccountBook";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BackspaceIcon from "@mui/icons-material/Backspace";
import {
  Box,
  Container,
  Paper,
  Stack,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import { SyntheticEvent, useCallback, useState } from "react";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home: React.FC = () => {
  const { decorate, managerState, update } = useAccountBook();
  const [value, setValue] = useState(0);

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function handleDeleteAccountBook(value: number): void {
    if (value <= 0) return;
    const label = [...managerState.accountBooks.keys()][value];
    decorate((managerState) => {
      managerState.deleteAccountBook(label);
    });
    if (value === managerState.accountBooks.size) {
      setValue((value) => value - 1);
    }
  }

  const accountBookRender = useCallback(() => {
    return managerState
      .orderedBooks()
      .map(([label, accountBook], i) => (
        <AccountBookTable
          key={label}
          label={label}
          accountBook={accountBook}
          currentBookLabel={value}
          index={i}
        />
      ));
  }, [managerState, value]);

  return (
    <Stack flex={1}>
      <Container component={Stack} my={3} gap={1}>
        <Box
          position='relative'
          sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Stack direction='row' gap={1}>
            <Tooltip placement='top' title='Add Account Book'>
              <SquareButton
                area={38}
                variant='contained'
                onClick={() => {
                  decorate((managerState) => {
                    managerState.addAccountBook(
                      managerState.getBookName(),
                      new AccountBook()
                    );
                  });
                }}>
                <AddBoxIcon />
              </SquareButton>
            </Tooltip>
            <RenameAccountBook value={value} />
            <Tooltip placement='top' title='Delete Account Book'>
              <SquareButton
                area={38}
                variant='contained'
                size='small'
                onClick={() => handleDeleteAccountBook(value)}>
                <BackspaceIcon />
              </SquareButton>
            </Tooltip>
          </Stack>
          <Tabs
            value={value}
            onChange={handleChange}
            variant='scrollable'
            scrollButtons='auto'
            aria-label='scrollable auto tabs'>
            {managerState.orderedKeys().map((label, i) => (
              <Tab key={label} label={label} {...a11yProps(i)} />
            ))}
          </Tabs>
        </Box>
        <Stack gap={1} alignItems='stretch'>
          <Paper sx={{ p: 2, flex: 1 }}>{accountBookRender()}</Paper>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Home;
