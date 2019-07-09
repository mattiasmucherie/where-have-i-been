import React from "react";

class CountryInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedValues: ["Sweden"],
      searchResultValues: [],
      inputData: [
        "Sweden",
        "France",
        "United States",
        "Canada",
        "Djibouti",
        "Japan",
        "Australia",
        "Spain",
        "Portugal",
        "United Kingdom",
        "Italy",
        "Croatia",
        "Switzerland",
        "Austria",
        "Germany",
        "Finland",
        "Norway",
        "Morocco",
        "Egypt",
        "Brazil",
        "Hong Kong",
        "Mexico",
      ],
    };
    this.checkBox = this.checkBox.bind(this);
  }

  checkBox(value, condition) {
    const { checkedValues } = this.state;
    if (condition) {
      checkedValues.push(value);
    } else {
      const index = checkedValues.indexOf(value);
      checkedValues.splice(index, 1);
    }

    this.props.callbackfromParent("okii"); // eslint-disable-line

    this.setState({ checkedValues });
  }

  filterResult(e) {
    const { inputData } = this.state;
    if (e.target.value.length !== 0) {
      const inputValue = e.target.value.toLowerCase();
      const resultSearch = inputData.filter(data => {
        const dataLower = data.toLowerCase();
        return dataLower.indexOf(inputValue) > -1;
      });
      this.setState({ searchResultValues: resultSearch });
    } else {
      this.setState({ searchResultValues: [] });
    }
  }

  showSearchResult() {
    const { searchResultValues, checkedValues } = this.state;
    const result =
      searchResultValues.length !== 0
        ? searchResultValues.map(data => (
            <div key={data}>
              {" "}
              <p>{data}</p>
              <input
                type="checkbox"
                value={data}
                checked={checkedValues.includes(data)}
                onChange={e => {
                  this.checkBox(data, e.target.checked);
                }}
              />
            </div>
          ))
        : null;
    return result;
  }

  removeCheckValues(value) {
    this.checkBox(value, false);
  }

  showCheckedValues() {
    const { checkedValues } = this.state;
    const result =
      checkedValues.length !== 0
        ? checkedValues.map(data => (
            <div key={data}>
              <button
                value={data}
                onClick={e => this.removeCheckValues(e.target.value)}
                type="button"
              >
                x
              </button>
              <p>{data}</p>
            </div>
          ))
        : null;
    return result;
  }

  render() {
    return (
      <div>
        <div>{this.showCheckedValues()}</div>
        <input
          type="text"
          name="Search"
          placeholder="Search Data"
          className="input-box"
          onChange={e => this.filterResult(e)}
        />
        <div>{this.showSearchResult()}</div>
      </div>
    );
  }
}
export default CountryInput;
