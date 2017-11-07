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

//import FlyoutContainer from "./FlyoutContainer";

//import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      //  width: `{this.props.width * 300}px`
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleBadge = this.handleBadge.bind(this);
    this.computedWidth = this.computedWidth.bind(this);
    this.placeIcons = this.placeIcons.bind(this);

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

  /** computed width:  values 1,2,3.   If 1 or 2 left drawer not showing **/
  /** COMPUTE WIDTH OF ICONS HERE NOT ENTIRE HEADER **/
  computedWidth() {
    console.log("computedWidth this.props.width " + this.props.width);
    let section = 250;
    if (this.props.width === 2) {
      //section = 500;
    }
    let val = this.props.width * section;
    if (this.props) console.log("computedWidth " + val);
    return `${val}px`;
  }
  placeIcons() {
    console.log("placeIcons " + this.props.open);
    return this.props.open ? "230px" : "0px";
  }
  badgeContentAmount() {
    return this.props.notifications.length || 0;
  }
  drawView(style) {
    const getDrawerIcon = () => {
      return (
        <Menu onClick={this.props.handleChangeRequestNavDrawer} color={white} />
      );
    };

    return (
      <div style={{ position: "fixed", zIndex: "10" }}>
        <div
          style={{
            position: "relative",
            opacity: 0.95,
            height: "60px",
            overflow: "hidden"
          }}
        >
          <img src={require("../images/nav_green9.jpg")} alt="" />
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: this.placeIcons(),
              color: "white",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: this.computedWidth()
              }}
            >
              <div style={style.headerItems}>{getDrawerIcon()}</div>
              <div style={style.headerItems}>Selected application title</div>

              <div>
                <AccountBox color={white} style={style.headerItems} />
                <Badge
                  onClick={this.handleBadge}
                  badgeContent={this.badgeContentAmount()}
                  badgeStyle={
                    this.props.notifications.length ? (
                      {
                        backgroundColor: "#f58c32",
                        top: 0,
                        right: -20,
                        height: 12
                      }
                    ) : (
                      {
                        backgroundColor: "#4e82af",
                        top: 0,
                        right: -20,
                        height: 12
                      }
                    )
                  }
                  primary={true}
                  style={{ padding: "0px" }}
                >
                  {this.props.notifications.length ? (
                    <NotificationsIcon style={{ color: white }} />
                  ) : (
                    <NotificationsNone style={{ color: white }} />
                  )}
                </Badge>

                <FlatButton
                  label="Support"
                  primary={true}
                  style={style.headerItems}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
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
        maxHeight: 1142
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
        marginRight: 20,
        marginLeft: 20
      }
    };

    return (
      <div>
        {this.props.lastUpdated ? this.drawView(style) : <div>Loading</div>}
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
  notifications: state.notifications.rows,
  lastUpdated: state.notifications.lastUpdated
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
