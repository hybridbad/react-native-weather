import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { API_KEY } from './utils/WeatherAPIKey';
import Weather from './components/Weather';

export default class App extends React.Component {

    state = {
      isLoading: true,
      temperature: 0,
      weatherCondition: null,
      error: null
    };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error getting weather data'
        });
        console.log(error)
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `https://samples.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({
          temperature: (json.main.temp - 273.15).toFixed(2),
          weatherCondition: json.weather[0].main,
          isLoading: false,
        })
        
      });
  }

  render() {
    const { isLoading, weatherCondition, temperature } = this.state;

    return (
      <View style={styles.container}>
        {
          isLoading ? <Text>Fetching the data</Text> : <Weather weather={weatherCondition} temperature={temperature} />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});