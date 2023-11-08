export enum ResponseMessage {
  TOKEN_NOT_FOUND = "token is not found",
  BAD_TOKEN = "bad token",
  TOKEN_SENT_SUCCESSFULLY = "token sent successfully",

  USER_NOT_FOUND = "user not found",
  DUPLICATE_EMAIL = "an account with the same email already exists",
  DUPLICATE_USERNAME = "an account with the same username already exists",
  INTERNAL_SERVER_ERROR = "internal server error",
  USER_CREATED_SUCCESSFULLY="user sent successfully",
  INVALID_PASSWORD="given password is not correct"
}
