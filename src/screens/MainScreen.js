import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Budget from '../components/Budget';
import Methods from '../components/Methods';
import MainMenu from '../components/MainMenu';
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
    

    return (

        <div id="principal" className='pantalla completa' style={{paddingBottom: '66px'}}>

            <Methods/>

            <ul id='chart'></ul>

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