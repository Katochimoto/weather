import { connect } from 'react-redux'
import Component from '../components/Weather'
import { selectStatus } from '../data/selectors'

const mapStateToProps = state => ({
  status: selectStatus(state)
})

const mapDispatchToProps = () => ({})

const Location = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)

export default Location
