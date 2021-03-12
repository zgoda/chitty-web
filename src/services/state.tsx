/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'preact';

const UserNameOperator =
  createContext({ name: '', setName: (value: string) => { return } });
const RememberUserOperator =
  createContext({ remember: false, setRemember: (value: boolean) => { return } });
const WsHostOperator =
  createContext({ hostName: '', setHostName: (value: string) => { return } });

export { UserNameOperator, RememberUserOperator, WsHostOperator };
