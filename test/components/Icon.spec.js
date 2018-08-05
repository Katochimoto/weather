import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Icon from '@/components/Icon'

Enzyme.configure({adapter: new Adapter()})

describe('Icon', () => {
  test('Should contain a link to the image', () => {
    const component = shallow(
      <Icon name="loader" />
    )

    expect(component.contains(<use xlinkHref="#loader"></use>)).toEqual(true);
  })
})
