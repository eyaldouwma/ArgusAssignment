import React from 'react';
import axios from 'axios';
import './Form.css';

class Form extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        name: '',
        type: 'Truck',
        addNewToInventory: '',
        success: false,
        error: {
            isError: false,
            message: ''
        }
    }

    componentDidMount() {
        this.setState({addNewToInventory: this.props.func});
    }
    
    handleSubmit() {
        if(this.state.name === '')
        {
            this.setState({
                success: false,
                error: {
                    isError: true,
                    message: 'You must enter a name'
                }
            })
        }
        else
        {
            axios.post("/api/vehicle", {
                name: this.state.name,
                type: this.state.type
            }).then(res => {
                if(res.data.message === "OK") {
                    this.state.addNewToInventory(res.data.createdVehicle);
                }
            }).catch(err => {
                console.log(err);
            })
        this.setState({type: 'Truck', name: ''},() => this.renderOnTime());

        }
    }
    handleSelect(e) {
        this.setState({type: e.target.value});
    }
    handleChange(e) {
        this.setState({name: e.target.value});
    }

    renderOnTime() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setState({success: false, error: {
                isError: false,
                message: ''
            }});
        },2000);
    }

    render() {
        return (
            <div className='form-container'>
                <div className="form">
                    {this.state.error.isError && <span className="alert-title">{this.state.error.message}</span>}
                    {this.state.success && <span className="alert-title">Added Successfully</span>}
                    <div>
                        
                        <span>Vehicle Name:</span>
                        <input id='name' type="text" maxLength="40" value={this.state.name} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <span>Vehicle Type:</span>
                        <select id='select' value={this.state.type} onChange={this.handleSelect}>
                            <option value="Truck">Truck</option>
                            <option value="Suv">SUV</option>
                            <option value="Hybrid">Hybrid</option>
                        </select> 
                    </div>
                </div>
                <div className="button-container">
                <button onClick={this.handleSubmit}>Add</button>
                </div>
            </div>
        )
    }
}

export default Form;