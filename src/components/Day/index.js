import classnames from 'classnames'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import Clock from '../Clock'
import Temperature from '../../containers/Temperature'
import style from './index.css'

export default function Day ({
  data,
  location,
}) {
  return (
    <div
      className={style.day}
    >
      <div
        className={classnames({
          [ style.dayHeader ]: true,
          [ style.dayItem ]: true,
        })}
      >
        <div>
          <Clock
            format={'ddd'}
            date={data.time}
            utcOffset={location.utc_offset}
          />
        </div>
        <div>
          <Clock
            format={'M/D'}
            date={data.time}
            utcOffset={location.utc_offset}
          />
        </div>
      </div>
      <div className={style.dayItem}>
        <Icon name={data.icon} size="l" />
      </div>
      <div className={style.dayItem} title="Humidity">
        {data.humidity}%
      </div>
      <div className={style.dayItem} title="Maximum temperature">
        <Temperature value={data.temperatureMax} />
      </div>
      <div className={style.dayItem} title="Minimum temperature">
        <Temperature value={data.temperatureMin} />
      </div>
    </div>
  )
}

Day.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
}

Day.defaultProps = {}
