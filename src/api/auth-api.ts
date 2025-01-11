import { User } from "../modules/auth/auth.entity";
import http from "./axios";

export type LoginResponse = {
  data: string,
  user: User,
}

export type ProfileResponse = User;
const user: User = {
  id: 'e3re-2joi-98r1',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  role: 'admin'
}

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
  // login(email: string, password: string): Promise<LoginResponse> {
  //   return Promise.resolve({
  //     accessToken: 'dummy-token',
  //     user,
  //     email,
  //     password,
  //   })
  // },
  getUser(): Promise<ProfileResponse> {
    return Promise.resolve(user)
  },
};
