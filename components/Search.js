import React from "react";
import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";

export default class Home extends React.Component {

constructor (props) {
    super(props)
        this.state = {
            city: 'Grenoble',
            weather: null,
            temperature: null,
            pressure: null,
            humidity: null,
            uv: null,
            temperatureMax: null,
            temperatureMin: null,
            wind: null,
        }
        this.fetchWeather()
    }

setCity (city) {
    this.setState({
        city: city
    })
}

fetchWeather() {
      fetch('https://api.openweathermap.org/data/2.5/weather?q=Grenoble&appid=1e2e3fcaa8ae3d3f7a0d9c62f4283cde')
      .then(response => {return response.json();})
      .then(responseData => {return responseData;})
      .then(data => {this.setState({
          weather: data['weather'][0]['main'],
          // calcule den celcius
          temperature: Math.round(Number(data['main']['temp']) - 273),
          pressure: data['main']['pressure'],
          humidity: data['main']['humidity'],
          uv: data['sys']['type'],
          temperatureMax: Math.round(Number(data['main']['temp_max'])- 273),
          temperatureMin: Math.round(Number(data['main']['temp_min'])- 273),
          wind: data['wind']['speed'],
        });})
  }

  displayImages() {
    if (this.state.weather === 'Clouds') {
        return <Image style={style.weatherImage} source={require('../assets/cloudsIco.png')} />
      }
    if (this.state.weather === 'Rain') {
        return <Image style={style.weatherImage} source={require('../assets/rainIco.png')} />
      }
    if (this.state.weather === 'Clear') {
        return <Image style={style.weatherImage} source={require('../assets/sunnyIco.png')} />
      }
    if (this.state.weather === 'Thunderstorm') {
        return <Image style={style.weatherImage} source={require('../assets/thunderIco.png')} />
      }
    if (this.state.weather === 'Snow') {
        return <Image style={style.weatherImage} source={require('../assets/snowIco.png')} />
      }
}

translateWeather() {
    if (this.state.weather === 'Clouds') {
        return <Text style={{ fontSize: 24, margin: 20 }}>Nuageux</Text>
      }
    if (this.state.weather === 'Rain') {
        return <Text style={{ fontSize: 24, margin: 20 }}>Pluie</Text>
      }
    if (this.state.weather === 'Clear') {
        return <Text style={{ fontSize: 24, margin: 20 }}>Temps clair</Text>
      }
    if (this.state.weather === 'Thunderstorm') {
        return <Text style={{ fontSize: 24, margin: 20 }}>Orageux</Text>
      }
    if (this.state.weather === 'Snow') {
        return <Text style={{ fontSize: 24, margin: 20 }}>Neigeux</Text>
      }
}

render () {
        return(
            <View style={style.view}>

                <View style={style.weatherResults}>

                    <Text style={{ fontSize: 20 }}>Météo à Grenoble</Text>
                    {this.translateWeather()}
                    {this.displayImages()}
                    <Text style={{ fontSize: 20 }}>Température : {this.state.temperature} °C </Text>
                    <Text style={{ fontSize: 20 , color: "#C80815" }}>Température Min : {this.state.temperatureMin}°C</Text>
                    <Text style={{ fontSize: 20 , color: "#9ACD32" }}>Température Max: {this.state.temperatureMax} °C</Text>
                    <Text style={{ fontSize: 20 }}>Pression : {this.state.pressure} hPa</Text>
                    <Text style={{ fontSize: 20 }}>Humidité : {this.state.humidity} %</Text>
                    <Text style={{ fontSize: 20 }}>UV : {this.state.uv}</Text>
                    <Text style={{ fontSize: 20 }}>Vent : {this.state.wind}km/h</Text>
                </View>

            </View>
        )
    }
}

const style = StyleSheet.create({
    view: {
        margin: 20,
    },
    weatherResults: {
        alignItems: 'center',
      },
    weatherImage: {
        width: 150,
        height: 100,
        alignSelf: 'center',
      },
})
