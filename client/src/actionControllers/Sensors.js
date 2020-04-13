import { normalize } from "normalizr";
import { SENSORS_FETCHED, SENSORS_CREATED } from "../types";
import api from "../api";
import { sensorSchema } from "../schemas";

// data.entities.books
const sensorsFetched = data => ({
  type: SENSORS_FETCHED,
  data
});

const sensorsCreated = data => ({
  type: SENSORS_CREATED,
  data
});

export const fetchSensors = () => dispatch =>
  api.sensors
    .fetchAll()
    .then(sensors => dispatch(booksFetched(normalize(sensors, [sensorSchema]))));

export const createsensor = data => dispatch =>
  api.sensors
    .create(data)
    .then(sensor => dispatch(bookCreated(normalize(sensor, sensorSchema))));
