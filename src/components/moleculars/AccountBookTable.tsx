import { Account, InOut } from "@models/Account";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import AccountModal from "./AccountModal";
import { AccountBook } from "@models/AccountBook";
import { CustomTabPanel } from "@atoms/CustomTabPanel";
import { CustomTableHead } from "./CustomTableHead";
import CustomTableBody from "./CustomTableBody";

interface AccountBookProps {
  label: string;
  accountBook: AccountBook;
  currentBookLabel: number;
  index: number;
}
export const AccountBookTable: React.FC<AccountBookProps> = ({
  label,
  accountBook,
  currentBookLabel,
  index,
}) => {
  return (
    <CustomTabPanel value={currentBookLabel} index={index}>
      <Table>
        <CustomTableHead
          label={label}
          columns={
            Object.keys(new Account()) as Exclude<keyof Account, "toJSON">[]
          }
        />
        <CustomTableBody
          currentBookLabel={currentBookLabel}
          accountBook={accountBook}
        />
      </Table>
      <Stack>
        <Toolbar />
        <AccountModal label={label} />
      </Stack>
    </CustomTabPanel>
  );
};
