import React, { PropTypes } from "react";
import Drawer from "material-ui/Drawer";
import { spacing, typography } from "material-ui/styles";
import {
  white,
  blue600,
  blueGrey400,
  grey600
} from "material-ui/styles/colors";
//import Support from "./Support.js";
//import muiThemeable from 'material-ui/styles/muiThemeable';
import { CSSTransitionGroup } from "react-transition-group";
import NotificationsContainer from "../containers/NotificationsContainer";
import Badge from "material-ui/Badge";
import NotificationsIcon from "material-ui/svg-icons/social/notifications-active";
import NotificationsNone from "material-ui/svg-icons/social/notifications-none";
import RaisedButton from "material-ui/RaisedButton";
import FastForward from "material-ui/svg-icons/av/fast-forward";
import DoneAll from "material-ui/svg-icons/action/done-all";
import { connect } from "react-redux";
import { deleteAllNotifications, addNotification, getData } from "../actions";

import { data1 } from "./data_notify";

class RightDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: data1,
      items1: this.props.notifications,
      numOfNotifications: null
    };
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleNotificationData = this.handleNotificationData.bind(this);
  }
  handleRemoveAll() {
    this.props.onClick();
  }
  handleAdd() {
    console.log("handleAdd " + JSON.stringify(this.state.data1[0]));
    this.props.onClickAdd(this.state.data1[0]);
  }
  handleNotificationData(n) {
    console.log("RightDrawer handleNotificationData notifications l: " + n);
    this.setState({ numOfNotifications: n });
  }

  render() {
    let { navDrawerOpen, handleChangeRequestNavDrawer } = this.props;
    return (
      <div>
        <Drawer
          docked={true}
          open={navDrawerOpen}
          openSecondary={true}
          width={320}
          style={{
            opacity: "1",
            backgroundColor: "blueGrey400"
          }}
          swipeAreaWidth={30}
        >
          <span
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center"
            }}
          >
            <RaisedButton
              label="Close"
              primary={true}
              onClick={handleChangeRequestNavDrawer}
            />
            <Badge
              onClick={handleChangeRequestNavDrawer}
              badgeContent={this.state.numOfNotifications}
              badgeStyle={
                this.props.notifications.length ? (
                  {
                    backgroundColor: "#f58c32",
                    top: 16,
                    right: 8,
                    height: 15
                  }
                ) : (
                  {
                    backgroundColor: "#4e82af",
                    top: 16,
                    right: 8,
                    height: 15
                  }
                )
              }
              primary={true}
            >
              {this.state.numOfNotifications ? (
                <NotificationsIcon style={{ color: white }} />
              ) : (
                <NotificationsNone style={{ color: white }} />
              )}
            </Badge>{" "}
            <RaisedButton
              label="Dismiss all"
              secondary={true}
              onClick={() => this.handleRemoveAll()}
            />
          </span>
          <hr />
          <NotificationsContainer onData={this.handleNotificationData} />
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  notifications: state.notifications
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(deleteAllNotifications());
  }
});

const RightDrawerContainer = connect(mapStateToProps, mapDispatchToProps)(
  RightDrawer
);

export default RightDrawerContainer;
