import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Budget from '../components/Budget';
import Methods from '../components/Methods';
import MainMenu from '../components/MainMenu';
import LineChart from '../components/LineChart';
import {API_URL} from '../components/Utilities';

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


    //RESIZE CHART ACCORDING TO METHODS

    let containerHeight = document.getElementById('methods');
    console.log(containerHeight);
    

    return (

        <div id="principal" className='pantalla completa' style={{paddingBottom: '66px'}}>

            <div id="tilesHolder">
                <div id="tileMethod">
                    <Methods/>
                </div>
                <div id="tileChart">
                    <LineChart />
                </div>
            </div>

            <ul id="apartados">
                {budgets.map(budget => (
                    <Budget 
                        budget = {budget}
                    />
                    ))}
            </ul>
        
            <MainMenu/>

        </div>
    );
  
};

export default MainScreen;