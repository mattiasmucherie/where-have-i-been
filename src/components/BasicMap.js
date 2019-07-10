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
  // eslint-disable-next-line
  handleClick(geography) {
    console.log("Geography data: ", geography); // eslint-disable-line
  }

  render() {
    let map = (
      <p style={{ color: "#f9f3ec", textAlign: "center", fontSize: "3rem" }}>
        No country selected :(
      </p>
    );
    const { listOfCountries } = this.props;
    if (listOfCountries && listOfCountries.length !== 0) {
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
                    listOfCountries.indexOf(geography.properties.name) !==
                      -1 && (
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
      </>
    );
  }
}

export default BasicMap;
