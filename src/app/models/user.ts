export class User {
  userName: string;
  email: string;
  fullName: string;

  constructor(uname: string, em: string, fName: string) {
    this.userName = uname;
    this.email = em;
    this.fullName = fName;
  }
}
