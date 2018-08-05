import { connect } from 'react-redux'
import { selectSettings } from '../data/selectors'

const mapStateToProps = state => {
  const settings = selectSettings(state)
  return { settings, }
}

const mapDispatchToProps = (dispatch) => ({})

function Component ({
  settings,
  value,
}) {
  if (settings.scale === 'celsius') {
    value = Math.round((value -32) * 5 / 9)
  }

  return (
    `${value}°`
  )
}

const Temperature = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)

export default Temperature
