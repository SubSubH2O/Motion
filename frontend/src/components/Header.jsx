import {Link} from 'react-router-dom';

const Header = ({onSidebarToggle}) => {


    return (
        <div className="bg-red-500 flex flex-row">
            <button onClick={onSidebarToggle}> ☰ </button>
            <div className="text-lg font-bold"><Link to="/home">Motion</Link></div>
            <div>SearchBar</div>
            <div>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li>Contact Me</li>
                    <li><Link to="/userprofile">profile picture</Link></li>
                </ul>
            </div>
        </div>  
    )
}

export default Header;