import React, { Component } from "react";
import "../App.css";
//import ExpandLess from "react-material-icons/icons/navigation/expand-less";
//import ExpandMore from "react-material-icons/icons/navigation/expand-more";
//import Dot from "react-material-icons/icons/av/fiber-manual-record";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //one: true,
    };
  }
  render() {
    return (
      <div
        className={this.props.styl}
        onClick={() => this.props.onclick(this.props.item)}
        style={{
          lineHeight: "14px",
          margin: "1px",
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: "10px"
        }}
      >
        {this.props.currentSelection ? (
          <span style={{ marginLeft: "22px" }} />
        ) : null}
        <div style={{ alignSelf: "center" }}>
          {this.props.item.leaf ? (
            <span
              style={{
                paddingRight: "7px",
                paddingLeft: "7px"
              }}
            >
              &#9679;
            </span>
          ) : null}
          {`${this.props.item.name}`}
        </div>
      </div>
    );
  }
}

export default Item;
