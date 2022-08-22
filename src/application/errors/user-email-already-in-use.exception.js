import { ApplicationConflictException } from './application-conflict.exception';

export class UserEmailAlreadyInUseException extends ApplicationConflictException {
  constructor() {
    super('User Email is already in use');
  }
}
