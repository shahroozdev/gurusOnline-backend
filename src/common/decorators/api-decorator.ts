import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ApiSchemas } from '../data/api-response.schema';

export function ApiCustomResponse(key: keyof typeof ApiSchemas) {
  const schema = ApiSchemas[key] as Record<string, any>;

  return applyDecorators(
    ApiOperation({ summary: schema.summary }),

    // API Body (if exists)
    ...(schema.hasOwnProperty('body')
      ? [ApiBody({ schema: schema.body })]
      : []),

    // API Parameters (if exists)
    ...(schema.hasOwnProperty('parameters')
      ? schema.parameters.map((param: any) => ApiParam(param))
      : []),

    // API Responses
    ...(schema.responsesArr?.map((res: Record<string, any>) =>
      ApiResponse(res),
    ) || []),
  );
}
