import { call, put, takeLatest, select } from 'redux-saga/effects'
import {
  getForecast,
  getLocation,
} from './services'
import {
  CHECK_LOCATION,
  UPDATE_LOCATION,
  REFRESH_FORECAST,

  updateForecast,
  updateLocation,
  updateStatus,
  removeForecast,
} from './actions'
import {
  selectForecast,
  selectLocation,
} from './selectors'

function* fetchForecast ({ location }) {
  try {
    const updated = Date.now()
    const oldForecast = yield select(selectForecast(location))
    if (oldForecast && (updated - oldForecast.updated) < 30 * 60 * 1000) {
      return
    }

    yield put(updateStatus('pending'))

    const forecast = yield call(getForecast, location.latitude, location.longitude)

    yield put(updateForecast({
      updated: Date.now(),
      location: location,
      data: forecast,
    }))

    yield put(updateStatus('success'))
  } catch (error) {
    yield put(updateStatus('error'))
  }
}

function* fetchLocation ({ position }) {
  try {
    const oldLocation = yield select(selectLocation)
    if (oldLocation) {
      return
    }

    yield put(updateStatus('pending'))

    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const location = yield call(getLocation, latitude, longitude)
    yield put(updateLocation(location))

    yield put(updateStatus('success'))
  } catch (error) {
    yield put(updateStatus('error'))
  }
}

function* refreshForecast () {
  try {
    const location = yield select(selectLocation)
    if (!location) {
      return
    }

    const forecast = yield select(selectForecast(location))
    if (forecast) {
      yield put(removeForecast(location))
    }

    yield fetchForecast({ location })
  } catch (error) {
  }
}

function* weatherSaga () {
  yield takeLatest(UPDATE_LOCATION, fetchForecast)
  yield takeLatest(CHECK_LOCATION, fetchLocation)
  yield takeLatest(REFRESH_FORECAST, refreshForecast)
}

export default weatherSaga


