import { ERRORS } from '../constants/index';

export class InternalError extends Error {
  constructor(message: string = ERRORS.ERROR) {
    super(message);
  }
}

export class NotFoundError extends Error {
  constructor(item: string, id: string) {
    super(`${item} with id:${id} not found`);
  }
}

export class IncorrectPasswordError extends Error {
  constructor() {
    super(ERRORS.OLD_PASSWORD_INCORRECT);
  }
}
