import * as HTTP from "../common/http";
import R from "ramda";

export const REQUEST_NOTIFICATIONS = "REQUEST_NOTIFICATIONS";
export const RECEIVE_NOTIFICATIONS = "RECEIVE_NOTIFICATIONS";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";

export const getNotifications = () => async dispatch => {
  dispatch(requestNotifications());
  const rows = await HTTP.getRows();
  console.log("notifications " + rows.allNotifications);
  dispatch(receiveDeals(rows.allNotifications));
};

export const requestNotifications = () => ({
  type: REQUEST_NOTIFICATIONS
});
export const receiveDeals = json => ({
  type: RECEIVE_NOTIFICATIONS,
  notifications: json,
  receivedAt: Date.now()
});
export const deleteRowAction = n => ({
  type: DELETE_NOTIFICATION,
  id: n
});
export const deleteNotification = id => async dispatch => {
  console.log("Action delete id: " + id);
  dispatch(deleteRowAction(id));
  const row = await HTTP.deleteRow(id);
};

export const deleteAllNotifications = () => async (dispatch, getState) => {
  const notifications = getState().notifications.rows;
  R.map(x => dispatch(deleteNotification(x.id)), notifications);
};

/*
export const deleteAllNotifications = () => ({
  type: "DELETE_ALL_NOTIFICATIONS"
});
*/
