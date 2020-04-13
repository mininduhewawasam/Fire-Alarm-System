import { createSelector } from "reselect";
import { SENSORS_FETCHED, SENSORS_CREATED } from "../types";

export default function sensors(state = {}, action = {}) {
  switch (action.type) {
    case SENSORS_FETCHED:
    case SENSORS_CREATED:
      return { ...state, ...action.data.entities.sensors };
    default:
      return state;
  }
}

// SELECTORS

export const sensorSelector = state => state.sensors;

export const allSensorsSelector = createSelector(sensorSelector, sensorHash =>
  Object.values(sensorHash)
);
