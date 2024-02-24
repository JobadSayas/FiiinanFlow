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
                const response = await axios.get(`${API_URL}/NEWlistMethods.php`);
                setMethods(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []); // The empty dependency array ensures that this effect runs once on mount

    
    //REAL AMOUNT

    let realAmount = 0;
    if (methods.length > 0) {
        for (let i = 0; i < methods.length; i++) {
            if(methods[i].summarize == 1)
                realAmount += parseFloat(methods[i].saldo);
        }
    }


    return(

        <ul id='methods'>

            {methods.length > 0 && (
                <li key="0" className="Account">
                    <i className={methods[0]?.icono} style={{ color: methods[0]?.color }}></i>
                    <div className="name">{methods[0].nombre}</div>
                    <div className="amount">{methods[0].saldo}</div>
                    <div className="realAmount">(${realAmount})</div>
                </li>
            )}

            <Balance/>

            {methods.slice(1).map((method, index) => (
                <Method 
                    key={index} 
                    name={method.nombre} 
                    amount={method.saldo} 
                    icon={method.icono} 
                    color={method.color} 
                />
            ))}
            
        </ul>

    );
}