const request = require("request")

const forecast = (lat, long, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=2829cbf99d239b25172c2eade962bbcf&query=' + lat + ',' + long + '&units=f'

  request({url, json: true}, (error,{ body }) => {
    if (error) { 
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      const icon = body.current.weather_icons[0]
      const temp = body.current.temperature
      const feelsLike = body.current.feelslike
      const summary = body.current.weather_descriptions[0]
      callback(undefined, `${summary}. It is currently ${temp} degrees, but it feels like ${feelsLike}.`, icon)
    }
  })
}

module.exports = forecast
