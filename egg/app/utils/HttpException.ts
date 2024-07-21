import { StatusCodes } from 'http-status-codes';

export class HttpException extends Error {
  public statusCode:StatusCodes;
  public message: string;

  constructor(
    message: string,
    code: StatusCodes,
  ) {
    super(message);
    this.statusCode = code;
    this.message = message;
  }
}
