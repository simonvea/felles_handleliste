export interface Todo {
  id: number;
  name: string;
  description?: string;
  done: boolean;
  saved: boolean;
  notShow?: true;
}

export interface User {
  username: string;
  loggedIn: boolean;
  loggingIn: boolean;
  loginError?: Error;
}
