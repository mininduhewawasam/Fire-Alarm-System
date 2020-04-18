import { normalize } from "normalizr";
import { SENSORS_FETCHED, SENSORS_CREATED } from "../types";
import api from "../api";
import { sensorSchema } from "../schemas";

// data.entities.books
const sensorsFetched = (data) => ({
  type: SENSORS_FETCHED,
  data,
});

const sensorsCreated = (data) => ({
  type: SENSORS_CREATED,
  data,
});

export const fetchSensors = () => (dispatch) =>
  api.sensors.fetchAll(localStorage.userId).then((sensors) => {
    const sensorBundle = [];
    sensors.forEach((sensor) => {
      const sensorData = {
        sensorId: sensor.id,
        status: sensor.status,
        roomNo: sensor.Room.roomNo,
        floorNo: sensor.Floor.floorNo,
        locationName: sensor.Location.name,
        co2Value: sensor.SensorData[0].co2Level,
        smokeLevel: sensor.SensorData[0].smokeLevel
      };
      sensorBundle.push(sensorData);
    });
    dispatch(sensorsFetched(sensorBundle));
  });

export const createsensor = (data) => (dispatch) =>
  api.sensors
    .create(data)
    .then((sensor) =>
      dispatch(sensorsCreated(normalize(sensor, sensorSchema)))
    );
