import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './Sidebar';
import { isTSAnyKeyword, exportSpecifier } from '@babel/types';

describe('Sidebar Component', () => {
    let wrapper;
    const props = {
        children: [<div key={1}>Car1</div>,<div key={2}>Car2</div>]
    }

    beforeEach(() => {
        wrapper = shallow(<Sidebar {...props}/>)
    })

    it('renders without crashing', () => {
        expect(wrapper).toHaveLength(1);
    })

    it('should render children received from props', () => {
        const div = wrapper.find('.side-bar');
        expect(div.children()).toHaveLength(2)
    })
})