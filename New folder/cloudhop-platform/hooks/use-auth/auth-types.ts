export type CreateUserOptions = {
  email: string;
  password: string;
  name: string;
};

export type LoginUserOptions = {
  email: string;
  password: string;
};

export type UpdateUserOptions = {
  name?: string;
  password?: string;
  avatar?: string;
};