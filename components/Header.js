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
//import Support from "./Support.js";
//import Mailto from "react-mailto";

import Badge from "material-ui/Badge";
import NotificationsIcon from "material-ui/svg-icons/social/notifications-active";
import NotificationsNone from "material-ui/svg-icons/social/notifications-none";

import muiThemeable from "material-ui/styles/muiThemeable";

import { connect } from "react-redux";
import { addNotification, deleteNotification } from "../containers/actions";
import Pic from "../images/nav_green9.jpg";

//import FlyoutContainer from "./FlyoutContainer";

//import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
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
  handleRemoveAll() {
    console.log("handleRemoveAll and dispatch");
    //this.context.store.dispatch(Notifications.removeAll());
    //this.context.store.dispatch(Notifications.hide(1));
    this.props.handleChangeRequestRightDrawer();
    ///this.context.store.dispatch(addNotification);
    this.props.onClick();
  }
  /* end Notifications functions */

  render() {
    const { styles, handleChangeRequestNavDrawer, onClick } = this.props;
    const { notifications } = this.props;

    const style = {
      appBar: {
        position: "fixed",
        top: 0,
        overflow: "hidden",
        maxHeight: 42
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
      }
    };

    return (
      <div>
        <AppBar
          style={{
            opacity: 0.9
          }}
          title="App title: selected in navigation"
          iconElementLeft={
            <IconButton
              style={style.menuButton}
              onClick={handleChangeRequestNavDrawer}
            >
              <Menu color={white} />
            </IconButton>
          }
          iconElementRight={
            <div style={style.iconsRightContainer}>
              <IconMenu
                color={white}
                iconButtonElement={
                  <IconButton>
                    <ViewModule color={white} />
                  </IconButton>
                }
                targetOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
              >
                <MenuItem
                  key={1}
                  primaryText="Application link"
                  onClick={() => this.props.onClick2(1)}
                />
              </IconMenu>

              <IconMenu
                color={white}
                iconButtonElement={
                  <IconButton>
                    <MoreVertIcon color={white} />
                  </IconButton>
                }
                targetOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
              >
                <MenuItem primaryText="Sign out" />
              </IconMenu>
              <span onClick={this.handleRemoveAll}>
                <Badge
                  badgeContent={notifications.length}
                  badgeStyle={
                    notifications.length ? (
                      {
                        backgroundColor: "#5fb888",
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
                  {notifications.length ? (
                    <NotificationsIcon style={{ color: white }} />
                  ) : (
                    <NotificationsNone style={{ color: white }} />
                  )}
                </Badge>
              </span>
            </div>
          }
        />
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
