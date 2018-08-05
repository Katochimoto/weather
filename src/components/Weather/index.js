import Location from '../../containers/Location'
import Currently from '../../containers/Currently'
import Hourly from '../../containers/Hourly'
import Forecast from '../../containers/Forecast'
import Icon from '../Icon'

// https://source.unsplash.com/1600x900/?

import style from './index.css'

export default function Weather ({
  status,
}) {

  return (
    <div className={style.weather}>
      <div className={style.weatherContent}>
        <Location />
        {status === 'pending' ? <Icon name="loader" size="xxl" className={style.weatherLoader} /> : null}
        {status !== 'pending' ? <Currently className={style.weatherCurrently} /> : null}
        {status !== 'pending' ? (
          <div className={style.weatherExtra}>
            <Hourly />
            <Forecast />
          </div>
        ) : null}
      </div>
    </div>
  );
}
