import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import { getAllTestTemplates } from "../../../../server/services/testTemplateService.js";

const getSchema = Joi.object({
  id: Joi.number().integer().optional(),
  test_id: Joi.number().integer().optional(),
  created_by: Joi.number().integer().optional(),
  test_name:Joi.string().optional(),
  start_date:Joi.string().optional(),
  end_date:Joi.string().optional(),
  limit: Joi.number().integer().optional(),
  pageNo: Joi.number().integer().optional(),
});

export async function POST(req) {
  try {
    const requestBody = await req.json();

    const validate = await getSchema.validateAsync(requestBody, { abortEarly: false });

    const offset = (validate.pageNo - 1) * validate.limit;

    const data = await getAllTestTemplates({ offset, ...validate });

    return new Response(
      JSON.stringify({ message: "Test templates fetched successfully", data }),
      { status: StatusCodes.OK, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message, statusCode: error.isJoi ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR }),
      { status: error.isJoi ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR, headers: { "Content-Type": "application/json" } }
    );
  }
}
