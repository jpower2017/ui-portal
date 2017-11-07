import React from "react";
import pic1 from "../images/demo/cash-flow.png";
import pic2 from "../images/demo/liquidated-positions.png";
import pic3 from "../images/demo/cash-flow-monthly.png";
import pic4 from "../images/demo/exec-summary.png";
import pic5 from "../images/demo/hedge-fund-liquidity.png";
import pic6 from "../images/demo/weekly-macro-summary.png";
import Widget from "../components/Widget";

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const style = { width: "400px" };
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            paddingLeft: "40px"
          }}
        >
          <Widget image={pic4} title="Executive summary" style={style} />
          <Widget image={pic2} title="Liquidated positions" style={style} />
          <Widget image={pic3} title="Cash flow monthly" style={style} />
          <Widget image={pic6} title="Weekly macro summary" style={style} />
        </div>
      </div>
    );
  }
}
