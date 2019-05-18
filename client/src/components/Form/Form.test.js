import React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockFunc = jest.fn();

describe('Form Component', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Form func={mockFunc}/>)
    })

    it('renders without crashing', () => {
        expect(wrapper).toHaveLength(1)
    })
    
    it('should change the state on name change', () => {
        wrapper.find('#name')
        .simulate('change', {
            target: {
                name: 'name',
                value: 'blahblah'
            }
        })

        expect(wrapper.state('name')).toEqual('blahblah');
    })

    
    it('should change the type upon select', () => {
        wrapper.find('#select').simulate('change', {
            target: {
                name: 'type',
                value: 'Suv'
            }
        })

        expect(wrapper.state('type')).toEqual('Suv');
    })
    
    
    it('should receive an error message for blank name', () => {
        wrapper.setState({name: ''})
        wrapper.find('button').simulate('click');

        expect(wrapper.state('error')).toEqual({
            isError: true,
            message: 'You must enter a name'
        })
    })

    it('should post to API after entering valid values on form', () => {
        let mock = new MockAdapter(axios);
        const spyOn = jest.spyOn(axios,'post');
        const data = { message: "OK", createdVehicle: "N"};
        wrapper.setState({name: 'Lamborghini'});
        mock.onPost("http://localhost:3001/api/vehicle",{
            name: wrapper.state('name'),
            type: wrapper.state('type')
        }).reply(200,data)

        wrapper.instance().handleSubmit();

        expect(spyOn).toHaveBeenCalled();
    })
})
