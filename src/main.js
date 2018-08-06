import './sprite'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './data/store'
import { checkLocation } from './data/actions'

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'))

window.addEventListener('load', () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition(position => {
      store.dispatch(checkLocation(position))
    }, () => {}, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    })
  }
})

// @if NODE_ENV='production'
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/weather/weather-sw.js', {
    scope: '/weather/'
  })
}
// @endif
