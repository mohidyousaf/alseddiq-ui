import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import { createTestTemplate } from "../../../../server/services/testTemplateService.js";

// Joi schema for validation
const schema = Joi.object({
  test_id: Joi.number().integer().required(),
  created_by: Joi.number().integer().required(),
  parameters: Joi.array()
    .items(
      Joi.object({
        parameter_name: Joi.string().max(256).required(),
        unit: Joi.string().max(256).optional(),
        normal_range: Joi.string().max(256).optional(),
        allowed_range: Joi.string().max(256).optional(),
      })
    )
    .optional(),
});

// POST handler for adding a new test template
export async function POST(req) {
  try {
    const requestBody = await req.json(); // Parse the request body

    // Validate request body using Joi
    const validate = await schema.validateAsync(requestBody, {
      abortEarly: false, // Collect all errors instead of stopping at the first one
    });

    // Call service to create test template and parameters
    const data = await createTestTemplate(validate);

    return new Response(
      JSON.stringify({
        message: "Test template created successfully",
        data,
      }),
      {
        status: StatusCodes.CREATED,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);

    return new Response(
      JSON.stringify({
        message: error.message,
        statusCode: error.isJoi ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR,
      }),
      {
        status: error.isJoi ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
