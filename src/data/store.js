import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
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



// import { ReduceStore } from 'flux/utils'
// import { isFSA } from 'flux-standard-action'
// import dispatcher from './dispatcher'

// class Weather extends ReduceStore {
//   getInitialState () {
//     return {
//       location: {
//         latitude: 0,
//         longitude: 0,
//       },
//       settings: {
//         scale: 'celsius', // celsius, fahrenheit
//         days: 10,
//         hourly: 'humidity', // humidity, temperature, wind
//       },
//       weather: [
//         {
//           updated: Date.now(),
//           location: {
//             latitude: 0,
//             longitude: 0,
//           },
//           forecast: {

//           },
//         }
//       ],
//     }
//   }

//   hasAccess () {
//     const { access } = this.getState()
//     return access === 'private'
//   }

//   reduce (state, action) {
//     if (!isFSA(action)) {
//       return state
//     }

//     const {
//       error,
//       payload,
//       type,
//     } = action

//     switch (type) {
//       case 'UPDATE_BIO':
//         return {
//           ...state,
//           ...payload,
//           userpic: photo,
//           access: 'private',
//         }
//       default:
//         return state
//     }
//   }
// }

// export default new Weather(dispatcher)
