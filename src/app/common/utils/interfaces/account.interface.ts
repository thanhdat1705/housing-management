export interface AccountRequest {
  username: string;
  password: string;
}

export interface AuthInfo {
  token: string;
}

export interface BaseAccount<T> {
  type: string;
  attributes: T;
}
