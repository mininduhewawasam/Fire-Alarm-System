import { createSelector } from "reselect";
import { SENSORS_FETCHED, SENSORS_CREATED } from "../types";

export default function sensors(state = {}, action = {}) {
  switch (action.type) {
    case SENSORS_FETCHED:
      console.log(action.data)
    return { ...state, sensors: action.data};
    case SENSORS_CREATED:
      return { ...state, ...action.data.sensor };
    default:
      return state;
  }
}

// SELECTORS

export const sensorSelector = state => state.sensors;

export const allSensorsSelector = createSelector(sensorSelector, sensorHash =>
  Object.values(sensorHash)
);
