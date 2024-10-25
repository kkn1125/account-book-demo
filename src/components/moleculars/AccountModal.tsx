import useAccountBook from "@hooks/useAccountBook";
import useKeyBoardEvent from "@hooks/useKeyBoardEvent";
import { Account, InOut } from "@models/Account";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
  Portal,
  Stack,
  TextField,
} from "@mui/material";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface AccountModalProps {
  label: string;
}

const AccountModal: React.FC<AccountModalProps> = ({ label }) => {
  useKeyBoardEvent({
    escape() {
      handleClose();
    },
  });
  const firstInputRef = useRef<HTMLInputElement>(null);
  const { addAccount } = useAccountBook();
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState<Pick<Account, IncludeProps>>({
    purpose: "",
    cost: 0,
    inOut: InOut.Out,
    memo: "",
  });

  const handleToggleOpen = () => {
    setOpen((open) => !open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const name = target.name;
    const value = target.value;

    if (
      name === "cost" &&
      (Number.isNaN(+value) || value.endsWith(" ") || value.startsWith(" "))
    ) {
      return;
    }

    setAccount((account) => ({
      ...account,
      [name]:
        name === "inOut"
          ? account[name] === InOut.Out
            ? InOut.In
            : InOut.Out
          : value,
    }));
  };

  const initializeAccount = () => {
    setAccount({ purpose: "", cost: 0, inOut: InOut.Out, memo: "" });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    addAccount({ label, account });

    handleClose();
    initializeAccount();
    return false;
  };

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  return (
    <Stack>
      {open && (
        <Portal>
          <Paper
            component='form'
            elevation={5}
            onSubmit={handleSubmit}
            sx={{
              p: 3,
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}>
            <Stack gap={2} alignItems='center'>
              <TextField
                autoFocus
                onFocus={(e) => e.target.setSelectionRange(0, 1)}
                size='small'
                label='비용'
                name='cost'
                value={account["cost"]}
                onChange={handleChangeValue}
              />
              <TextField
                size='small'
                label={
                  account["inOut"] === InOut.In
                    ? "어떻게 벌었나요?"
                    : "어디에 사용했나요?"
                }
                name='purpose'
                value={account["purpose"]}
                onChange={handleChangeValue}
              />
              <TextField
                size='small'
                label='메모'
                name='memo'
                value={account["memo"]}
                onChange={handleChangeValue}
              />
              <FormGroup sx={{ display: "block", whiteSpace: "nowrap" }}>
                <FormControlLabel
                  label={account["inOut"] === InOut.Out ? "💸 지출" : "💲 수입"}
                  control={
                    <Checkbox
                      name='inOut'
                      checked={account["inOut"] === InOut.Out}
                      onChange={handleChangeValue}
                      sx={{ display: "none" }}
                    />
                  }
                  sx={{ userSelect: "none" }}
                />
              </FormGroup>
              <Divider flexItem />
              <Button type='submit'>등록</Button>
              <Button onClick={handleClose}>취소</Button>
            </Stack>
          </Paper>
        </Portal>
      )}
      <Button onClick={handleToggleOpen}>추가</Button>
    </Stack>
  );
};

export default AccountModal;
