import ExtendableError from 'es6-error';

class ApiError extends ExtendableError {
  constructor(message = 'unknown api error', statusCode = 422) {
    super(message);
    this._statusCode = statusCode;
  }

  get statusCode() {
    return this._statusCode;
  }

  set statusCode(value) {
    this._statusCode = value;
  }
}

export default ApiError;
