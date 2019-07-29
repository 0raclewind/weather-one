import React, { Component } from 'react';
import './ForecastDay.css';


class ForecastDay extends Component {
  render() {
    return (
      <div className="forecastCard">
        <div className="weekDay">{this.props.forecast.weekDay}</div>
        <div className="hours">{this.props.forecast.hours}</div>
        <div>{this.props.forecast.temp}&deg;{this.props.units}</div>
        <img src={this.props.forecast.icon} alt="Not found" />
        <div>{this.props.forecast.main}</div>
      </div>
    );
  }
}

export default ForecastDay;
