import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Method from '../components/Method';
import Balance from './Balance';
import {API_URL} from '../components/Utilities';

export default () =>  {

    //METHODS
    const [methods, setMethods] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/methods-consult.php`);
                setMethods(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []); // The empty dependency array ensures that this effect runs once on mount

    // Define the desired order of items
    const desiredOrder = ["Account", "Online CC", "Jobad CC", "Maddie CC", "Respaldo CC", "Amazon CC",  "PayPal CC", "Cash", "Savings", "Stock"];

    // Create a new array to store the reordered methods
    const reorderedMethods = [];

    // Iterate over the desired order and push matching items from the original array
    desiredOrder.forEach(name => {
        const method = methods.find(method => method.nombre === name);
        if (method) {
            reorderedMethods.push(method);
        }
    });


    //Real amount

    let realAmount = 0;
    if (reorderedMethods.length >= 5) {
        realAmount = (
                        parseFloat(reorderedMethods[0].saldo) +
                        parseFloat(reorderedMethods[1].saldo) + 
                        parseFloat(reorderedMethods[2].saldo) + 
                        parseFloat(reorderedMethods[3].saldo) + 
                        parseFloat(reorderedMethods[4].saldo)
                    ).toFixed(2);
    }

    return(

        <ul id='methods'>

            {reorderedMethods.length > 0 && (
                <li key="0" className="Account">
                    <i className="fas fa-money-check-alt"></i>
                    <div className="name">{reorderedMethods[0].nombre}</div>
                    <div className="amount">{reorderedMethods[0].saldo}</div>
                    <div class="realAmount">(${realAmount})</div>
                </li>
            )}

            <Balance/>

            {reorderedMethods.slice(1).map((method, index) => (
                <Method 
                    key={index} 
                    name={method.nombre} 
                    amount={method.saldo} 
                />
            ))}
            
        </ul>

    );
}