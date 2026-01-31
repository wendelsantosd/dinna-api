export interface Input {
  password: string;
  hash: string;
}

export interface IEncryptation {
  hash(data: Omit<Input, 'hash'>): Promise<string>;
  compare(data: Input): Promise<boolean>;
}
