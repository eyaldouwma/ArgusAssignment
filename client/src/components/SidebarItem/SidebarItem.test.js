import React from 'react';
import { shallow } from 'enzyme';
import SidebarItem from './SidebarItem';


const mockFunc = jest.fn()

describe('SidebarItem Component', () => {
    const props = {
        info: {
            _id: "1223",
            name: "Audi R8",
            type: "Hybrid",
            created: "12/5/7"
        },
        func: mockFunc
    }
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<SidebarItem {...props}/>)
    })

    it('render without crashing', () => {
        expect(wrapper).toHaveLength(1);
    })

    it('calls a func to show vehicle details onclick', () => {
        wrapper.find('.item').simulate('click');
    })
})