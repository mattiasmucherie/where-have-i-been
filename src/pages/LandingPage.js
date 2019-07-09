import React from "react";
import BasicMap from "../components/BasicMap";
import CountryInput from "../components/CountryInput";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMap: false,
    };
    this.myCallback = this.myCallback.bind(this);
  }

  myCallback(value) {
    console.log(value);
    this.setState(state => {
      return {
        showMap: !state.showMap,
      };
    });
  }

  render() {
    return (
      <>
        <BasicMap />
        <CountryInput callbackfromParent={this.myCallback} />
      </>
    );
  }
}

export default LandingPage;
