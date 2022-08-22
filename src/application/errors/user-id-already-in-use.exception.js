import { ApplicationConflictException } from './application-conflict.exception';

export class UserIdAlreadyInUseException extends ApplicationConflictException {
  constructor() {
    super('User Id is already in use');
  }
}
