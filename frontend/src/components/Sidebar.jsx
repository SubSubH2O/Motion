import { useState } from "react";
import { Link } from 'react-router-dom';


const Sidebar = ({ isOpen }) => {


    if (isOpen) {
        return (
            <div>
                <ul>
                    <li><Link to="/home/personalnote">personal with a icon</Link></li>
                    <li><Link to="/home/groupnote">group with a icon</Link></li>
                    <li><Link to="/settings">settings with a icon</Link></li>
                </ul>
            </div>
        )
    } else {
        return (
            <div>
                <ul>
                    <li><Link to="/home/personalnote">personal icon</Link></li>
                    <li><Link to="/home/groupnote">group icon</Link></li>
                    <li><Link to="/settings">settings icon</Link></li>
                </ul>
            </div>
        )
    }
}

export default Sidebar;