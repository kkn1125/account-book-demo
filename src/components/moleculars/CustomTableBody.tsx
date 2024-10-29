import useAccountBook from "@hooks/useAccountBook";
import { InOut } from "@models/Account";
import { AccountBook } from "@models/AccountBook";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, TableBody, TableCell, TableRow } from "@mui/material";

interface CustomTableBodyProps {
  currentBookLabel: number;
  accountBook: AccountBook;
}

const translate: Record<InOut, string> = {
  in: "입금",
  out: "지출",
};

const CustomTableBody: React.FC<CustomTableBodyProps> = ({
  currentBookLabel,
  accountBook,
}) => {
  const { decorate } = useAccountBook();

  function handleDelete(id: string) {
    decorate((manager) => {
      const book = [...manager.accountBooks.values()][currentBookLabel];
      book?.deleteAccount(id);
    });
  }

  return (
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
                    account["inOut"] = value === "out" ? InOut.Out : InOut.In;
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
              {key === "id"
                ? i + 1
                : key === "inOut"
                ? translate[value]
                : value}
            </TableCell>
          ))}

          <TableCell>
            <IconButton color='error' onClick={() => handleDelete(account.id)}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CustomTableBody;
