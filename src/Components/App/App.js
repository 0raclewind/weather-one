import React, { Component } from 'react';
import update from 'react-addons-update'
import './App.css';
import OpenWeather from '../../util/OpenWeather';
import SearchBar from '../SearchBar/SearchBar';
import DisplayWeather from '../DisplayWeather/DisplayWeather';

// Kelvin to celsius formula C = K - 273.15


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: {},
      location: '',
      error: '',
      fifteenHours: [],
      fiveDay: [],
      units: 'C',
      loading: 1
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.toFarenheit = this.toFarenheit.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.loading = this.loading.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.getWeather();
    }
  }

  handleLocationChange(event) {
    this.setState({location: event.target.value.replace(/,\s/g, ",")});
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        this.setState({location: "?lat=" + lat + "&lon=" + lon});
        this.getWeather();
      },
      // if geolocation not available
      () => {
        this.setState({location: 'dublin'});
        this.getWeather();
      }
    )};
  }

  async getWeather() {
    if (this.state.location === "") {
      this.setState({error: 'Please enter something'});
    } else {
      await OpenWeather.getWeather(this.state.location).then(weather => {
        const responseCode = weather.cod.toString();
        if (responseCode === "404" || responseCode === "400") {
          this.setState({error: "City not found!", location: ''});
        } else if (weather.cod.toString() === "200") {
          this.setState({error: '', weather, units: "C"});
        } else {
          this.setState({error: 'Server error'});
        }
      });
      if (!this.state.error) {
        await OpenWeather.getForecast(this.state.location).then(forecast => {
          this.setState({ fiveDay: forecast.days, fifteenHours: forecast.fifteenHours , loading: 0 });
        });
      }
    }
  }

  toFarenheit() {
    if (this.state.units === "C") {
      let f = Math.round(this.state.weather.temp * 1.8 + 32);
      const newWeather = update(this.state.weather, {temp: {$set: f}});
      this.setState({weather: newWeather, units: 'F'});

      const fiveDay = this.state.fiveDay.map(item => {
        f = Math.round(item.temp * 1.8 + 32);
        return update(item, {temp: {$set: f}});
      });
      const fifteenHours = this.state.fifteenHours.map(item => {
        f = Math.round(item.temp * 1.8 + 32);
        return update(item, {temp: {$set: f}})
      });
      this.setState({fifteenHours, fiveDay});
    } else {
      let c = Math.round((this.state.weather.temp - 32) / 1.8);
      const newWeather = update(this.state.weather, {temp: {$set: c}});
      this.setState({weather: newWeather, units: 'C'});

      const fiveDay = this.state.fiveDay.map(item => {
        c = Math.round((item.temp - 32) / 1.8);
        return update(item, {temp: {$set: c}});
      });
      const fifteenHours = this.state.fifteenHours.map(item => {
        c = Math.round((item.temp - 32) / 1.8);
        return update(item, {temp: {$set: c}});
      });
      this.setState({fifteenHours, fiveDay});
    }
  }

  loading() {
    if (this.state.loading) {
      return (
        <div className="sk-circle">
          <div className="sk-circle1 sk-child"></div>
          <div className="sk-circle2 sk-child"></div>
          <div className="sk-circle3 sk-child"></div>
          <div className="sk-circle4 sk-child"></div>
          <div className="sk-circle5 sk-child"></div>
          <div className="sk-circle6 sk-child"></div>
          <div className="sk-circle7 sk-child"></div>
          <div className="sk-circle8 sk-child"></div>
          <div className="sk-circle9 sk-child"></div>
          <div className="sk-circle10 sk-child"></div>
          <div className="sk-circle11 sk-child"></div>
          <div className="sk-circle12 sk-child"></div>
        </div>
      );
    }
    return (
      <DisplayWeather
      fiveDay={this.state.fiveDay}
      fifteenHours={this.state.fifteenHours}
      weather={this.state.weather}
      units={this.state.units}
      toFarenheit={this.toFarenheit}
      weatherTemp={this.state.weatherTemp}
      forecastTemp={this.state.forecastTemp}
      />
    );
  }

  render() {
    return (
      <div className="App">
        <div id="logo"></div>
        <SearchBar
          getWeather={this.getWeather}
          onLocationChange={this.handleLocationChange}
          error={this.state.error}
          handleKeyPress={this.handleKeyPress}
        />
        {this.loading()}
      </div>
    );
  }
}

export default App;
