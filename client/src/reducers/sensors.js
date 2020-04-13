import { createSelector } from "reselect";
import { BOOKS_FETCHED, BOOK_CREATED } from "../types";

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

export const allSensorsSelector = createSelector(sensorsSelector, sensorHash =>
  Object.values(sensorHash)
);
