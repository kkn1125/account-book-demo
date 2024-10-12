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
                    if (target && target.contentEditable === "true") {
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
                    if (target && target.contentEditable !== "true") {
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
  );
};
