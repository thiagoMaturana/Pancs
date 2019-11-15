export enum AuthProviders {
  Email,
  Facebook
}

export interface User {
  name?: string;
  email: string;
  password: string;
}

export interface AuthOptions {
  isSignIn: boolean;
  provider: AuthProviders;
  user: User;
}