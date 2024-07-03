import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainMenu = ({onSelect}) =>  {
    
    //TOGGLE MENU
    const [popOverVisible, setpopOverVisible] = useState(false);
    
    const handleMenuButtonClick = () =>{
        setpopOverVisible(!popOverVisible);
    };
    
    const closeMenu = () =>{
        setpopOverVisible(false);
    }


    //NAVEGACION
    const navigate = useNavigate();


    //LAST 100 RECORDS
    const handleLastRecords = () => {
        // Navigate with parameters
        const params = { limit: 100 };
        const queryParams = new URLSearchParams(params).toString();
        navigate(`/records?${queryParams}`);
    };

    //LAST MONTH
    const handleLastMonth = () => {
        const currentDate = new Date();
        const currentMonth = (currentDate.getMonth() + 0).toString().padStart(2, '0');
        const queryParams = `/records?start_date=${currentDate.getFullYear()}-${currentMonth}-01&end_date=${currentDate.getFullYear()}-${currentMonth}-31&budget=groceries&type=gasto&sort=cantidad`;
        navigate(queryParams);
    };
   

    return (<>

        <div id="menu-btn" onClick={handleMenuButtonClick}><i className="fas fa-bars"></i></div>

        {popOverVisible &&(
            <div id="menu" className="desplegado">
                <ul>
                    <li onClick={() => {onSelect('Search'); closeMenu();}}><i className="fas fa-search"></i> Search</li>
                    <li onClick={() => {handleLastRecords(); closeMenu();}}><i className="fas fa-list"></i> Last records</li>
                    <li onClick={() => {handleLastMonth(); closeMenu();}}><i className="fas fa-list"></i> Last month</li>
                    <li onClick={() => {onSelect('Distribute all'); closeMenu();}}><i className="fas fa-calendar-day"></i> Distribute All</li>
                    <li onClick={() => {onSelect('Transfer'); closeMenu();}}><i className="fas fa-share"></i> Transfer</li>
                    <li onClick={() => {onSelect('Multi insert'); closeMenu();}}><i className="fas fa-clone"></i> Multi Insert</li>
                    <li onClick={() => {closeMenu();}}><a href="https://docs.google.com/spreadsheets/d/1KYrZ5UuTdmgxbyKIdNya4WZmfAopNfF9SB-tZ7Fpzjw/edit?pli=1#gid=0" target="_blank" rel="noreferrer" onClick={closeMenu}><i className="fas fa-external-link-alt"></i> JSON Converter</a></li>
                </ul>
            </div>
        )}

    </>);

};

export default MainMenu;

