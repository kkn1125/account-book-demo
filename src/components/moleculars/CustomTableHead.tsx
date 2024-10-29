import { Account } from "@models/Account";
import { TableHead, TableRow, TableCell } from "@mui/material";

interface CustomTableHeadProps {
  label: string;
  columns: Exclude<keyof Account, "toJSON">[];
}

const translate: Record<Exclude<keyof Account, "toJSON">, string> = {
  id: "id",
  purpose: "목적",
  cost: "금액",
  inOut: "입출",
  memo: "메모",
};

export const CustomTableHead: React.FC<CustomTableHeadProps> = ({
  label,
  columns,
}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          align='center'
          colSpan={columns.length + 2}
          sx={{
            fontSize: 18,
            fontWeight: 700,
            textTransform: "uppercase",
          }}>
          {label}
        </TableCell>
      </TableRow>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column}>{translate[column]}</TableCell>
        ))}
        <TableCell>삭제</TableCell>
      </TableRow>
    </TableHead>
  );
};
