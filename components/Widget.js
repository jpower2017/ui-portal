import React, { PropTypes } from "react";
import Paper from "material-ui/Paper";
import { white, grey800 } from "material-ui/styles/colors";
import { typography } from "material-ui/styles";
import globalStyles from "../styles";
import "../widget.css";
import RaisedButton from "material-ui/RaisedButton";
import muiThemeable from "material-ui/styles/muiThemeable";

class Widget extends React.Component {
  render() {
    const { color, title, value, Icon, colorText, image } = this.props;

    const styles = {
      content: {
        padding: 4
      },
      text: {
        //fontWeight: "lighter",
        fontSize: 16,
        color: "#ffffff",
        backgroundColor: "#220088",
        padding: "4px 0  4px 8px",
        borderRadius: "5px"
      },
      paper: {
        borderRadius: "5px"
      }
    };
    const handleClick = () => {
      console.log("click Widget");
      this.props.handle(this.props.image, title);
    };

    return (
      <div style={{ padding: "15px" }} onClick={() => handleClick()}>
        <Paper style={styles.paper} zDepth={globalStyles.depth.n}>
          <div style={styles.text}>{title}</div>
          <div style={styles.content}>
            <img src={this.props.image} alt="alt 3" style={this.props.style} />
          </div>
        </Paper>
      </div>
    );
  }
}

//export default Widget;
export default muiThemeable()(Widget);
