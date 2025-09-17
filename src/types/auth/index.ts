export type LoginCredentialsType = {
  email: string;
  password: string;
};

export type RegisterCredentialsType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthResponseType = {
  accessToken: string;
  balance: number;
  currency: string;
  id: string;
  name: string;
};

export type RegisterResponseType = {
  id: string;
  name: string;
};
