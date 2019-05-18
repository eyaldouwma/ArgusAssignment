import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header Component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Header />)
    })

    it('renders without crashing', () => {
        expect(wrapper).toHaveLength(1);
    })
})