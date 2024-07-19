import { ValidateError } from '../../';

export class ValidateException extends Error {
  public type: string = 'invalid';
  public field: string;
  public msg: string;
  constructor(err: ValidateError) {
    super();
    this.message = `${err.field} ${err.message}`;
    this.type = err.code;
    this.field = err.field!;
    this.msg = err.message.replace('should be an ', '');
  }
}
