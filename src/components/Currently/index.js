import classnames from 'classnames'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import style from './index.css'
import Temperature from '../../containers/Temperature'

export default function Currently ({
  className,
  currently,
  location,
  settings,
  handleChangeScale,
}) {
  if (!currently || !location) {
    return null
  }

  return (
    <section className={classnames({
      [ style.currently ]: true,
      [ className ]: Boolean(className),
    })}>
      <div className={style.currentlySummary}>
        <Icon name={currently.icon} size="xl" />
        {currently.summary}
      </div>
      <div className={style.currentlyGap}>
        Feels like <Temperature value={currently.apparentTemperature} />
      </div>
      <div className={style.currentlyTemperature}>
        <Temperature value={currently.temperature} />
        <div className={style.currentlyScale}>
          <button
            className={style.currentlyScaleItem}
            disabled={settings.scale === 'celsius'}
            onClick={() => handleChangeScale('celsius')}
          >
            <Icon name="wi-celsius" size="xxl" />
          </button>
          <button
            className={style.currentlyScaleItem}
            disabled={settings.scale === 'fahrenheit'}
            onClick={() => handleChangeScale('fahrenheit')}
          >
            <Icon name="wi-fahrenheit" size="xxl" />
          </button>
        </div>
      </div>
    </section>
  )
}

Currently.propTypes = {
  className: PropTypes.string,
  currently: PropTypes.object,
  location: PropTypes.object,
  settings: PropTypes.object,
  handleChangeScale: PropTypes.func,
}

Currently.defaultProps = {}
