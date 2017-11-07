import React, { PropTypes } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MyHeader from "./components/MyHeader";
import LeftDrawer from "./components/LeftDrawer";
import RightDrawer from "./components/RightDrawer";
import MainPage from "./components/MainPage";
import withWidth, { LARGE, SMALL } from "material-ui/utils/withWidth";
import ThemeDefault from "./theme-default";
import Data from "./data";

import { Provider } from "react-redux";
import { configureStore } from "./store";

import FlyoutContainer from "./components/FlyoutContainer";
//import Dialog from "material-ui/Dialog";

import * as Colors from "material-ui/styles/colors";

//import pic6 from "./images/demo/weekly-macro-summary.png";
//import Widget from "./components/Widget";

const store = configureStore();
//window.appStore = store; //In case you want to see what's inside by executing appStore in console;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: true,
      navRightDrawerOpen: false,
      flyoutEnabled: false,
      modalOpen: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({ navDrawerOpen: nextProps.width === LARGE });
    }
  }

  handleChangeRequestNavDrawer() {
    console.log("handleChangeRequestNavDrawer");
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
      navRightDrawerOpen: false
    });
  }
  handleChangeRequestNavDrawer2() {
    if (this.props.width == SMALL) {
      this.setState({
        navDrawerOpen: !this.state.navDrawerOpen
      });
    }
  }
  handleChangeRequestNavDrawer3() {
    console.log("handleChangeRequestNavDrawer3");

    this.setState({
      navDrawerOpen: false,
      navRightDrawerOpen: !this.state.navRightDrawerOpen
      /* BATCH SET STATE Hack */
      /////flyoutEnabled: this.state.navRightDrawerOpen
    });
  }
  handleChangeRequestNavDrawer4() {
    console.log("handleChangeRequestNavDrawer4");
    this.setState(
      {
        //snackbar: !this.state.snackbar
      }
    );
  }
  handleActionTouchTap = () => {
    console.log("handleActionTouchTap ");
    this.setState(
      {
        //snackbar: false
      }
    );
  };

  render() {
    let { navDrawerOpen, navRightDrawerOpen } = this.state;
    //navDrawerOpen = false;
    const paddingLeftDrawerOpen = 236;
    const header = {
      height: 100
    };
    console.log("headerStyles " + header);

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: "45px 10px 20px 10px",
        paddingLeft:
          navDrawerOpen && this.props.width !== SMALL
            ? paddingLeftDrawerOpen
            : 0
      }
    };

    return (
      <Provider store={store}>
        <BrowserRouter>
          <MuiThemeProvider muiTheme={ThemeDefault}>
            <div style={{ maxWidth: "1240px" }}>
              <MyHeader
                handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(
                  this
                )}
                handleChangeRequestRightDrawer={this.handleChangeRequestNavDrawer3.bind(
                  this
                )}
                leftNavDrawOpen={this.state.navDrawerOpen}
                open={this.state.navDrawerOpen}
                width={this.props.width}
              />

              <LeftDrawer
                navDrawerOpen={navDrawerOpen}
                menus={Data.menus}
                username="BSCC user"
                handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer2.bind(
                  this
                )}
              />
              <RightDrawer
                navDrawerOpen={navRightDrawerOpen}
                username="BSCC"
                handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer3.bind(
                  this
                )}
              />
              {this.state.flyoutEnabled ? <FlyoutContainer /> : null}
              <div style={{ height: "80px" }} />
              <MainPage open={this.state.navDrawerOpen} />
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default withWidth()(App);
