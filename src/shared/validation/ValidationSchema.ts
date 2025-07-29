import { ZodType } from 'zod';

export class ValidateSchema {
  public static validate<T>(
    schema: ZodType<T, any, any>,
    data: unknown,
  ): Promise<T> {
    return schema.parseAsync(data);
  }
}
