import { Manager } from "@models/Manager";
import { atom } from "recoil";

export const managerAtom = atom({
  key: "manager",
  default: new Manager(),
});
