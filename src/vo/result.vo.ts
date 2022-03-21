export class Result {
  constructor(code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  code: number;
  message: string;
  data: {};
}
