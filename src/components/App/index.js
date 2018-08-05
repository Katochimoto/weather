import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import Weather from '../../containers/Weather'
import NoMatch from '../NoMatch'

import style from './index.css'

export default function App () {
  return (
    <Router>
      <div className={style.app}>
        <Switch>
          <Route exact path="/" component={Weather} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  )
}
