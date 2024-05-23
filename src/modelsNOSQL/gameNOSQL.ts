import dynamodb from "../services/dynamoService.ts";
import joi from "joi";
import { PREFIX_NAME } from "../config/index.ts";

const GameModel = dynamodb.define("game", {
  hashKey: "GameId",
  timestamps: false,
  schema: {
    GameId: dynamodb.types.uuid(),
    Nombre: joi.string(),
    activeUsers: joi.number(),
  },
  tableName: `Game${PREFIX_NAME}`, // Prefix name is used to separate production and development tables
});
/* */

dynamodb.createTables((err) => {
  if (err) 
    return console.log("Error creating tables: ", err);
  console.log("Tables created");
});
export default GameModel;
