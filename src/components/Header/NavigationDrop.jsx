import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import websiteData from '../../utils/websiteData.jsx';
import './NavigationDrop.css';

const NavigationDrop = () => {
    const [isOpen, setIsOpen] = useState(false);

    const location = useLocation();

    const toggleDropdown = () => setIsOpen(!isOpen);
    const closeDropdown = () => setIsOpen(false);

    return (
        <nav className="dropdown_navbar">
            <Link to="/" className={`dropdown_home ${location.pathname === "/" ? 'active' : ''}`} onClick={closeDropdown}>
                <HomeIcon fontSize="large" />
            </Link>
            <button onClick={toggleDropdown} className="menu_button">
                <MenuIcon fontSize="large" />
            </button>
            {isOpen && (
                <div className="dropdown_menu">
                    {Object.keys(websiteData.pages).map((key, index) => (
                        <NavLink
                            key={index}
                            to={websiteData.pages[key].path}
                            className={`dropdown_item ${location.pathname === websiteData.pages[key].path ? 'active' : ''}`}
                            onClick={() => toggleDropdown()}
                        >
                            {websiteData.pages[key].name}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default NavigationDrop;
