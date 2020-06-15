const request = require('request')
const fetch = require('node-fetch')

const geocode = (address, callback) => {
  //sends custom event to New Relic
  const insightsBody = {
    eventType: 'addressCheck',
    address
  }
  fetch('https://insights-collector.newrelic.com/v1/accounts/2478897/events', {
    method: 'post',
    body:    JSON.stringify(insightsBody),
    headers: { 'X-Insert-Key': 'NRII-_16lcfUCNXyYhrSuOBCkLabQ5yukUg4u',
               'Content-Type': 'application/json',
               'Content-Encoding' : 'gzip'
               },
    
}).then(res => res.json())
  .then(json => console.log(json));

  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + ' .json?access_token=pk.eyJ1IjoiamFja3BhdWxjb2xsaW5zIiwiYSI6ImNrOTY0dWU2dDBoZWczZnAyOTNlN25ueTAifQ.q6OMrlkluFoMAsCipYiX3w&limit=1'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode