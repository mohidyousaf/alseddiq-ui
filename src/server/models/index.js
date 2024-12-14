import { Sequelize } from "sequelize";
import sequelize from "../utils/db.js"; // Update the path if necessary

const db = {};

// Import model definitions
import Test from "./test.js";
import User from "./user.js";
import Patient from "./patient.js";
import TestTemplate from "./testTemplate.js";
import TestParameter from "./testParameter.js";
import TestInstance from "./testInstance.js";
import TestResult from "./testResult.js";
import SampleCollection from "./sampleCollection.js";
import Notification from "./notification.js";
import Visit from "./visit.js";
import Invoice from "./invoice.js";
import Payment from "./payment.js";

// Associations

// User -> TestInstance (Technician creating test instances)
User.hasMany(TestInstance, { foreignKey: "technician_id", as: "createdTests" });
TestInstance.belongsTo(User, { foreignKey: "technician_id" });

User.hasMany(TestInstance, { foreignKey: "admin_id", as: "approvedTests" });
TestInstance.belongsTo(User, { foreignKey: "admin_id" });

// User -> SampleCollection (Technician collecting samples)
User.hasMany(SampleCollection, {
  foreignKey: "technician_id",
  as: "collectedSamples",
});
SampleCollection.belongsTo(User, { foreignKey: "technician_id" });

// Patient -> Visit
Patient.hasMany(Visit, { foreignKey: "patient_id", as: "visits" });
Visit.belongsTo(Patient, { foreignKey: "patient_id" });

// Visit -> TestInstance
Visit.hasMany(TestInstance, { foreignKey: "visit_id", as: "testInstances" });
TestInstance.belongsTo(Visit, { foreignKey: "visit_id" });

// Test -> TestTemplate
Test.hasOne(TestTemplate, { foreignKey: "test_id", as: "template" });
TestTemplate.belongsTo(Test, { foreignKey: "test_id" });

// TestTemplate -> TestParameter
TestTemplate.hasMany(TestParameter, {
  foreignKey: "template_id",
  as: "parameters",
});
TestParameter.belongsTo(TestTemplate, { foreignKey: "template_id" });

// TestInstance -> TestResult
TestInstance.hasMany(TestResult, {
  foreignKey: "test_instance_id",
  as: "results",
});
TestResult.belongsTo(TestInstance, { foreignKey: "test_instance_id" });

// TestParameter -> TestResult
TestParameter.hasMany(TestResult, {
  foreignKey: "parameter_id",
  as: "parameterResults",
});
TestResult.belongsTo(TestParameter, { foreignKey: "parameter_id" });

// SampleCollection -> TestInstance
SampleCollection.belongsTo(TestInstance, { foreignKey: "test_instance_id" });
TestInstance.hasMany(SampleCollection, {
  foreignKey: "test_instance_id",
  as: "samples",
});

// Notification -> User
Notification.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Notification, { foreignKey: "user_id", as: "user_notifications" });

// Notification -> Patient
Notification.belongsTo(Patient, { foreignKey: "patient_id" });
Patient.hasMany(Notification, {
  foreignKey: "patient_id",
  as: "patient_notifications",
});

// Invoice -> Visit
Invoice.belongsTo(Visit, {
  foreignKey: "visit_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Visit.hasMany(Invoice, { foreignKey: "visit_id", as: "invoices", onDelete: "CASCADE",
  onUpdate: "CASCADE" });

// Payment -> Visit
Payment.belongsTo(Visit, { foreignKey: "visit_id" });
Visit.hasMany(Payment, { foreignKey: "visit_id", as: "payments" });

// Combine all models
const models = {
  Test,
  TestTemplate,
  TestParameter,
};

// Attach models to the Sequelize instance
sequelize.models = models;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export sequelize and models
export { models, db };
