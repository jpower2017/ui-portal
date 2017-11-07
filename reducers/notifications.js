import {
  REQUEST_NOTIFICATIONS,
  RECEIVE_NOTIFICATIONS,
  DELETE_NOTIFICATION
} from "../actions";
import R from "ramda";

const notifications = (state = [], action) => {
  //console.log("ADD_NOTIFICATION reducer folder " + action.type);
  switch (action.type) {
    case REQUEST_NOTIFICATIONS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_NOTIFICATIONS:
      console.log("REDUCER RECEIVE" + action.notifications);
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        rows: action.notifications,
        lastUpdated: action.receivedAt,
        select: 1
      };
    case DELETE_NOTIFICATION:
      console.log("REDUCER DELETE " + action.id);
      return {
        ...state,
        rows: R.filter(x => x.id != action.id, state.rows)
      };
    case "ADD_NOTIFICATION":
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          message: action.message,
          messageType: action.messageType,
          priority: action.priority,
          delet: action.delet,
          showNew: action.showNew,
          time: action.time
        }
      ];

    case "MODIFY_NOTIFICATION":
      console.log("MODIFY_NOTIFICATION reducer f action.id " + action.id);
      return state.map(
        x => (x.id === action.id ? { ...x, showNew: false } : x)
      );
    /*
    case "DELETE_ALL_NOTIFICATIONS":
      console.log("DELETE_ALL_NOTIFICATIONS reducer f ");
      return {
        ...state,
        rows: []
      };
      */
    default:
      return { empty: 1 };
  }
};

export default notifications;
