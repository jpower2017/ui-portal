import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import InOutdatatable from "../containers/InOutdatatable";
import Dashboard from "../containers/DashboardPage";
import Investments from "../containers/Investments";
import Bg from "../images/squares-smallC2.jpg";
import Empty from "./Empty";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    //this.onclickLevel = this.onclickLevel.bind(this);
  }
  componentWillMount() {
    this.setState({});
  }
  componentDidMount() {}

  render() {
    return (
      <div
        style={{
          padding: "10px",
          backgroundImage: `url(${Bg})`,
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        {this.props.open ? <Empty /> : null}
        <Switch>
          <Route exact path="/" component={InOutdatatable} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/investments" component={Investments} />
          <Route path="/decisions" />
        </Switch>
      </div>
    );
  }
}
export default MainPage;
