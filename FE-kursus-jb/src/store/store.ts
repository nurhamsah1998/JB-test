import { atom, useAtom } from "jotai";

const profile = atom<{
  id?: string;
  name?: string;
  email?: string;
  is_admin?: boolean;
}>({
  id: "",
  name: "",
  email: "",
  is_admin: false,
});

export { useAtom, profile };
