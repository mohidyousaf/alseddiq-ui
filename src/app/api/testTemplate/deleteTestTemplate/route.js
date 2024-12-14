import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import { deleteTestTemplate } from "../../../../server/services/testTemplateService.js";

const deleteSchema = Joi.object({
  id: Joi.number().integer().required(), // Template ID
});

export async function POST(req) {
  try {
    const requestBody = await req.json();

    const validate = await deleteSchema.validateAsync(requestBody, { abortEarly: false });

    await deleteTestTemplate(validate.id);

    return new Response(
      JSON.stringify({ message: "Test template soft-deleted successfully" }),
      { status: StatusCodes.OK, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message, statusCode: error.isJoi ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR }),
      { status: error.isJoi ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR, headers: { "Content-Type": "application/json" } }
    );
  }
}
