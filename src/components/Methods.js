import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Method from '../components/Method';
import Balance from './Balance';
import {API_URL} from '../components/Utilities';

const Methods = () =>  {

    //NAVEGACION
    const navigate = useNavigate();

    const handleAccountClick = () => {
        // Navigate with parameters
        const icon = methods[0]?.icono;
        const methodParam = methods[0]?.nombre;
        const params = { method: methodParam };
        const queryParams = new URLSearchParams(params).toString();
        navigate(`/records?${queryParams}`, { state: { icon } });
    };


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

    let realAccount = 0;
    if (methods.length > 0) {
        for (let i = 0; i < methods.length; i++) {
            if(methods[i].realAccount === '1')
            realAccount += parseFloat(methods[i].saldo);        }
        realAccount = realAccount.toFixed(2)
    }


    //FOUNDS

    let founds = 0;
    if (methods.length > 0) {
        for (let i = 0; i < methods.length; i++) {
            if(methods[i].found === '1')
                founds += parseFloat(methods[i].saldo);
        }
    }


    return(

        <ul id='methods'>

            {methods.length > 0 && (
                <li key="0" className="Account" onClick={handleAccountClick}>
                    <i className={methods[0]?.icono} style={{ color: methods[0]?.color }}></i>
                    <div className="name">{methods[0].nombre}</div>
                    <div className="amount">${methods[0].saldo}</div>
                    <div className="realAccount">(${realAccount})</div>
                </li>
            )}

            <Balance 
                realAccount = {realAccount}
                founds = {founds}
            />

            {methods.slice(1).map((method, index) => (
                <Method 
                    key={index} 
                    method = {method}
                />
            ))}
            
        </ul>

    );
};

export default Methods;