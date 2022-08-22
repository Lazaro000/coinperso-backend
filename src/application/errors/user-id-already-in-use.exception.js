import { ApplicationConflictException } from './application-conflict.exception';

export class UserIdAlreadyInUseException extends ApplicationConflictException {
  constructor() {
    super('El Id de usuario ya está en uso');
  }
}
