import axios from 'axios'
import cloneDeepWith from 'lodash/cloneDeepWith'


// https://console.developers.google.com/apis/credentials?project=weather-212312

// https://developers.google.com/maps/documentation/geocoding/intro
// https://maps.googleapis.com/maps/api/geocode/json?address=Moscow


// https://developers.google.com/places/web-service/autocomplete
// https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Mosc&key=AIzaSyA_2l1_143MCOcHGMKab_amynEyYJQEFYw
// https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=(cities)&language=pt_BR&key=YOUR_API_KEY

const darksky = axios.create({
  baseURL: '/api',
  timeout: 2500,
})

const icons = {
  'clear-day': 'wi-day-sunny',
  'clear-night': 'wi-night-clear',
  'rain': 'wi-rain',
  'snow': 'wi-snow',
  'sleet': 'wi-sleet',
  'wind': 'wi-windy',
  'fog': 'wi-fog',
  'cloudy': 'wi-cloudy',
  'partly-cloudy-day': 'wi-day-cloudy',
  'partly-cloudy-night': 'wi-night-alt-cloudy',
  'hail': 'wi-hail',
  'thunderstorm': 'wi-thunderstorm',
  'tornado': 'wi-tornado',
}

export function getForecast (latitude, longitude) {
  return new Promise((resolve, reject) => {
    darksky.get(`/${latitude},${longitude}`)
      .then(({ data }) => {
        data = cloneDeepWith(data, (value, name) => {
          if (name === 'icon') {
            return icons[value] || value
          } else if (
            name === 'temperature' ||
            name === 'temperatureMax' ||
            name === 'temperatureMin' ||
            name === 'apparentTemperature' ||
            name === 'windSpeed'
          ) {
            return Math.round(value)
          } else if (name === 'time') {
            return value * 1000
          } else if (name === 'humidity') {
            return Math.round(value * 100)
          }
        })

        resolve(data)
      })
      .catch(() => {
        reject()
      })
  })
}

export function getLocation (latitude, longitude) {
  return new Promise((resolve, reject) => {
    const geocoder = new window.google.maps.Geocoder()
    const latlng = {lat: latitude, lng: longitude};

    geocoder.geocode({ location: latlng }, function(results, status) {
      if (status !== 'OK' || !results[0]) {
        return reject()
      }

      const location = results.find(item => item.types.indexOf('locality') !== -1)
      if (!location) {
        return reject()
      }

      const placesService = new window.google.maps.places.PlacesService(document.createElement('div'))

      placesService.getDetails({
        placeId: location.place_id
      }, (place, status) => {
        if (status !== 'OK') {
          return reject()
        }

        resolve(new WeatherLocation(place))
      })
    });
  })
}

export function WeatherLocation (place) {
  return {
    name: place.name,
    formatted_address: place.formatted_address,
    utc_offset: place.utc_offset,
    place_id: place.place_id,
    latitude: place.geometry.location.lat(),
    longitude: place.geometry.location.lng(),
  }
}
