import { Response } from "express";

class ApiResponse {
  status: number;
  message: string | null;
  data: any | null;
  error: any | null;

  constructor(
    res: Response,
    status = 200,
    message: string | null = null,
    data: any = null,
    error: any = null
  ) {
    this.status = status;
    this.message = message || this.getDefaultMessage(status);
    this.data = data;
    this.error = error;

    this.send(res);
  }

  private getDefaultMessage(status: number): string {
    switch (status) {
      case 200:
        return "OK";
      case 201:
        return "Created";
      case 400:
        return "Bad Request";
      case 401:
        return "Unauthorized";
      case 403:
        return "Forbidden";
      case 404:
        return "Not Found";
      case 422:
        return "Unprocessable Entity";
      case 500:
        return "Internal Server Error";
      default:
        return "Error";
    }
  }

  send(res: Response) {
    return res.status(this.status).json({
      status: this.status,
      message: this.message,
      data: this.data,
      error: this.error,
    });
  }
}

export default ApiResponse;