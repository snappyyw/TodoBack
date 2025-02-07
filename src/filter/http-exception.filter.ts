import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from "class-validator";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || message;
      } else {
        message = exceptionResponse as string;
      }

      if (Array.isArray(message)) {
        message = message.map((err: ValidationError | string) => {
          if (
            typeof err === 'object' &&
            'property' in err &&
            'constraints' in err
          ) {
            return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
          }
          return typeof err === 'string' ? err : JSON.stringify(err);
        });
      }
    }

    console.error(`[${new Date().toISOString()}] Error:`, exception);

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
