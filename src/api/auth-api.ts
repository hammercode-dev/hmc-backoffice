import { User } from "../modules/auth/auth.entity";
import http from "./axios";

export type LoginResponse = {
  data: string,
  user: User,
}

export type ProfileResponse = User;

export const authApi = {
  login(email: string, password: string): Promise<LoginResponse> {
    return http.post('/auth/login', {
      email,
      password,
    })
      .then(res => res.data)
      .catch(err => {
        throw new Error(err.response.data.message)
      })
  },
  getUser(): Promise<ProfileResponse> {
    return http.get('/user').then(res => res.data.data)
  }
};
