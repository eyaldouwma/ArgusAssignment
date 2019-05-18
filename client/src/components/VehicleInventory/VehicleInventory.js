import React from 'react';
import './VehicleInventory.css';
import axios from 'axios';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import SidebarItem from '../SidebarItem/SidebarItem';
import Form from '../Form/Form';

class VehicleInventory extends React.Component {

    constructor() {
        super();
        this.extendVehicleInfo = this.extendVehicleInfo.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderInfo = this.renderInfo.bind(this);
        this.addNew = this.addNew.bind(this);
        this.removeVehicle = this.removeVehicle.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        listOfVehicles: [],
        extendInfo: false,
        info: '',
        editPressed: false,
        loading: true,
        nameEdit: '',
        typeEdit: ''
    }

    componentDidMount() {
        this.getVehicles();
    }

    extendVehicleInfo(info) {

        this.setState({
            extendInfo: true,
            info: info,
            nameEdit: info.name,
            typeEdit: info.type,
        });
    }

    removeVehicle() {
        axios.delete(`http://localhost:3001/api/vehicle/${this.state.info.id}`, {
        }).then(() => {
            let newList = this.state.listOfVehicles;
            let index;
            newList.forEach((val, i) => {
                if(val._id === this.state.info.id) {
                    index = i;
                }
            })
            newList.splice(index,1);
            this.setState({listOfVehicles: newList, editPressed: false, extendInfo: false});
        }).catch(err => console.log(err));
    }

    handleSubmit() {
        if (this.state.nameEdit === '') {     
            this.handleCancel();
        }
        else {
            axios.put(`http://localhost:3001/api/vehicle/${this.state.info.id}`, {
                name: this.state.nameEdit,
                type: this.state.typeEdit
            }).then(res => {
                const currentList = this.state.listOfVehicles;
                let index;
                currentList.forEach((val,i) => {
                    if (val._id === res.data.vehicle._id)
                    {
                        index = i;
                    }
                });

                //i added Date.Now to key, so it will re render the changes
                //in the map function
                let vehicleObj = res.data.vehicle;
                let obj = {
                    ...vehicleObj,
                    key: `${res.data.vehicle._id} ${Date.now()}`
                }
                currentList[index] = obj;
                this.setState({listOfVehicles: currentList, loading: false});
            }).catch(err => console.log(err))
            
        }
    
        this.setState({editPressed: false});
    }

    handleNameChange(e) {
        this.setState({nameEdit: e.target.value})
    }

    handleTypeChange(e) {
        this.setState({typeEdit: e.target.value})
    }

    handleEdit () {
        this.setState({editPressed: true});
    }

    handleCancel() {
        this.setState({nameEdit: this.state.info.name, typeEdit: this.state.info.type, editPressed: false});
    }

    getVehicles() {
        axios.get("/api/vehicle").then(res => {
            this.setState({
                listOfVehicles: res.data.vehicles,
                loading: false,
            })
        }).catch(err => console.log(err))
        
    }

    addNew(vehicle) {
        const newList = this.state.listOfVehicles;
        newList.push(vehicle);
        this.setState({listOfVehicles: newList})
    }

    refreshList() {
        this.setState({loading: true,  editPressed: false});
        this.getVehicles();
    }

    renderInfo() {

        return (
            <div className='vehicle-info-container'>
                <div className='vehicle-info'>
                    <div>
                        <span>Vehicle ID:</span>
                        <input type="text" value={this.state.info.id} disabled={true}/>
                    </div>
                    <div>
                        <span>Vehicle Name:</span>
                        <input id='nameEdit' type="text" value={this.state.nameEdit} onChange={this.handleNameChange} disabled={this.state.editPressed ? false : true}/>
                    </div>
                    <div>
                        <span>Vehicle Type:</span>
                        <select id='typeEdit' value={this.state.typeEdit} disabled={this.state.editPressed ? false : true} onChange={this.handleTypeChange}>
                            <option value="Truck">Truck</option>
                            <option value="Suv">SUV</option>
                            <option value="Hybrid">Hybrid</option>
                        </select> 
                    </div>
                    <div>
                        <span>Date Created:</span>
                        <input type="text" value={this.state.info.date} disabled={true}/> 
                    </div>
                    <div>
                        <span>Last Successfull Connection:</span>
                        <input type="text" value={this.state.info.last} disabled={true}/>
                    </div>
                </div>
                <div className='button-container'>
                    <button onClick={this.handleEdit}>Edit</button>
                    <button onClick={this.removeVehicle}>Remove</button>
                    <button onClick={this.handleSubmit} disabled={this.state.editPressed ? false : true}>Save</button>
                    <button disabled={this.state.editPressed ? false : true} onClick={this.handleCancel}>Cancel</button>
                </div>
            </div>
        )
    }
        
    render() {

        let SidebarItems;

        if(!this.state.loading)
        {
            SidebarItems = this.state.listOfVehicles.map((val) => {
                return(
                    <SidebarItem key={val.key !== undefined ? val.key : val._id} func={this.extendVehicleInfo} info={val}/>
                )
            })
        }

        return (
         <div className="app-container">
            <Header/>
            {this.state.extendInfo && this.renderInfo()}
            <Form func={this.addNew}/>
            <Sidebar>
                {SidebarItems}
            </Sidebar>
        </div>
        )
    }
}

export default VehicleInventory