import { Request } from "express";

export interface User {
  id?: string;
  username: string;
  email: string;
  password?: string;
}

export interface DecodedUser {
  id: string;
  email: string;
}
export interface SignUpRequestBody {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface UserRequest extends Request {
  auth: {
    userId: string
  };
}

export interface UserUpdateRequestBody {
  username?: string;
  email?: string;
  password?: string;
}
