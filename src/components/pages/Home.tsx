import SquareButton from "@atoms/SquarButton";
import useAccountBook from "@hooks/useAccountBook";
import { Account, InOut } from "@models/Account";
import { AccountBook } from "@models/AccountBook";
import AccountModal from "@moleculars/AccountModal";
import RenameAccountBook from "@moleculars/RenameAccountBook";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BackspaceIcon from "@mui/icons-material/Backspace";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Portal,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChangeEvent, SyntheticEvent, useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Home: React.FC = () => {
  const { managerState, update } = useAccountBook();
  const [value, setValue] = useState(0);

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
                  managerState.addAccountBook(
                    managerState.getBookName(),
                    new AccountBook()
                  );
                  update();
                }}>
                <AddBoxIcon />
              </SquareButton>
            </Tooltip>
            <RenameAccountBook value={value} />
            <Tooltip placement='top' title='Delete Account Book'>
              <SquareButton area={38} variant='contained' size='small'>
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
            {[...managerState.accountBooks.keys()].map((label, i) => (
              <Tab key={label} label={label} {...a11yProps(i)} />
            ))}
          </Tabs>
        </Box>
        <Stack gap={1} alignItems='stretch'>
          <Paper sx={{ p: 2, flex: 1 }}>
            {[...managerState.accountBooks.entries()].map(
              ([label, accountBook], i) => (
                <CustomTabPanel key={label} value={value} index={i}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align='center'
                          colSpan={Object.keys(new Account()).length}
                          sx={{
                            fontSize: 18,
                            fontWeight: 700,
                            textTransform: "uppercase",
                          }}>
                          {label}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        {Object.keys(new Account()).map((prop) => (
                          <TableCell key={prop}>{prop}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {accountBook.accounts.map((account, i) => (
                        <TableRow key={account.id}>
                          {Object.entries(account).map(([key, value]) => (
                            <TableCell
                              key={key}
                              onBlur={(e) => {
                                const target = e.currentTarget;
                                if (
                                  target &&
                                  target.contentEditable === "true"
                                ) {
                                  target.contentEditable = "false";
                                }
                                const value = target.innerText;
                                switch (key) {
                                  case "purpose":
                                    account["purpose"] = value;
                                    break;
                                  case "inOut":
                                    account["inOut"] =
                                      value === "out" ? InOut.Out : InOut.In;
                                    break;
                                  case "memo":
                                    account["memo"] = value;
                                    break;
                                  case "cost":
                                    account["cost"] = +value;
                                    break;
                                }
                              }}
                              onDoubleClick={(e) => {
                                const target = e.currentTarget;
                                if (
                                  target &&
                                  target.contentEditable !== "true"
                                ) {
                                  target.contentEditable = "true";
                                }
                              }}>
                              {key === "id" ? i + 1 : value}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Stack>
                    <Toolbar />
                    <AccountModal label={label} />
                  </Stack>
                </CustomTabPanel>
              )
            )}
          </Paper>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Home;
