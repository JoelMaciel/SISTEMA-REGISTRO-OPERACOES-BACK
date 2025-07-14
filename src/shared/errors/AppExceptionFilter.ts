// src/shared/errors/AppExceptionFilter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AppError } from './AppError';
import { ZodError } from 'zod';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof AppError) {
      return response.status(exception.statusCode).json({
        statusCode: exception.statusCode,
        message: exception.message,
      });
    }

    if (exception instanceof ZodError) {
      const formattedErrors = exception.errors.map((err) => ({
        campo: err.path.join('.'),
        message: err.message,
      }));

      return response.status(400).json({
        statusCode: 400,
        message: 'Erro de validação',
        errors: formattedErrors,
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();

      return response.status(status).json({
        statusCode: status,
        ...(typeof res === 'string' ? { message: res } : res),
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Erro interno do servidor',
    });
  }
}
