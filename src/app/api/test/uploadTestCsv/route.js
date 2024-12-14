import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import { uploadTestCsv } from "../../../../server/services/testService.js";

// Joi schema for file validation
const schema = Joi.object({
  mimetype: Joi.string()
    .valid("text/csv")
    .required()
    .messages({
      "any.only": "Only CSV files are allowed.",
    }),
  size: Joi.number()
    .max(5 * 1024 * 1024) // 5MB limit
    .required()
    .messages({
      "number.max": "File size exceeds 5MB.",
    }),
});

// POST handler for file upload
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file'); // File object from formData

    if (!file) {
      throw new Error('No file uploaded.');
    }

    // Extract mimetype and size from the file object
    const fileData = {
      mimetype: file.type,  // File mimetype (e.g., 'text/csv')
      size: file.size,      // File size in bytes
    };

    // Validate file using Joi
    const { error } = schema.validate(fileData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Business logic: Process the file (using file.stream() for handling large files)
    await uploadTestCsv(file); // Pass the file object for further processing

    return new Response(JSON.stringify({ message: "File uploaded and processed successfully" }), {
      status: StatusCodes.OK,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error.message);

    return new Response(JSON.stringify({ error: error.message }), {
      status: error.isJoi ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR,
      headers: { "Content-Type": "application/json" },
    });
  }
}
