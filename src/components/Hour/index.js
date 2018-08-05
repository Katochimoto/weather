import classnames from 'classnames'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import Clock from '../Clock'
import Temperature from '../../containers/Temperature'
import style from './index.css'

export default function Hour ({
  location,
  data,
  settings,
}) {
  let info = null
  let ico = null

  switch (settings.hourly) {
  case 'humidity':
    info = `${data.humidity}%`
    ico = <Icon name={data.icon} size="m" />
    break
  case 'temperature':
    info = <Temperature value={data.temperature} />
    ico = <Icon name={data.icon} size="m" />
    break
  case 'wind':
    info = `${data.windSpeed}`
    ico = <Icon name="wi-wind-deg" size="m" icoStyle={{
      transform: `rotate(${data.windBearing}deg)`
    }} />
    break
  }

  return (
    <div className={classnames({
      [ style.hour ]: true,
      [ style.hourDay ]: new Date(data.time).getHours() === 0,
    })}>
      <div>
        <Clock
          format={'h A'}
          date={data.time}
          utcOffset={location.utc_offset}
        />
      </div>
      <div>{ico}</div>
      <div>{info}</div>
    </div>
  )
}

Hour.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
  settings: PropTypes.object,
}

Hour.defaultProps = {}
