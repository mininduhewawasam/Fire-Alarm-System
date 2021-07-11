import { combineReducers } from "redux";

import user from "./reducers/user";
import sensors from "./reducers/sensors";

export default combineReducers({
  user,
  sensors
});
