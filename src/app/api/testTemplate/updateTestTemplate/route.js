import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import { updateTestTemplate } from "../../../../server/services/testTemplateService.js";

const updateSchema = Joi.object({
  id: Joi.number().integer().required(), // Template ID
  test_id: Joi.number().integer().optional(),
  created_by: Joi.number().integer().optional(),
  parameters: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().optional(), // For existing parameters
        parameter_name: Joi.string().max(256).required(),
        unit: Joi.string().max(256).optional(),
        normal_range: Joi.string().max(256).optional(),
        allowed_range: Joi.string().max(256).optional(),
        deleted_at:Joi.string().optional(),
      })
    )
    .optional(),
});

export async function POST(req) {
  try {
    const requestBody = await req.json();

    const validate = await updateSchema.validateAsync(requestBody, { abortEarly: false });

    const data = await updateTestTemplate(validate);

    return new Response(
      JSON.stringify({ message: "Test template updated successfully", data }),
      { status: StatusCodes.OK, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message, statusCode: error.isJoi ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR }),
      { status: error.isJoi ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR, headers: { "Content-Type": "application/json" } }
    );
  }
}
