export class User {
  userName: string;
  email: string;
  fullName: string;
  introduction: string;

  constructor(uname: string, em: string, fName: string, intro: string) {
    this.userName = uname;
    this.email = em;
    this.fullName = fName;
    this.introduction = intro;
  }
}
