class ApiError extends Error {
  statusCode: number;
  message: string;
  data: any;
  errors: { [key: string]: any }[] | null; // Define errors as an array of objects or null
  stack?: string | undefined;

  constructor(
    statusCode: number = 500,
    message: string = "Internal server error",
    data: any = null,
    errors: { [key: string]: any }[] | null = null, // Default to null
    stack = undefined
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    if (data) this.data = data;
    this.errors = errors ?? null; // Use nullish coalescing to handle undefined
    if (this.stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
