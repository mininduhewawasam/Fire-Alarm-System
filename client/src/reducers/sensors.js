import { createSelector } from "reselect";
import { SENSORS_FETCHED } from "../types";

export default function sensors(state = {}, action = {}) {
  switch (action.type) {
    case SENSORS_FETCHED:
      return { ...state, sensors: action.data };
    default:
      return state;
  }
}

// SELECTORS

export const sensorSelector = (state) => state.sensors;

export const allSensorsSelector = createSelector(sensorSelector, (sensorHash) =>
  Object.values(sensorHash)
);
