export enum ResponseMessage {
  TOKEN_NOT_FOUND = 'token is not found',
  BAD_TOKEN = 'bad token',
  SUCCESSFUL_LOGIN = 'logged in successfully',

  USER_NOT_FOUND = 'user is not found',
  DUPLICATE_EMAIL = 'an account with the same email already exists',
  DUPLICATE_USERNAME = 'an account with the same username already exists',
  USER_CREATED_SUCCESSFULLY = 'user created successfully',
  INVALID_PASSWORD = 'given password is not correct',

  INTERNAL_SERVER_ERROR = 'internal server error'
}
