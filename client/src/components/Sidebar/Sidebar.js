import React from 'react';
import './Sidebar.css';


const Sidebar = (props) => {
    return (
        <div className="side-bar">
            {props.children}
        </div>
    )
}

export default Sidebar;