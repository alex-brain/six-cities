import {combineReducers} from "redux";
import {applicationState} from "./application-state/application-state";
import {applicationData} from "./application-data/application-data";
import {user} from "./user/user";

export const NameSpace = {
  DATA: `DATA`,
  STATE: `STATE`,
  USER: `USER`,
};

export default combineReducers({
  [NameSpace.DATA]: applicationData,
  [NameSpace.STATE]: applicationState,
  [NameSpace.USER]: user,
});
