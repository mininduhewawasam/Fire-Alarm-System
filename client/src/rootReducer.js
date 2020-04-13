import { combineReducers } from "redux";

import user from "./reducers/user";
import books from "./reducers/sensors";

export default combineReducers({
  user,
  books
});
