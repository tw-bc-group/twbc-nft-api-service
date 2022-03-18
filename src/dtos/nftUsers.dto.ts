export class NftUserDto {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  public username: string;
  public password: string;
}
