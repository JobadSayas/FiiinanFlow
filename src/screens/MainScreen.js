import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {API_URL} from '../components/Utilities';
import Budget from '../components/Budget';
import Methods from '../components/Methods';
import MainMenu from '../components/MainMenu';
import LineChart from '../components/LineChart';
import GenericPopUp from '../components/GenericPopUp';
import ChangeRepartitionPopupBody from '../components/popups/ChangeRepartitionPopupBody';
import DistributePopupBody from '../components/popups/DistributePopupBody';
import MultiInsertPopupBody from '../components/popups/MultiInsertPopupBody';
import NewBudgetPopupBody from '../components/popups/NewBudgetPopupBody';
import SearchPopupBody from '../components/popups/SearchPopupBody';
import TransferPopupBody from '../components/popups/TransferPopupBody';

const MainScreen = () =>  {

    //BUDGETS   
    const [budgets, setBudgets] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/apartados-consultar.php`);
                setBudgets(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []); // The empty dependency array ensures that this effect runs once on mount


    //MENU SELECTION
    const handleMenuSelection = (selection) => {

        switch (selection) {
            case 'Search':
                setPopupVisible(true);
                setPopupType(selection);
            break;
            case 'Transfer':
                setPopupVisible(true);
                setPopupType(selection);
            break;
            case 'Multi insert':
                setPopupVisible(true);
                setPopupType(selection);
            break;
            case 'Distribute all':
                setPopupVisible(true);
                setPopupType(selection);
            break;
            case 'New budget':
                setPopupVisible(true);
                setPopupType(selection);
            break;
            case 'Change repartition':
                setPopupVisible(true);
                setPopupType(selection);
            break;
        }
        
    }


    //POP UP
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupType, setPopupType] = useState();
    const [mainAction, setMainAction] = useState(null);

    //Get popup content
    const getPopupContent = () => {
        switch (popupType) {
            case 'Search':
                return <SearchPopupBody passMainAction={setMainAction}/>;
            case 'Transfer':
                return <TransferPopupBody passMainAction={setMainAction}/>;
            case 'Multi insert':
                return <MultiInsertPopupBody  passMainAction={setMainAction}/>;
            case 'Distribute all':
                return <DistributePopupBody passMainAction={setMainAction}/>;
            case 'New budget':
                return <NewBudgetPopupBody/>;
            case 'Change repartition':
                return <ChangeRepartitionPopupBody/>;            
        }
    };

    
    //Close pop up
    const handleClosePopup = () => {
        setPopupVisible(false);
    }
    

    return (

        <div id="principal" className='pantalla completa' style={{paddingBottom: '66px'}}>

            {/* TOP TILES */}
            <div id="tilesHolder">
                <div id="tileMethod">
                    <Methods/>
                </div>
                <div id="tileChart">
                    <LineChart />
                </div>
            </div>


            {/* BUDGETS LIST */}
            <ul id="apartados">
                {budgets.map(budget => (
                    <Budget 
                        budget = {budget}
                    />
                    ))}
            </ul>
        
            {/* MAIN MENU */}
            <MainMenu
                onSelect={handleMenuSelection}
            />
            

            {/* POP UP */}
            {popupVisible && (
                <GenericPopUp
                    title ={popupType}
                    onClose = {handleClosePopup}
                    onMainAction={mainAction}
                >
                    {getPopupContent()}
                </GenericPopUp>
            )}

        </div>
    );
  
};

export default MainScreen;