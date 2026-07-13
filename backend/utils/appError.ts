class AppError extends Error {
  status_code: number;
  status: string;
  messageRet: string;

  constructor(message: string, statuscode: number) {
    super(message);

    this.status_code = statuscode;
    this.status = `${statuscode}`.startsWith("4") ? "fail" : "error";
    this.messageRet = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
