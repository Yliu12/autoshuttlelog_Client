export class User {
  id: number;
  createTime: number;
  lastUpdateTime: number;
  firstName: string;
  lastName: string;
  password: string;
  userName: string;
  role: string;
  statusCode: string;
  token: string;


  constructor(username?, password?) {
    this.userName = username || null;
    this.password = password || null;
  }
}
