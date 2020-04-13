import { schema } from "normalizr";

export const sensorSchema = new schema.Entity(
  "sensors",
  {},
  { idAttribute: "_id" }
);
