import PropTypes from 'prop-types'
import Hour from '../Hour'
import Icon from '../Icon'
import style from './index.css'

export default function Hourly ({
  location,
  hourly,
  settings,
  handleChangeHourly,
}) {
  if (!hourly || !location) {
    return null
  }

  const hours = hourly.data.map(item => (
    <Hour
      key={item.time}
      data={item}
      location={location}
      settings={settings}
    />
  ))

  return (
    <section className={style.hourly}>
      <div className={style.hourlySettings}>
        <button
          className={style.hourlySettingsButton}
          disabled={settings.hourly === 'temperature'}
          onClick={() => handleChangeHourly('temperature')}
        >
          <Icon name="wi-thermometer" size="s" />
        </button>
        <button
          className={style.hourlySettingsButton}
          disabled={settings.hourly === 'humidity'}
          onClick={() => handleChangeHourly('humidity')}
        >
          <Icon name="wi-humidity" size="s" />
        </button>
        <button
          className={style.hourlySettingsButton}
          disabled={settings.hourly === 'wind'}
          onClick={() => handleChangeHourly('wind')}
        >
          <Icon name="wi-strong-wind" size="s" />
        </button>
      </div>
      <div className={style.hourlyWrap}>
        {hours}
      </div>
    </section>
  )
}

Hourly.propTypes = {
  location: PropTypes.object,
  hourly: PropTypes.object,
  settings: PropTypes.object,
  handleChangeHourly: PropTypes.func,
}
