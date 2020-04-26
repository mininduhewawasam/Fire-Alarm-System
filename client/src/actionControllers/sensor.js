import { SENSORS_FETCHED } from "../types";
import api from "../api";

const sensorsFetched = (data) => ({
  type: SENSORS_FETCHED,
  data,
});


export const fetchSensors = () => (dispatch) =>
  api.sensors.fetchAll().then((sensors) => {
    const sensorBundle = [];
    sensors.forEach((sensor) => {
      const sensorData = {
        sensorId: sensor.id,
        sensorName:sensor.name,
        status: sensor.status,
        roomNo: sensor.Room.roomNo,
        floorNo: sensor.Floor.floorNo,
        locationName: sensor.Location.name,
        co2Value: sensor.SensorData[0]
          ? sensor.SensorData[0].co2Level
          : null,
        smokeLevel: sensor.SensorData[0]
          ? sensor.SensorData[0].smokeLevel
          : null,
      };
      sensorBundle.push(sensorData);
    });
    console.log(sensorBundle)
    dispatch(sensorsFetched(sensorBundle));
  });
