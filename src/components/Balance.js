import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {API_URL} from '../components/Utilities';

const Balance = ({realAccount, founds}) =>  {

    //FOUNDS
    let foundsSum = parseFloat(realAccount) + parseFloat(founds);


    //ACTIVE BUDGETS SUMMARY
    const [apartados, setApartados] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/NEWlistBudgets.php`);
                setApartados(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []); // The empty dependency array ensures that this effect runs once on mount

    //Sum
    let sumaApartados = 0;
    if (apartados.length > 0) {
        for (let i = 0; i < apartados.length; i++) {
            if(apartados[i].estatus === 1 && apartados[i].budget === 1 && apartados[i].saldo > 0)
            sumaApartados += parseFloat(apartados[i].saldo);
        }
    }


    //BALANCE
    let balance = (foundsSum-sumaApartados).toFixed(2)

    return(

        <li id="balance">
            <div className="founds">
                <i className="fas fa-wallet"></i> 
                <span className="Label">Founds:</span> 
                <span className="amount">${(foundsSum).toFixed(2)}</span>
            </div>
            <div className="budgets">
                <i className="fas fa-chart-pie"></i> 
                <span className="Label">Budgets:</span> 
                <span className="amount">${(sumaApartados).toFixed(2)}</span> 
            </div>
            <div className="balance">
                <i className="fas fa-balance-scale"></i>
                <span className="Label">Balance:</span> 
                <span className={`amount ${balance < 0 ? "red" : ""}`} >${balance}</span>
            </div>
        </li>

    );

}

export default Balance;