import { models } from "../models/index.js";
import { Op } from "sequelize";
import sequelize from "../utils/db.js";
import TestParameter from "../models/testParameter.js";
import Test from "../models/test.js";

export async function createTestTemplate({ test_id, created_by, parameters }) {
  const transaction = await sequelize.transaction();
  try {
    // Create the test template
    const testTemplate = await models.TestTemplate.create(
      {
        test_id,
        created_by,
      },
      { transaction }
    );

    // Add the parameters associated with this template
    const testParameters = await models.TestParameter.bulkCreate(
      parameters.map((param) => ({
        template_id: testTemplate.id,
        parameter_name: param.parameter_name,
        unit: param.unit,
        normal_range: param.normal_range,
        allowed_range: param.allowed_range,
      })),
      { transaction }
    );

    await transaction.commit();
    return { testTemplate, testParameters };
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating test template:", error);
    throw new Error("Failed to create test template");
  }
}

export async function deleteTestTemplate(id) {
  await models.TestTemplate.destroy({where:{id} });
}

export async function getAllTestTemplates(dto) {
  const where = {
    ...(dto?.id && { id: dto.id }),
    ...(dto?.test_id && { test_id: { [Op.eq]: dto.test_id } }),
    ...(dto?.created_by && { created_by: dto.created_by }),
    ...(dto?.test_name && {
      "$Test.test_name$": { [Op.like]: `%${dto?.test_name}%` },
    }),
  };

  const response = await models.TestTemplate.findAndCountAll({
    where,
    include: [
      { model: TestParameter, as: "parameters" },
      { model: Test, attributes: ["id", "test_id", "test_name"] },
    ],
    ...(dto.limit && { limit: dto.limit }),
    ...(dto.offset && { offset: dto.offset }),
  });

  let totalCount = await models.TestTemplate.findAll({ where });

  return { count: totalCount.length, rows: response.rows };
}

export async function updateTestTemplate({
  id,
  test_id,
  created_by,
  parameters,
}) {
  const transaction = await sequelize.transaction();
  try {
    // Update the template
    const template = await models.TestTemplate.findByPk(id);
    if (!template) {
      throw new Error("Test template not found");
    }
    await template.update({ test_id, created_by }, { transaction });

    // Handle parameters
    if (parameters) {
      for (const param of parameters) {
        if (param.id) {
          // Update existing parameter
          const parameter = await models.TestParameter.findByPk(param.id);
          if (parameter) {
            if (param?.deleted_at) {
              await models.TestParameter.destroy({
                where: { id: param.id },
              });
            } else {
              await parameter.update(param, { transaction });
            }
          }
        } else {
          // Create new parameter
          await models.TestParameter.create(
            { template_id: id, ...param },
            { transaction }
          );
        }
      }
    }

    await transaction.commit();
    return template;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
