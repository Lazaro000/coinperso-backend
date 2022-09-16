import { ApplicationUnauthorizedException } from '../../application/errors/application-unauthorized.exception.js';
import { ApplicationConflictException } from '../../application/errors/application-conflict.exception.js';
import { DomainFormatException } from '../../domain/errors/domain-format.exception.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { InfrastructureFormatException } from '../errors/infrastructure-format.exception.js';

export const errorMiddleware = (error, _, res, __) => {
  // console.error('\n---- ERROR MIDDLEWARE ----');
  // console.error('\x1b[0;31m' + error.message + '\n');

  if (
    error instanceof DomainFormatException ||
    error instanceof InfrastructureFormatException
  )
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .send({ errorMessage: error.message });

  if (
    error instanceof ApplicationUnauthorizedException ||
    error instanceof InfrastructureFormatException
  )
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .send({ errorMessage: error.message });

  if (error instanceof ApplicationConflictException)
    return res
      .status(HTTP_STATUS.CONFLICT)
      .send({ errorMessage: error.message });

  return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .send({ errorMessage: 'Internal server error', error });
};
