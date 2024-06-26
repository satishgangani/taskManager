import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    BadRequestException,
    UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
@Catch(HttpException, UnauthorizedException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        // Check if the exception is a BadRequestException
        if (exception instanceof BadRequestException) {
            const validationErrors = exception.getResponse()['message']; // Extract validation errors
            return response.status(status).json({
                statusCode: status,
                message: 'Validation failed',
                timestamp: new Date().toISOString(),
                path: request.url,
                errors: validationErrors,
            });
        }
        // For other HttpExceptions, handle them normally
        response.status(status).json({
            statusCode: status,
            message: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}