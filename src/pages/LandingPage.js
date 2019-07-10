import React from "react";
import BasicMap from "../components/BasicMap";
import CountryInput from "../components/CountryInput";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMap: false,
      listOfCountries: [],
    };
    this.showMapOrList = this.showMapOrList.bind(this);
  }

  showMapOrList() {
    this.setState(state => {
      return { showMap: !state.showMap };
    });
  }

  render() {
    const { listOfCountries, showMap } = this.state;
    return (
      <>
        <button type="button" onClick={this.showMapOrList}>
          {showMap ? `Choose countries` : `Show Map`}
        </button>
        {showMap ? (
          <BasicMap listOfCountries={listOfCountries} />
        ) : (
          <CountryInput selectedCountries={listOfCountries} />
        )}
      </>
    );
  }
}

export default LandingPage;
