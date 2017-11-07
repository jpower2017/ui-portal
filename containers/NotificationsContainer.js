import React, { Component } from "react";
//import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getNotifications, deleteNotification } from "../actions";
import Notifications from "../components/Notifications.js";

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.getNotifications();
  }
  componentDidMount() {
    console.log("componentDidMount Table ");
  }

  onData() {
    if (this.props.notifications) {
      this.props.onData(this.props.notifications.length);
    }
    return this.props.lastUpdated ? (
      <Notifications
        notifications={this.props.notifications}
        onclick={this.props.onClick2}
      />
    ) : null;
  }
  render() {
    return <div>{this.onData()}</div>;
  }
}
const mapStateToProps = (state, ownProps) => ({
  notifications: state.notifications.rows,
  lastUpdated: state.notifications.lastUpdated
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getNotifications: x => {
    dispatch(getNotifications());
  },
  onClick2: id => {
    dispatch(deleteNotification(id));
  }
});
const TableContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  TableContainer
);

export default TableContainer2;
