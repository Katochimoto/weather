import React from 'react'
import Icon from '../Icon'
import style from './index.css'
import { WeatherLocation } from '../../data/services'

export default class SelectLoaction extends React.Component {
  constructor (props) {
    super(props)
    this.control = React.createRef()
  }

  shouldComponentUpdate () {
    return false
  }

  componentDidMount () {
    window.addEventListener('load', () => {
      this.autocomplete = new window.google.maps.places.Autocomplete(this.control.current, {
        types: [ '(cities)' ],
        language: 'en',
      })

      this.listenerPlaceChanged = window.google.maps.event.addListener(
        this.autocomplete,
        'place_changed',
        this.handlePlaceChanged
      )
    })
  }

  componentWillUnmount () {
    window.google.maps.event.removeListener(this.listenerPlaceChanged)
  }

  handlePlaceChanged = () => {
    if (!this.props.onChange) {
      return
    }

    const place = this.autocomplete.getPlace()

    this.props.onChange(new WeatherLocation(place))
    this.control.current.value = ''
  }

  render() {
    return (
      <div className={style.selectLoaction}>
        <Icon name="location" size="xl" />
        <input
          id="test"
          ref={this.control}
          placeholder="Change location"
          className={style.selectLoactionControl}
        />
      </div>
    )
  }
}
