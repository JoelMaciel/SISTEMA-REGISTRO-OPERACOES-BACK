import { ZodType, ZodError } from 'zod';
import { BadRequestException } from '@nestjs/common';

export class ValidateSchema {
  public static async validate<T>(
    schema: ZodType<T, any, any>,
    data: unknown,
  ): Promise<T> {
    try {
      return await schema.parseAsync(data);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((issue) => {
          const path = issue.path.join('.');

          return {
            campo: path || 'corpo_requisicao',

            message:
              issue.message === 'Invalid input'
                ? `Erro no campo ${issue.code}`
                : issue.message,
          };
        });

        throw new BadRequestException({
          statusCode: 400,
          message: 'Erro de validação nos campos',
          errors: formattedErrors,
        });
      }
      throw error;
    }
  }
}
