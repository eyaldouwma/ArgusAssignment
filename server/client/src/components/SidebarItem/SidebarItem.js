import React from 'react';
import './SidebarItem.css';

class SidebarItem extends React.Component {

    state = {
        id: '',
        name: '',
        type: '',
        dateCreated: '',
        lastSuccessfulllogin: '1234',
    }

    setInfo() {
        this.setState({
            id: this.props.info._id,
            name: this.props.info.name,
            type: this.props.info.type,
            dateCreated: this.props.info.created
        })
    }

    componentDidMount() {
        this.setInfo();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.info.name !== this.state.name ||
        prevProps.info.type !== this.state.type  )
        {
             this.setInfo();
        }
    }
 
    render() {
        return (
            <div className='item' onClick={() => this.props.func({
                id: this.state.id,
                name: this.state.name,
                date: this.state.dateCreated,
                type: this.state.type,
                last: this.state.lastSuccessfulllogin
            })}>
                <span>{`${this.state.name} ${this.state.type}`}</span>
            </div>
        )
    }

}

export default SidebarItem;