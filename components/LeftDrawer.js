import React, { PropTypes } from "react";
import Drawer from "material-ui/Drawer";
import { spacing, typography } from "material-ui/styles";
import { white, blue600, blueGrey400 } from "material-ui/styles/colors";
import BackgroundImage from "react-background-image-loader";

import { connect } from "react-redux";

import NavContainer from "./nav/NavContainer";
import Pic from "../images/nav_green9.jpg";

class LeftDrawer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { navDrawerOpen, handleChangeRequestNavDrawer } = this.props;
    //console.log('notifications(from l drawer): '+this.props.notifications)
    const styles = {
      logo: {
        cursor: "pointer",
        fontSize: 22,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        //backgroundColor: blueGrey400,
        paddingLeft: 40,
        height: 56
      },

      avatar: {
        icon: {
          float: "left",
          display: "block",
          marginRight: 15,
          boxShadow: "0px 0px 0px 8px rgba(0,0,0,0.2)"
        },
        span: {
          paddingTop: 12,
          display: "block",
          color: "white",
          fontWeight: 300,
          textShadow: "1px 1px #444"
        }
      }
    };
    return (
      <Drawer docked={true} open={navDrawerOpen}>
        <div
          style={{
            position: "relative",
            height: "100%",
            overflow: "hidden"
          }}
        >
          <img
            src={require("../images/left-nav-D.jpg")}
            style={{
              opacity: 0.7,
              paddingBottom: "50px"
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50px",
              left: "0",
              width: "100%"
            }}
          >
            <NavContainer />
            <div
              style={{
                position: "absolute",
                top: "650px",
                left: "0",
                width: "100%"
              }}
            >
              <img
                src={require("../images/Logo_words_200w.png")}
                style={{
                  opacity: 0.7,
                  //paddingBottom: "50px"
                  padding: "0 10px 50px 10px"
                }}
              />
            </div>
          </div>
        </div>
      </Drawer>
    );
  }
}

LeftDrawer.contextTypes = {
  //  store: PropTypes.object
};

LeftDrawer.propTypes = {
  //  notifications: PropTypes.array
};

export default connect(state => ({ notifications: state.notifications }))(
  LeftDrawer
);
