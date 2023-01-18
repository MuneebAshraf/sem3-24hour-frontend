import { FormEvent } from "react";

type PerformLoginAction = (
  evt: FormEvent<HTMLFormElement>,
  loginCredentials: { username: string; password: string; },
  setAlert: React.Dispatch<React.SetStateAction<string>>
) => Promise<void>;

export default PerformLoginAction;
