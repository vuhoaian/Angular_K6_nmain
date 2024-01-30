export type User = {
  _id: string;
  fullname: string;
  email: string;
  password: string;
};

export type UserResponse = {
  total: number;
  page: number;
  limit: number;
  data: User[];
};
