import * as xlsx from "xlsx"; 
import { models } from "../models/index.js";
import { Op } from "sequelize";

export async function uploadTestCsv(dto) {
  console.log("In service");

  try {
    // Get the file buffer directly from the incoming request
    const buffer = await dto.arrayBuffer(); // Convert file to buffer

    // Read the CSV file directly from the buffer
    const workbook = xlsx.read(buffer, {
      type: "buffer", // Specify that the input is a buffer
      raw: true,
      sheetRows: 0,
      bookType: "csv",
    });

    // Get the first sheet from the workbook
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet rows to JSON
    const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    let testsArray = [];
    // Process each row (skipping first two rows as per your logic)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];

      // Create test object based on row data
      const test = {
        test_id: row[0],
        test_name: row[1],
        sample_needed: row[2] == "n" ? false : true,
        dept_name: row[3],
        type_of_specimen: row[4],
        conduct_in_report_format: row[5],
        status: row[6],
        service_group_name: row[7],
        service_sub_group_name: row[8],
        conduction_applicable: row[9] == "TRUE" ? true : false,
        conducting_doctor_mandatory: row[10] == "N" ? false : true,
        mandate_additional_info: row[11] == "N" ? false : true,
        unit_charge: row[12],
        result_entry_applicable: row[13] == "TRUE" ? true : false,
        alias: row[14],
        insurance_category: row[15],
        pre_auth_required: row[16] == "N" ? false : true,
        allow_rate_increase: row[17] == "TRUE" ? true : false,
        allow_rate_decrease: row[18] == "TRUE" ? true : false,
        interface_test_code: row[19] || null,
        dont_auto_share_result: row[20] == "TRUE" ? true : false,
        test_duration: row[21],
        prescribable: row[22] == "TRUE" ? true : false,
      };

      // Add the test object to the test array
      testsArray.push(test);
    }

    // Bulk create the tests in the database
    const createdTests = await models.Test.bulkCreate(testsArray);
    return createdTests;
  } catch (error) {
    console.error("Error processing the CSV file:", error);
    throw new Error(error.message);
  }
}

export async function getAllTests (dto) {
  const {
    limit,
    offset,
    test_id,
    test_name,
    sample_needed,
    dept_name,
    type_of_specimen,
    conduct_in_report_format,
    status,
    service_group_name,
    service_sub_group_name,
    conduction_applicable,
    conducting_doctor_mandatory,
    mandate_additional_info,
    unit_charge,
    result_entry_applicable,
    alias,
    insurance_category,
    pre_auth_required,
    allow_rate_increase,
    allow_rate_decrease,
    interface_test_code,
    dont_auto_share_result,
    test_duration,
    prescribable,
    order,
  } = dto;

  // Query conditions
  const where = {
    ...(test_id && { test_id: { [Op.like]: `%${test_id}%` } }),
    ...(test_name && { test_name: { [Op.like]: `%${test_name}%` } }),
    ...(sample_needed !== undefined && { sample_needed }),
    ...(dept_name && { dept_name: { [Op.like]: `%${dept_name}%` } }),
    ...(type_of_specimen && { type_of_specimen: { [Op.like]: `%${type_of_specimen}%` } }),
    ...(conduct_in_report_format && { conduct_in_report_format: { [Op.like]: `%${conduct_in_report_format}%` } }),
    ...(status && { status: { [Op.like]: `%${status}%` } }),
    ...(service_group_name && { service_group_name: { [Op.like]: `%${service_group_name}%` } }),
    ...(service_sub_group_name && { service_sub_group_name: { [Op.like]: `%${service_sub_group_name}%` } }),
    ...(conduction_applicable !== undefined && { conduction_applicable }),
    ...(conducting_doctor_mandatory !== undefined && { conducting_doctor_mandatory }),
    ...(mandate_additional_info !== undefined && { mandate_additional_info }),
    ...(unit_charge !== undefined && { unit_charge }),
    ...(result_entry_applicable !== undefined && { result_entry_applicable }),
    ...(alias && { alias: { [Op.like]: `%${alias}%` } }),
    ...(insurance_category && { insurance_category: { [Op.like]: `%${insurance_category}%` } }),
    ...(pre_auth_required !== undefined && { pre_auth_required }),
    ...(allow_rate_increase !== undefined && { allow_rate_increase }),
    ...(allow_rate_decrease !== undefined && { allow_rate_decrease }),
    ...(interface_test_code && { interface_test_code: { [Op.like]: `%${interface_test_code}%` } }),
    ...(dont_auto_share_result !== undefined && { dont_auto_share_result }),
    ...(test_duration && { test_duration }),
    ...(prescribable !== undefined && { prescribable }),
  };

  // Query execution
  const response = await models.Test.findAndCountAll({
    where,
    attributes: { exclude: ['deleted_at'] }, // Adjust attributes as needed
    ...(limit && { limit }),
    ...(offset && { offset }),
    ...(order && { order }),
  });

  return response;
};
