import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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


    //RELOAD PAGE

    const handleReload = () => {
        window.location.reload();
    };

    //MULTI INSERT

    const handleMultiInsert = () => {
        // Get json recods
        let userInput = prompt("Insert JSON");
        closeMenu();
        if (userInput !== null){
            let curatedObject = userInput.replace(/'/g, '"');
            let records = JSON.parse(curatedObject);
            multiInsertAPI(records);
        }
    };

    // Create records
    const multiInsertAPI = (records) => {
        axios.post(`${API_URL}/NEWmultiInsert.php`, { records })
            .then(response => {
                console.log('API response:', response.data);
                handleReload();
            })
            .catch(error => {
                console.error('There was a problem with the request:', error);
            });
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


    //DISTRIBUITE ALL

    const handleDistribuiteAll = () => {
        let answer = prompt("Enter 1 to use current date or enter specific date\nYYYY-MM-DD");
        let selectedDate = "";
        
        if(answer!==null){
            if(answer==="1"){
                const date = new Date();
                //This because the time was coming in UTD, to transform to CST
                const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
                // Transforms the date in the right format YYYY-MM-DDTHH:MM
                selectedDate = localDate.toISOString().slice(0, 16);
            }
            else{
                selectedDate = `${answer}T12:00`;
            }
            
            axios.post(`${API_URL}/NEWdistribuite.php?budget=*&date=${selectedDate}`)
            .then(response => {
                console.log('API response:', response.data);
                handleReload();
            })
            .catch(error => {
                console.error('There was a problem with the request:', error);
            });
        }
    };


    //NAVEGACION
    const navigate = useNavigate();

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
                    <li className='disabled'><i className="fas fa-clipboard-list"></i> Search</li>
                    <li onClick={handleLastRecords}><i className="fas fa-calendar-day"></i> Last records</li>
                    <li onClick={handleDistribuiteAll}><i className="fas fa-calendar-day"></i> Distribute All</li>
                    <li onClick={handleTransfer}><i className="fas fa-share"></i> Transfer</li>
                    <li onClick={handleMultiInsert}><i className="fas fa-clone"></i> Multi Insert</li>
                    <li><a href="https://docs.google.com/spreadsheets/d/1KYrZ5UuTdmgxbyKIdNya4WZmfAopNfF9SB-tZ7Fpzjw/edit?pli=1#gid=0" target="_blank" rel="noreferrer" onClick={closeMenu}><i className="fas fa-external-link-alt"></i> JSON Converter</a></li>
                </ul>
            </div>
        )}

    </>);

};

export default MainMenu;

