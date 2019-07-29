import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <div className="Search row">
          <input id="searchInput" className="text-center" onChange={this.props.onLocationChange} onKeyPress={this.props.handleKeyPress} placeholder="Enter location"></input>
          <div className="glyphicon glyphicon-search button pull-right" onClick={this.props.getWeather}></div>
        </div>
        <div className="error">{this.props.error}</div>
      </div>
    );
  }
}

export default SearchBar;
