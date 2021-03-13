/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'preact';

const UserNameOperator =
  createContext({ name: '', setName: (value: string) => { return } });
const RememberUserOperator =
  createContext({ remember: false, setRemember: (value: boolean) => { return } });
const WsHostOperator =
  createContext({ hostName: '', setHostName: (value: string) => { return } });

const USER_NAME_KEY = 'screenName';
const USER_ID_KEY = 'userId';

export {
  UserNameOperator, RememberUserOperator, WsHostOperator, USER_ID_KEY, USER_NAME_KEY
};
