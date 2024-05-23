import dynamodb from "../services/dynamoService.ts";
import joi from "joi";
import { PREFIX_NAME } from "../config";

const DepartamentoModel = dynamodb.define("departamento", {
  hashKey: "DepartamentoId",
  timestamps: false,
  schema: {
    DepartamentoId: dynamodb.types.uuid(),
    Nombre: joi.string(),
    numAgentes: joi.number(),
  },
  tableName: `Departamento${PREFIX_NAME}`, // Prefix name is used to separate production and development tables
});
/* */

dynamodb.createTables((err) => {
  if (err) 
    return console.log("Error creating tables: ", err);
  console.log("Tables created");
});
export default DepartamentoModel;
