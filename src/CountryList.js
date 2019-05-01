import React from 'react';
import './CountryList.css';

export default class CountryList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      countries: [],
      query: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    this.setState({query: e.target.value || ''});
  }

  componentDidMount() {
    this.setState({isLoading: true});
    fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(result => {
      this.setState({
        countries: result,
        isLoading: false
      });
    });
  }

  render() {
    const { isLoading, countries, query } = this.state;
    let filteredCountries = [];
    filteredCountries = countries.filter((country) => {
      return country.name.toLowerCase().includes(query.toLowerCase())
    });

    if (isLoading) {
      return <div className="center">Country list is loading...</div>
    } else {
      return (
        <div className="country-list-container">
          <CountrySearch handleSearch={this.handleSearch} />
          <p><small>{ filteredCountries.length } countries found...</small></p>
          {
            filteredCountries.map((country) => {
              return <Country data={country} key={country.name} />;
            })
          }
        </div>
      );
    }
  }

}

class Country extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      country: {}
    };
  }

  componentDidMount() {
    this.setState({
      country: this.props.data
    });
  }

  render() {
    const { country } = this.state;
    return (
      <div className="country">
        <p className="country-name">
          {country.name}
        </p>
        <small className="country-capital">{country.capital}</small>
        <img src={country.flag} width="auto" height="100" alt={`${country.name}'s flag`} />
      </div>
    );
  }
}


class CountrySearch extends React.Component {
  render() {
    return (
      <div className="country-search center">
        <input type="text" placeholder="Search country..." onChange={this.props.handleSearch} />
      </div>
    );
  }
}
