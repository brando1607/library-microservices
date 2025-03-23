type Role = 'AUTHOR' | 'USER';

export type User = {
  name: string;
  lastname: string;
  email: string;
  username: string;
  role: Role;
};
