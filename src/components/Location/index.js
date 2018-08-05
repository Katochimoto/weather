import PropTypes from 'prop-types'
import Clock from '../Clock'
import Icon from '../Icon'
import SelectLoaction from '../SelectLoaction'

import style from './index.css'

const Location = ({
  location,
  handleChange,
  handleRefresh,
}) => {
  const name = location && location.name || 'Current'
  const utcOffset = location && location.utc_offset

  return (
    <section className={style.location}>
      <header className={style.locationHeader}>
        <h1 className={style.locationHead}>
          {name}
          <button
            className={style.locationRefresh}
            onClick={handleRefresh}
          >
            <Icon name="wi-refresh" size="xl" />
          </button>
        </h1>
        <SelectLoaction
          onChange={handleChange}
        />
      </header>

      <div className={style.locationTime}>
        <Clock
          format={'M/D h:mm A'}
          ticking={true}
          interval={1000 * 60}
          utcOffset={utcOffset}
        />
      </div>
    </section>
  )
}

Location.propTypes = {
  location: PropTypes.object,
  handleChange: PropTypes.func,
  handleRefresh: PropTypes.func,
}

export default Location

