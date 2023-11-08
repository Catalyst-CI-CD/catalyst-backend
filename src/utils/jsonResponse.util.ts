import { Response } from "express";

export interface PayloadSuccess {
  token?: string; // - The token for the response.
  count?: number; // - The count for the response.
  data?: any; // - The data for the response.
}

export interface PayloadFailedDev {
  status: string; // - The status of the failed request.
  error: string; // - The error description or code.
  message: string; // - The error message.
  stack: string; // - The stack trace of the error.
  statusCode?: number; // - HTTP status Code.
  isOperational?: boolean; // - Defines if it is a business logic error?
  devError?: {
    error?: string;
    stack?: string;
  };
}
export interface PayloadFailedProd {
  status: string;
  error?: string;
  message: string;
  stack?: string;
  statusCode?: number;
  isOperational?: boolean;
}

/**
 * A class for generating standard JSON responses.
 *
 * @class
 * @param {Response} response - The HTTP response object.
 * @param {number} [statusCode=200] - The HTTP status code.
 */
export class JsonResponse {
  private response: Response;
  private content: any; // TODO:

  /**
   * Constructs a new `JsonResponse` instance.
   * @param {Response} response - The HTTP response object.
   * @param {number} [statusCode=200] - The HTTP status code.
   * @example
   * const response = new JsonResponse(res, 200);
   */
  constructor(response: Response, statusCode: number = 200) {
    this.response = response.status(statusCode);
  }

  /**
   * Attaches a token cookie to the response.
   * @param {string} token - The token to be set in the cookie.
   * @param {number} expireIn - The number of seconds before the cookie expires.
   * @param {Object} [options] - The cookie options.
   * @param {boolean} [options.secure=false] - Indicates if the cookie should be secure.
   * @param {string} [options.cookieName='jwt'] - The name of the cookie.
   *
   * @example
   * // Attach a secure cookie with a custom name
   * response.attachTokenCookie('my-token', 3600, { secure: true, cookieName: 'my-cookie' });
   * // Attach a non-secure cookie with the default name 'jwt'
   * response.attachTokenCookie('my-token', 3600);
   */
  attachTokenCookie(
    token: string,
    expireIn: number,
    { secure = false, cookieName = "jwt" }
  ): JsonResponse {
    const cookieOptions = {
      expires: new Date(Date.now() + expireIn),
      httpOnly: true,
      secure: false,
    };

    if (secure) {
      cookieOptions.secure = true;
    }

    this.response.cookie(cookieName, token, cookieOptions);
    return this;
  }

  /**
   * Sets the main content of the response.
   * @param {boolean} success - Indicates the success status of the response.
   * @param {string} message - A message associated with the response.
   * @returns {JsonResponse} The modified `JsonResponse` instance.
   * @example
   * // Set the main content for a successful response
   * response.setMainContent(true, 'Request successful');
   * // Set the main content for a failed response
   * response.setMainContent(false, 'Request failed');
   */
  setMainContent(success: boolean, message: string): JsonResponse {
    this.content = {
      success,
      message,
    };
    return this;
  }

  /**
   * Sets the payload of the response for successful requests.
   * @param {Object} payload - The payload of the response.
   * @param {string} payload.token - The token for the response.
   * @param {Object} payload.data - The data for the response.
   * @example
   * response.setPayload({
   *     token: 'my-token',
   *     data: { /* your data object * / },
   * });
   */
  setPayload(payload: PayloadSuccess) {
    this.content.payload = payload;
    return this;
  }

  /**
   * Sets the payload of the response for failed requests.
   * @param {Object} payload - The payload of the response.
   * @param {string} payload.status - The status of the failed request.
   * @param {string} payload.error - The error description or code.
   * @param {string} payload.message - The error message.
   * @param {string} payload.stack - The stack trace of the error.
   * @example
   * response.setError({
   *     status: 'Some status',
   *     error: 'Some error',
   *     message: 'Some error message',
   *     stack: 'Error stack trace',
   * });
   */
  setError(error: PayloadFailedDev | PayloadFailedProd) {
    this.content.error = error;
    return this;
  }

  /**
   * Sends the HTTP response to the client.
   * @returns {void}
   * @example
   * response.send();
   */
  send(): void {
    this.response.json(this.content);
  }
}
