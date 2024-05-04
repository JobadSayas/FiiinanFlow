import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../components/Utilities';

const MainMenu = ({onSelect}) =>  {
    
    //TOGGLE MENU
    const [popOverVisible, setpopOverVisible] = useState(false);
    
    const handleMenuButtonClick = () =>{
        setpopOverVisible(!popOverVisible);
    };
    
    const closeMenu = () =>{
        setpopOverVisible(false);
    }


    //RELOAD PAGE

    const handleReload = () => {
        window.location.reload();
    };


    //TRANSFER

    const methodSelector = (selection) => {
        switch (selection) {
            case '1': return "Account";
            case '2': return "Online CC";
            case '3': return "Jobad CC";
            case '4': return "Maddie CC";
            case '5': return "Respaldo CC";
            case '6': return "Amazon CC";
            case '7': return "Paypal CC";
            case '8': return "Cash";
            case '9': return "Savings";
            case '10': return "Stock";
            default: return selection;
        }
    };

    const handleTransfer = () => {
        // Get json recods
        let origin = methodSelector(prompt("Transfer from:\n1:Account / 2:Online CC / 3:Jobad CC / 4:Maddie CC / 5:Respaldo CC / 6:Amazon CC / 7:Paypal CC / 8:Cash / 9:Savings / 10:Stock"));
        let destiny = methodSelector(prompt("To:\n1:Account / 2:Online CC / 3:Jobad CC / 4:Maddie CC / 5:Respaldo CC / 6:Amazon CC / 7:Paypal CC / 8:Cash / 9:Savings / 10:Stock"));
        let amount = prompt("amount");
        closeMenu();
        if (origin !== null && destiny !== null && amount !== null){
            transferAPI(origin, destiny, amount);
        }
    };

    // Create records
    const transferAPI = (origin, destiny, amount) => {
        axios.post(`${API_URL}/NEWtransfer.php`, `origin=${origin}&destiny=${destiny}&amount=${amount}`)

            .then(response => {
                console.log('API response:', response.data);
                handleReload();
            })
            .catch(error => {
                console.error('There was a problem with the request:', error);
            });
    };


    //NAVEGACION
    const navigate = useNavigate();


    //LAST 100 RECORDS
    const handleLastRecords = () => {
        // Navigate with parameters
        const params = { limit: 100 };
        const queryParams = new URLSearchParams(params).toString();
        navigate(`/records?${queryParams}`);
    };
   

    return (<>

        <div id="menu-btn" onClick={handleMenuButtonClick}><i className="fas fa-bars"></i></div>

        {popOverVisible &&(
            <div id="menu" className="desplegado">
                <ul>
                    <li onClick={() => {onSelect('Search'); closeMenu();}}><i className="fas fa-search"></i> Search</li>
                    <li onClick={() => {handleLastRecords(); closeMenu();}}><i className="fas fa-list"></i> Last records</li>
                    <li onClick={() => {onSelect('Distribute all'); closeMenu();}}><i className="fas fa-calendar-day"></i> Distribute All</li>
                    {/* <li onClick={() => {onSelect('Transfer'); closeMenu();}}><i className="fas fa-share"></i> Transfer</li> */}
                    <li onClick={handleTransfer}><i className="fas fa-share"></i> Transfer</li>
                    <li onClick={() => {onSelect('Multi insert'); closeMenu();}}><i className="fas fa-clone"></i> Multi Insert</li>
                    <li onClick={() => {closeMenu();}}><a href="https://docs.google.com/spreadsheets/d/1KYrZ5UuTdmgxbyKIdNya4WZmfAopNfF9SB-tZ7Fpzjw/edit?pli=1#gid=0" target="_blank" rel="noreferrer" onClick={closeMenu}><i className="fas fa-external-link-alt"></i> JSON Converter</a></li>
                </ul>
            </div>
        )}

    </>);

};

export default MainMenu;

