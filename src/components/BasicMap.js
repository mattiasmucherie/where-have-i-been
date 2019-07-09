import React, { Component } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps";

const wrapperStyles = {
  width: "100%",
  maxWidth: 1280,
  margin: "0px auto",
};

class BasicMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [
        // "Sweden",
        // "France",
        // "United States",
        "Canada",
        // "Djibouti",
        // "Japan",
        "Australia",
        // "Spain",
        "Portugal",
        "United Kingdom",
        "Italy",
        "Croatia",
        "Switzerland",
        "Austria",
        "Germany",
        // "Finland",
        // "Norway",
        // "Morocco",
        // "Egypt",
        // "Brazil",
        // "Hong Kong",
        // "Mexico",
      ],
      showMap: true,
    };
    this.handleSecondClick = this.handleSecondClick.bind(this);
    this.handleThirdClick = this.handleThirdClick.bind(this);
  }

  handleClick(geography) {
    this.console.log("Geography data: ", geography);
  }

  handleSecondClick() {
    this.setState(state => {
      return { showMap: !state.showMap };
    });
  }

  handleThirdClick() {
    this.setState(state => {
      const countries = [...state.countries, "Iceland"];
      return { countries };
    });
  }

  render() {
    let map = (
      <p style={{ color: "#f9f3ec", textAlign: "center", fontSize: "3rem" }}>
        Your map is empty :(
      </p>
    );
    const { countries, showMap } = this.state;
    if (countries.length !== 0 && showMap) {
      map = (
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-10, 0, 0],
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
        >
          <ZoomableGroup center={[0, 20]} disablePanning>
            <Geographies geography="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/examples/exclude-include-geographies/static/world-50m.json">
              {(geographies, projection) =>
                geographies.map(
                  geography =>
                    countries.indexOf(geography.properties.name) !== -1 && (
                      <Geography
                        key={geography.properties.name}
                        geography={geography}
                        projection={projection}
                        onClick={this.handleClick}
                        style={{
                          default: {
                            fill: "#c06c84",
                            stroke: "#6c5b7b",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                          hover: {
                            fill: "#f9f3ec",
                            stroke: "#f9f3ec",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                          pressed: {
                            fill: "#f9f3ec",
                            stroke: "#f9f3ec",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                        }}
                      />
                    )
                )
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      );
    }
    return (
      <>
        <div style={wrapperStyles}>{map}</div>
        <button onClick={this.handleSecondClick} type="button">
          CLICK ME 2nd{" "}
        </button>
        <button onClick={this.handleThirdClick} type="button">
          CLICK ME 3rd{" "}
        </button>
      </>
    );
  }
}

export default BasicMap;
