import React from "react";
import pic1 from "../images/demo/cash-flow.png";
import pic2 from "../images/demo/liquidated-positions.png";
import pic3 from "../images/demo/cash-flow-monthly.png";
import pic4 from "../images/demo/exec-summary.png";
import pic5 from "../images/demo/hedge-fund-liquidity.png";
import pic6 from "../images/demo/weekly-macro-summary.png";
import Widget from "../components/Widget";
import Dialog from "material-ui/Dialog";

export default class Investments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      shownFile: ""
    };
  }

  render() {
    const style = { width: "400px" };
    const handle = (file, title) => {
      console.log("Demo handleWidget " + file);
      this.setState({
        modalOpen: !this.state.modalOpen,
        shownFile: file,
        showFileTitle: title
      });
    };
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
          <Widget
            image={pic4}
            title="Executive summary"
            style={style}
            handle={handle}
          />
          <Widget
            image={pic2}
            title="Liquidated positions"
            style={style}
            handle={handle}
          />
          <Widget
            image={pic3}
            title="Cash flow monthly"
            style={style}
            handle={handle}
          />
          <Widget
            image={pic6}
            title="Weekly macro summary"
            style={style}
            handle={handle}
          />
        </div>
        <Dialog
          modal={false}
          open={this.state.modalOpen}
          autoScrollBodyContent={true}
          autoDetectWindowHeight={true}
          onRequestClose={() => this.setState({ modalOpen: false })}
          contentStyle={{
            width: "95%",
            maxWidth: "none"
          }}
        >
          <div>
            <Widget
              image={this.state.shownFile}
              title={this.state.showFileTitle}
              style={{ maxWidth: "1350px" }}
              handle={() => console.log("suppress onclick Widget")}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}
