import React from 'react';
import './DisplayWeather.css';
import Forecast from '../Forecast/Forecast';

class DisplayWeather extends React.Component {
  componentDidMount() {
    // wind direction arrow control
    document.getElementById('arrow').style.transform = "rotate(" + (this.props.weather.windDeg + 180) + "deg)";
  }

  componentDidUpdate() {
    // wind direction arrow control
    document.getElementById('arrow').style.transform = "rotate(" + (this.props.weather.windDeg + 180) + "deg)";
  }

  convertTo() {
    if (this.props.units === "C") {
      return "F";
    } else {
      return "C";
    }
  }

  render() {
    return (
      <div className="col-sm-4 DisplayWeather container">
        <div className="cityName">{this.props.weather.name}</div>
        <div className="temperature row">
          <div className="col-xs-2 glyphicon glyphicon-refresh" onClick={this.props.toFarenheit} ><span className="unitsTo">{this.convertTo()}</span></div>
          <div className="col-xs-4 temp">
            <div>{this.props.weather.temp}&deg;{this.props.units}</div>
          </div>
          <div className="col-xs-4 icon">
            <img src={this.props.weather.icon} alt="No icon" />
            <p className="main">{this.props.weather.main}</p>
          </div>
        </div>
        <div className="row" >
          <div className="sun col-xs-6">
            <div className="name">Sun</div>
            <div className="row">
              <div className="col-xs-6">
                <p><b>Sunrise</b><br />{this.props.weather.sunrise}</p>
              </div>
              <div className="col-xs-6">
                <p><b>Sunset</b><br />{this.props.weather.sunset}</p>
              </div>
            </div>
          </div>
          <div className="wind col-xs-6">
            <div className="name">Wind</div>
            <div className="row">
              <div className="col-xs-6 windDir">
                <div id="arrow">
                </div>
              </div>
              <div className="col-xs-6 windSpeed">
                <p><b>Speed</b><br />{this.props.weather.windSpeed}m/s</p>
              </div>
            </div>
          </div>
        </div>
        <Forecast
          fiveDay={this.props.fiveDay}
          fifteenHours={this.props.fifteenHours}
          forecastTemp={this.props.forecastTemp}
          units={this.props.units}
        />
        <div className="text-center footer">
          handbuilt by<a href="https://0raclewind.github.io/"
            target="_blank" rel="noopener noreferrer"><span className="valdo"><b>Valdo</b></span></a>with
          <img src={require('./coffee.png')} height="16px" alt="No coffee" />
          and powered by
          <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">
            <img src={require('./OpenWeatherMap.svg')} height="10px" alt="No OpenWeatherMap" />
          </a>&copy; 2022
        </div>
      </div>
    );
  }
}

export default DisplayWeather;
