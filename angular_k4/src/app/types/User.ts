export type User = {
  _id: string;
  fullname: string;
  email: string;
  password: string;
};
export type responseDataLogin = {
  token: string;
  user: {
      email: string;
      username: string;
      role: "admin" | "member";
  }
}
export type UserResponse = {
  total: number;
  page: number;
  limit: number;
  data: User[];
};
