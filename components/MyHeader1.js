import React, { PropTypes } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import Menu from "material-ui/svg-icons/navigation/menu";
import ViewModule from "material-ui/svg-icons/action/view-module";
import { white } from "material-ui/styles/colors";
import SearchBox from "./SearchBox";
import FlatButton from "material-ui/FlatButton";

import Badge from "material-ui/Badge";
import NotificationsIcon from "material-ui/svg-icons/social/notifications-active";
import NotificationsNone from "material-ui/svg-icons/social/notifications-none";
import AccountBox from "material-ui/svg-icons/action/account-box";

import muiThemeable from "material-ui/styles/muiThemeable";

import { connect } from "react-redux";
import { addNotification, deleteNotification } from "../actions";

import FastForward from "material-ui/svg-icons/av/fast-forward";
import FastRewind from "material-ui/svg-icons/av/fast-rewind";

//import FlyoutContainer from "./FlyoutContainer";

//import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleBadge = this.handleBadge.bind(this);
    /* load notifications for testing */
    this.handleClick();
  }
  /* Notifications functions */
  /*
  dispatchNotification(fn, timeout) {
    setTimeout(() => {
      this.context.store.dispatch(fn(notificationOpts));
    }, timeout);
  }*/
  handleClick() {}
  handleBadge() {
    console.log("handleBadge  and dispatch");
    //this.context.store.dispatch(Notifications.removeAll());
    //this.context.store.dispatch(Notifications.hide(1));
    this.props.handleChangeRequestRightDrawer();
    ///this.context.store.dispatch(addNotification);
    this.props.onClick();
  }
  /* end Notifications functions */

  getDrawerIcon() {
    return this.props.leftNavDrawOpen ? (
      <FastRewind
        onClick={this.props.handleChangeRequestNavDrawer}
        color={white}
      />
    ) : (
      <FastForward
        onClick={this.props.handleChangeRequestNavDrawer}
        color={white}
      />
    );
  }

  render() {
    const { styles, handleChangeRequestNavDrawer, onClick } = this.props;
    const { notifications } = this.props;

    const style = {
      appBar: {
        position: "fixed",
        top: 0,
        overflow: "hidden",
        maxHeight: 142
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        //  marginLeft: 20,
        marginTop: "-10px",
        marginRight: 40,
        display: "flex",
        alignItems: "center"
      },
      headerItems: {
        marginRight: 40
      }
    };

    return (
      <div
        style={{
          position: "relative",
          opacity: 0.9,
          height: "140px",
          overflow: "hidden"
        }}
      >
        <img src={require("../images/nav_green9.jpg")} alt="" />
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "300px",
            color: "white"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "800px"
            }}
          >
            <div style={style.headerItems}>{this.getDrawerIcon()}</div>
            <div style={style.headerItems}>Selection title goes here</div>
            <AccountBox color={white} style={style.headerItems} />

            <div
              onClick={this.handleBadge}
              style={{ backgroundColor: "#000000" }}
            >
              <Badge
                badgeContent={notifications.length}
                badgeStyle={
                  notifications.length ? (
                    {
                      backgroundColor: "#f58c32",
                      top: 26,
                      right: 12,
                      height: 15
                    }
                  ) : (
                    {
                      backgroundColor: "#4e82af",
                      top: 26,
                      right: 12,
                      height: 15
                    }
                  )
                }
                primary={true}
              >
                {notifications.length ? (
                  <NotificationsIcon style={{ color: white }} />
                ) : (
                  <NotificationsNone style={{ color: white }} />
                )}
              </Badge>
            </div>

            <FlatButton
              label="Support"
              primary={true}
              style={style.headerItems}
            />
          </div>
        </div>
      </div>
    );
  }
}

Header.contextTypes = {
  //  store: PropTypes.object
};

Header.propTypes = {
  //notifications: PropTypes.array
};

const mapStateToProps = (state, ownProps) => ({
  notifications: state.notifications
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    //  dispatch(addNotification())
  },
  onClick2: () => {
    dispatch(deleteNotification());
  }
});

const HeaderLink = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderLink;
