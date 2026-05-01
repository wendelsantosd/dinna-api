export interface AuthUserInput {
  email: string;
  password: string;
}

export interface AuthUserOutput {
  token: string;
}
