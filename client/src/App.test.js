import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import VehicleInvetory from './components/VehicleInventory/VehicleInventory'


describe('App Component', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<App/>)
    })

    it('render without crahsing', () => {
        expect(wrapper).toHaveLength(1);
    })

    it('should render Vehicle Inventory Component', () => {
        expect(wrapper.
        find(VehicleInvetory).
        exists()).toBeTruthy()
    })
})