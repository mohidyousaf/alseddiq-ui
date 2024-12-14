import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import { getAllTests } from "../../../../server/services/testService.js";

// Joi schema for validation
const schema = Joi.object({
    id: Joi.number().integer().optional(),
    test_id: Joi.string().max(256).optional(),
    test_name: Joi.string().max(256).optional(),
    sample_needed: Joi.boolean().optional(),
    dept_name: Joi.string().max(256).optional(),
    type_of_specimen: Joi.string().max(256).optional(),
    conduct_in_report_format: Joi.string().max(256).optional(),
    status: Joi.string().max(256).optional(),
    service_group_name: Joi.string().max(256).optional(),
    service_sub_group_name: Joi.string().max(256).optional(),
    conduction_applicable: Joi.boolean().optional(),
    conducting_doctor_mandatory: Joi.boolean().optional(),
    mandate_additional_info: Joi.boolean().optional(),
    unit_charge: Joi.number().precision(2).optional(),
    result_entry_applicable: Joi.boolean().optional(),
    alias: Joi.string().max(256).optional(),
    insurance_category: Joi.string().max(256).optional(),
    pre_auth_required: Joi.boolean().optional(),
    allow_rate_increase: Joi.boolean().optional(),
    allow_rate_decrease: Joi.boolean().optional(),
    interface_test_code: Joi.string().max(256).optional(),
    dont_auto_share_result: Joi.boolean().optional(),
    test_duration: Joi.number().integer().optional(),
    prescribable: Joi.boolean().optional(),
    limit: Joi.number().optional(),
    pageNo: Joi.number().optional(),
  });
  

// POST handler for getting all form instances
export async function POST(req) {
  try {
    const requestBody = await req.json(); // Parse the request body

    // Validate request body using Joi
    const validate = await schema.validateAsync(requestBody, {
      abortEarly: false, // Collect all errors instead of stopping at the first one
    });

    // Calculate offset for pagination
    const offset = (validate.pageNo - 1) * validate.limit;

    // Call service to fetch data
    const data = await getAllTests({ offset, ...validate });

    return new Response(JSON.stringify({
      message: "Request Successful",
      data,
    }), {
      status: StatusCodes.OK,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);

    return new Response(JSON.stringify({
      message: error.message,
      statusCode: error.isJoi ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR,
    }), {
      status: error.isJoi ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR,
      headers: { "Content-Type": "application/json" },
    });
  }
}
