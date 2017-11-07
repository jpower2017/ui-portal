import React, { Component } from "react";
import R from "ramda";
import classNames from "classnames";
import "./App.css";
import Item from "./Item";
import { data1, data2, data3 } from "./data";
import Remove from "material-ui/svg-icons/content/remove";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";

import HighLightOff from "material-ui/svg-icons/action/highlight-off";

import CircleAdd from "material-ui/svg-icons/image/control-point";
import ExpandLess from "material-ui/svg-icons/navigation/expand-less";
import ExpandMore from "material-ui/svg-icons/navigation/expand-more";
import Home from "material-ui/svg-icons/action/home";

import * as Colors from "material-ui/styles/colors";
import muiThemeable from "material-ui/styles/muiThemeable";
import { withRouter } from "react-router-dom";

class NavContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: data1,
      data2: data2,
      data3: data3,
      items1: data1,
      items2: data2,
      items3: data3,
      level1Selection: null,
      level2Selection: null,
      level3Selection: null,
      levels: 3,
      favorites: [],
      arrShowFavs: [],
      currentSelection: null,
      currentSelectionLeaf: false,
      currentFavorite: null,
      edit: false,
      showFavorites: true
    };
    this.onclick = this.onclick.bind(this);
    this.onclickLevel = this.onclickLevel.bind(this);
    this.addToFavs = this.addToFavs.bind(this);
    this.removeFromFavs = this.removeFromFavs.bind(this);
    this.temp = this.temp.bind(this);
    this.favoriteItem = this.favoriteItem.bind(this);
    this.renderFavorites = this.renderFavorites.bind(this);
    this.renderTitleBarFavs = this.renderTitleBarFavs.bind(this);
    this.renderAdd = this.renderAdd.bind(this);
    this.renderRemove = this.renderRemove.bind(this);
    this.edit = this.edit.bind(this);
    this.home = this.home.bind(this);
  }
  componentWillMount() {
    this.setState({
      data: [...this.state.data1, ...this.state.data2, ...this.state.data3]
    });
  }
  componentDidMount() {}

  /* set non-selectedA items of a level to 'show = false'*/
  updateSiblings(id, level) {
    return R.map(
      x => (x.id !== id ? R.merge(x, { show: false }) : x),
      this.state["items" + level]
    );
  }
  onclick(item) {
    this.props.history.push(`${item.endpoint}`);
    this.onclickLevel(item);
  }
  onclickLevel(item) {
    const { id, level } = item;
    this.setState({ edit: false });
    console.log(
      "leaf from state.data " +
        JSON.stringify(R.filter(x => x.id === id, this.state.data))
    );
    let x = R.filter(x => x.id === id, this.state.data);
    console.log("R.props " + R.props(["leaf"], x[0]));
    let xx = R.props(["leaf"], x[0]);
    console.log("xx " + xx);
    this.setState({ currentSelection: id });
    /* returned from R props is an object.  eg.  {0: false}*/
    xx[0] ? this.setState({ currentFavorite: null }) : null;
    this.setState({ currentSelectionLeaf: xx[0] });
    if (level === 1) {
      this.setState({ items3: data3 });
    }
    this.setState({
      ["level" + level + "Selection"]: id,
      ["level" + (level + 1) + "Selection"]: null
    });
    let b = this.updateSiblings(id, level);
    this.setState({ ["items" + level]: b });
    if (level < this.state.levels) {
      this.showChildrenLevel(id, level);
    }
  }
  addToFavs() {
    //debugger;
    console.log("addToFavs");
    if (!this.state.currentSelectionLeaf) {
      return;
    }
    console.log(
      R.find(R.propEq("id", this.state.currentSelection))(this.state.data)
    );
    let obj = R.find(R.propEq("id", this.state.currentSelection))(
      this.state.data
    );
    console.log("obj " + JSON.stringify(obj));

    if (obj.leaf) {
      console.log("YES CURRENT LEAF " + obj.leaf);
      let uniq = R.uniq([...this.state.favorites, obj.id]);
      console.log("uniq " + uniq);
      this.setState({ favorites: uniq });
      if (this.state.showFavorites) {
        this.setState({ arrShowFavs: uniq });
      }
    }
  }
  removeFromFavs(removeItem = this.state.currentFavorite) {
    console.log("removeFromFavs f " + removeItem);
    this.setState({
      favorites: R.without([removeItem], this.state.favorites),
      arrShowFavs: R.without([removeItem], this.state.favorites)
    });
    this.setState({ currentFavorite: null });
  }

  //this.setState({ arrShowFavs: this.state.favorites });
  edit() {
    console.log("edit f");
    this.setState({ edit: !this.state.edit });
  }
  /* set elected item's children to  'show = true'*/
  updateChildren(id, level) {
    return R.map(
      x => (x.parentId === id ? R.merge(x, { show: true }) : x),
      this.state["items" + level]
    );
  }
  showChildrenLevel(id, level) {
    console.log("showchild id: " + id);
    let nextLevel = level + 1;
    let c = this.updateChildren(id, nextLevel);
    //console.log("ALL children json:  " + JSON.stringify(c));
    this.setState({ ["items" + nextLevel]: c });
  }
  fStyle(show) {
    return show ? "todoitemA" : "hide1A hide2A";
  }
  temp(str) {
    console.log("temp f called " + str);
    if (str === "add") {
      this.addToFavs();
    } else if (str === "remove" && this.state.currentFavorite) {
      this.removeFromFavs();
    }
  }
  favoriteItem(n) {
    console.log("favoriteItem " + n);
    if (this.state.edit) {
      return;
    }
    this.setState({ currentFavorite: n });
  }
  renderFavorites(f, i) {
    const o = R.find(x => x.id === f, this.state.data);
    return (
      <div
        style={{
          textAlign: "left",
          color: "white",
          width: "191",
          margin: "10",
          marginLeft: 20,
          height: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "6px"
        }}
        onClick={() => this.favoriteItem(f)}
        key={i}
      >
        <h4>{o.name}</h4>
        {
          <span
            onClick={() => this.removeFromFavs(f)}
            style={{ cursor: "pointer", marginRight: 20 }}
          >
            <HighLightOff style={{ color: "white" }} />
          </span>
        }
      </div>
    );
  }
  renderAdd() {
    return (
      <span
        onClick={() => this.temp("add")}
        style={{ cursor: "pointer", height: "20px" }}
      >
        <CircleAdd style={{ color: "white" }} />
      </span>
    );
  }
  renderRemove() {
    return (
      <span
        onClick={() => this.temp("remove")}
        style={{ margin: 10, cursor: "pointer" }}
      >
        <Remove style={{ color: "#ffff00" }} />
      </span>
    );
  }

  home() {
    console.log("home");
    this.setState({
      items1: data1,
      items2: data2,
      items3: data3,
      level1Selection: null,
      level2Selection: null,
      level3Selection: null,
      currentSelection: null
    });
  }
  handleToggleFavorites() {
    console.log("handleToggleFavorites f");
    this.setState({ showFavorites: !this.state.showFavorites });
    this.state.arrShowFavs.length
      ? this.setState({ arrShowFavs: [] })
      : this.setState({ arrShowFavs: this.state.favorites });
  }
  renderToggleFavorites() {
    return (
      <span
        onClick={() => this.handleToggleFavorites()}
        style={{ cursor: "pointer", height: "20px", width: "20px" }}
      >
        {this.state.showFavorites ? (
          <ExpandLess style={{ color: "white" }} />
        ) : (
          <ExpandMore style={{ color: "white" }} />
        )}
      </span>
    );
  }
  renderTitleBarFavs() {
    return (
      <div
        style={{
          textAlign: "left",
          width: 180,
          padding: 10,
          marginTop: 20,
          marginLeft: 1,
          color: "white",
          fontWeight: "bold"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <div
            style={{
              alignSelf: "flex-end",
              marginRight: 20
            }}
          >
            <h3>Favorites</h3>
          </div>
          {this.renderAdd()}
          {this.renderToggleFavorites()}
        </div>
        <hr />
      </div>
    );
  }

  renderMainNavHeader() {
    return (
      <div
        style={{
          textAlign: "left",
          width: 180,
          padding: 10,
          marginTop: 20,
          marginLeft: 1,
          color: "white",
          fontWeight: "bold"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <div
            style={{
              alignSelf: "flex-end",
              marginRight: 20
            }}
          >
            <h3>Main nav</h3>
          </div>
          <Home className="" color="white" onClick={this.home} />
        </div>
        <hr />
      </div>
    );
  }
  render() {
    const cssLevel1 = classNames({
      selectedA: this.state.level1Selection
    });
    const cssLevel2 = classNames({
      current: this.state.items2.length !== 1,
      selectedA: this.state.level2Selection,
      levelStartA: this.state.level1Selection,
      levelEndA: this.state.level2Selection
    });
    const cssLevel3 = classNames({
      current: this.state.items3.length !== 1,
      selectedA: this.state.level3Selection,
      levelStartA: this.state.level2Selection,
      levelEndA: this.state.level3Selection
    });
    const cssFavSelected = classNames({
      selectedA: this.state.currentFavorite
    });

    return (
      <div style={{ padding: "10px" }}>
        {this.renderTitleBarFavs()}
        {this.state.arrShowFavs.map((f, i) => this.renderFavorites(f, i))}

        {this.renderMainNavHeader()}
        <div className={cssLevel1}>
          {this.state.items1.map((item1, index) => (
            <Item
              key={item1.id}
              styl={this.fStyle(item1.show)}
              item={item1}
              onclick={this.onclick}
              currentSelection={
                this.state.currentSelection == item1.id ? true : false
              }
            />
          ))}
        </div>
        <div className={cssLevel2}>
          {this.state.items2.map((item2, index) => (
            <Item
              key={item2.id}
              styl={this.fStyle(item2.show)}
              item={item2}
              onclick={this.onclick}
              currentSelection={
                this.state.currentSelection == item2.id ? true : false
              }
            />
          ))}
        </div>
        <div className={cssLevel3}>
          {this.state.items3.map((item3, index) => (
            <Item
              key={item3.id}
              styl={this.fStyle(item3.show)}
              item={item3}
              onclick={this.onclick}
              currentSelection={
                this.state.currentSelection == item3.id ? true : false
              }
            />
          ))}
        </div>
      </div>
    );
  }
}
export default withRouter(NavContainer);
//export default muiThemeable()(NavContainer);
