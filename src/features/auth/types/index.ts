export type LoginCredentials = {
  username: string;
  password: string;
};

export type User = {
  name: string;
  role: string;
};

export type LoginResponse = {
  success: boolean;
};

export type LogoutResponse = {
  success: boolean;
};
