/**
 * Generic application unauthorized exception
 */
export class ApplicationUnauthorizedException extends Error {
  constructor() {
    super('You do not have permission to access this resource');
  }
}
