import React from "react";
import listOfCountries from "../assets/listOfCountries";
import "./CountryInput.scss";

class CountryInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedValues: [],
      searchResultValues: [],
      inputData: listOfCountries,
    };
    this.checkBox = this.checkBox.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.countryInput = React.createRef();
  }

  componentDidMount() {
    this.setState((state, props) => {
      return { checkedValues: props.selectedCountries };
    });
    this.countryInput.current.focus();
  }

  checkBox(value, condition) {
    const { checkedValues } = this.state;
    if (condition) {
      checkedValues.push(value);
    } else {
      const index = checkedValues.indexOf(value);
      checkedValues.splice(index, 1);
    }

    this.setState({ checkedValues });
    this.countryInput.current.focus();
    this.countryInput.current.value = "";
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
  // eslint-disable-next-line
  clickHandler(e) {
    let name;
    const { checkedValues } = this.state;
    try {
      name = e.target.querySelector("p").innerHTML;
    } catch (err) {
      name = e.target.innerHTML;
    }
    const checked = checkedValues.includes(name);
    this.checkBox(name, !checked);
  }

  showSearchResult() {
    const { searchResultValues, checkedValues } = this.state;
    const result =
      searchResultValues.length !== 0
        ? searchResultValues.map(data => (
            <div
              role="button"
              tabIndex={0}
              key={data}
              className="result-div"
              onClick={this.clickHandler}
              onKeyPress={e => {
                this.clickHandler(e);
              }}
            >
              <input
                className="result-checkbox"
                type="checkbox"
                value={data}
                checked={checkedValues.includes(data)}
                onChange={e => {
                  this.checkBox(data, e.target.checked);
                }}
              />
              <p className="result-text">{data}</p>
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
            <div key={data} className="check-value-div">
              <button
                value={data}
                onClick={e => this.removeCheckValues(e.target.value)}
                type="button"
                className="check-value-button"
              >
                {String.fromCharCode(215)}
              </button>
              <p className="check-value-text">{data}</p>
            </div>
          ))
        : null;
    return result;
  }

  render() {
    return (
      <div className="container">
        <div className="check-value-container">{this.showCheckedValues()}</div>
        <input
          type="text"
          ref={this.countryInput}
          name="Search"
          autoComplete="off"
          placeholder="Search Country"
          className="input-box"
          onChange={e => this.filterResult(e)}
        />
        <div className="search-result-container">{this.showSearchResult()}</div>
      </div>
    );
  }
}
export default CountryInput;
