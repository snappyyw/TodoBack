import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    }
    else if (exception instanceof ForbiddenException) {
      status = HttpStatus.FORBIDDEN;
      message = exception.message;
    }

    console.error(`[${new Date().toISOString()}] Error:`, exception);

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString()
    });
  }
}
