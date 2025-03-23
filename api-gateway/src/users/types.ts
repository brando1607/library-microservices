type Role = 'AUTHOR' | 'USER';

export type User = {
  id: string;
  name: string;
  lastname: string;
  email: string;
  username: string;
  role: Role;
};

export type NewUser = Omit<User, 'id'>;

export type PartialUser = Partial<User>;
