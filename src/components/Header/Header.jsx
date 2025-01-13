import { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import Homepage from "../../pages/Home/Home.jsx";
import Portfolio from "../../pages/Portfolio/Portfolio.jsx";
import Resume from "../../pages/Resume/Resume.jsx";
import Blog from "../../pages/Blog/Blog.jsx";
import Contact from "../../pages/Contact/Contact.jsx";
import NavigationBar from "./NavigationBar.jsx";
import NavigationDrop from "./NavigationDrop.jsx";



const Header = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="App">
            <div>
                {isMobile ? <NavigationDrop/> : <NavigationBar/>}
            </div>
            <div className="header_container">
                <Routes>
                    <Route exact path="/" element={<Homepage/>}/>
                    <Route exact path="/Portfolio" element={<Portfolio/>}/>
                    <Route exact path="/Resume" element={<Resume/>}/>
                    <Route exact path="/Blog" element={<Blog/>}/>
                    <Route exact path="/Contact" element={<Contact/>}/>
                </Routes>
            </div>
        </div>
    )
        ;
};

export default Header;
