import React from 'react';
import { shallow } from 'enzyme';
import VehicleInventory from './VehicleInventory';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockData = {vehicles: [{ _id: '1234', name: 'Land Rover', created: '12/5/7', type: 'Hybrid'},
{ _id: '2345', name: 'Ferrari Spider', created: '13/6/7', type: 'Hybrid'},
{ _id: '34565435', name: 'Nissa Tida', created: '15/4/19', type: 'Suv'}]}

const mockPutData = { vehicle: {_id: '123', name: 'passed', type: 'Truck', created: '12/7/14'}}

describe('VehicleInventory Component', () => {
    let wrapper;
    let spyGET = jest.spyOn(axios,'get');
    let spyPUT = jest.spyOn(axios,'put');
    let spyDELETE = jest.spyOn(axios,'delete');
    let mock;

    beforeEach(() => {

       
        mock = new MockAdapter(axios);
        mock.onGet("/api/vehicle").reply(200,mockData);
        mock.onPut(`/api/vehicle/123`).reply(200,mockPutData);
        mock.onDelete(`/api/vehicle/123`).reply(200);
        wrapper = shallow(<VehicleInventory/>)

      

    })

    it('renders without crashing', () => {
        expect(wrapper).toHaveLength(1);
    })

    it('calls API get on ComponentDidMount', () => {
        
        expect(spyGET).toHaveBeenCalled();

    })

    it('sets the state according to the GET response', () => {
        expect(wrapper.state().listOfVehicles).toHaveLength(mockData.vehicles.length);
        expect(wrapper.state().loading).toBeFalsy();
    })

    it('change state of nameEdit on change', () => {
        wrapper.setState({
            extendInfo: true
        });
        wrapper.find('#nameEdit').simulate('change', {
            target: {
                name: 'nameEdit',
                value: 'Hyundai i10'
            }
        })

        expect(wrapper.state().nameEdit).toEqual('Hyundai i10');
    })

    it('change state of typeEdit on change', () => {
        wrapper.setState({
            extendInfo: true
        });
        wrapper.find('#typeEdit').simulate('change', {
            target: {
                name: 'typeEdit',
                value: 'Hybrid'
            }
        })

        expect(wrapper.state().typeEdit).toEqual('Hybrid');
    })

    it('sends a PUT request for edit vehicles', () => {
        wrapper.setState({
            listOfVehicles: [{
                _id: '123',
                name: 'notpased',
                type: 'Suv',
                created: '12/5/14'
            }],
            nameEdit: 'passed',
            typeEdit: 'Truck',
            info: {
                id: '123'
            }
        });
        wrapper.instance().handleSubmit();
        expect(spyPUT).toHaveBeenCalled();
    })

    it('sends a DELETE request for remove vehicle', () => {
        wrapper.setState({
            info: {
                id: '123'
            }
        });

        wrapper.instance().removeVehicle();

        expect(spyDELETE).toHaveBeenCalled();
    })
})