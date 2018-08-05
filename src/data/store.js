import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { offline } from '@redux-offline/redux-offline'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'
import reducers from './reducers'
import sagas from './sagas'

const preloadedState = {
  location: null,
  status: '',
  settings: {
    scale: 'fahrenheit', // celsius, fahrenheit
    days: 8,
    hourly: 'humidity', // humidity, temperature, wind
  },
  forecast: [],
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  preloadedState,
  compose(
    applyMiddleware(sagaMiddleware),
    offline(offlineConfig)
  )
)

sagaMiddleware.run(sagas)

export default store
