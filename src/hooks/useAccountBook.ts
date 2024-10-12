import { Account } from "@models/Account";
import { Manager } from "@models/Manager";
import { managerAtom } from "@src/recoil/ManagerAtom";
import { useCallback } from "react";
import { useRecoilState } from "recoil";

const useAccountBook = () => {
  const [managerState, setManagerState] = useRecoilState(managerAtom);

  const update = useCallback(
    (manager?: Manager) => {
      if (manager) {
        setManagerState(manager);
      } else {
        setManagerState((managerState) => new Manager(managerState));
      }
    },
    [setManagerState]
  );

  const decorate = useCallback(
    (callback: (managerState: Manager) => void) => {
      callback(managerState);
      update();
      managerState.save();
    },
    [managerState, update]
  );

  const load = useCallback(() => {
    return managerState.load();
  }, [managerState]);

  const addAccount = useCallback(
    ({
      label,
      account,
    }: {
      label: string;
      account: Pick<Account, IncludeProps>;
    }) => {
      const book = managerState.getBook(label);
      if (!book) {
        throw new TypeError("not found account book", { cause: label });
      }

      book.addAccount(account);
      update();
      managerState.save();
    },
    [managerState, update]
  );

  return { managerState, decorate, load, update, addAccount };
};

export default useAccountBook;
