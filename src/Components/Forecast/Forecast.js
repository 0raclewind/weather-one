import React, { Component } from 'react';
import './Forecast.css';
import ForecastDay from '../ForecastDay/ForecastDay';

class Forecast extends Component {
  componentDidMount() {
    document.getElementById("days").style.display = 'none';
  }

  fiveDay() {
    document.getElementById("hours").style.display = 'none';
    document.getElementById("days").style.display = 'block';
    document.getElementById('fiveDay').classList.add("active");
    document.getElementById('fifteenHours').classList.add("inactive");
    document.getElementById('fifteenHours').classList.remove("active");
    document.getElementById('fiveDay').classList.remove("inactive");
  }

  fifteenHours() {
    document.getElementById("hours").style.display = 'block';
    document.getElementById("days").style.display = 'none';
    document.getElementById('fifteenHours').classList.add("active");
    document.getElementById('fifteenHours').classList.remove("inactive");
    document.getElementById('fiveDay').classList.add("inactive");
    document.getElementById('fiveDay').classList.remove("active");
  }

  render() {
    return (
      <div className="forecast">
        <div className="row">
          <div className="col-xs-6 active fifteenHours" id="fifteenHours" onClick={this.fifteenHours}>15 Hour</div>
          <div className="col-xs-6 inactive fiveDay" id="fiveDay" onClick={this.fiveDay}>5 Day</div>
        </div>
        <div className="row">
          <div id="hours">
          {this.props.fifteenHours.map(item => {
            return <ForecastDay units={this.props.units} key={item.id} forecast={item} />
          })}
          </div>
          <div id="days">
          {this.props.fiveDay.map(item => {
            return <ForecastDay units={this.props.units} key={item.id} forecast={item} />
          })}
          </div>
        </div>
      </div>
    );
  }
}

export default Forecast;
