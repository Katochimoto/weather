import PropTypes from 'prop-types'
import Day from '../Day'
import style from './index.css'

export default function Forecast ({
  location,
  daily,
  settings,
  handleForecastDays,
}) {
  if (!daily || !location) {
    return null
  }

  const days = daily.data.slice(0, settings.days).map(item => (
    <Day
      key={item.time}
      data={item}
      location={location}
    />
  ))

  return (
    <section className={style.forecast}>
      <div className={style.forecastDays}>
        {days}
      </div>
      <div className={style.forecastSettings}>
        <button
          className={style.forecastSettingsButton}
          disabled={settings.days === 4}
          onClick={() => handleForecastDays(4)}
        >
          4 day
        </button>
        <button
          className={style.forecastSettingsButton}
          disabled={settings.days === 8}
          onClick={() => handleForecastDays(8)}
        >
          8 day
        </button>
      </div>
    </section>
  )
}

Forecast.propTypes = {
  location: PropTypes.object,
  daily: PropTypes.object,
  settings: PropTypes.object,
  handleForecastDays: PropTypes.func,
}

Forecast.defaultProps = {}
