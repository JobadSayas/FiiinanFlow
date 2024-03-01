import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../components/Utilities';

const MainMenu = () =>  {
    
    //TOGGLE MENU
    const [popOverVisible, setpopOverVisible] = useState(false);
    
    const handleMenuButtonClick = () =>{
        setpopOverVisible(!popOverVisible);
    };
    
    const closeMenu = () =>{
        setpopOverVisible(false);
    }


    //MULTI INSERT

    const handleMultiInsert = () => {
        // Get json recods
        let userInput = prompt("Insert JSON");
        let curatedObject = userInput.replace(/'/g, '"');
        let records = JSON.parse(curatedObject);
        handleInsertRecords(records);
    };

    // Create records
    const handleInsertRecords = (records) => {
        axios.post(`${API_URL}/NEWmultiInsert.php`, { records })
            .then(response => {
                console.log('API response:', response.data);
            })
            .catch(error => {
                console.error('There was a problem with the request:', error);
            });
    };
    

    return (<>

        <div id="menu-btn" onClick={handleMenuButtonClick}><i className="fas fa-bars"></i></div>

        {popOverVisible &&(
            <div id="menu" className="desplegado">
                <ul>
                    <li><i className="fas fa-clipboard-list"></i> Advanced Report</li>
                    <li><i className="fas fa-calendar-day"></i> Distribute All</li>
                    <li><i className="fas fa-share"></i> Transfer</li>
                    <li onClick={handleMultiInsert}><i className="fas fa-clone"></i> Multi Insert</li>
                    <li><a href="https://docs.google.com/spreadsheets/d/1KYrZ5UuTdmgxbyKIdNya4WZmfAopNfF9SB-tZ7Fpzjw/edit?pli=1#gid=0" target="_blank" rel="noreferrer" onClick={closeMenu}><i className="fas fa-external-link-alt"></i> JSON Converter</a></li>
                </ul>
            </div>
        )}

    </>);
};

export default MainMenu;

