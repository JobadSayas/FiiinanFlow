import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {API_URL} from '../components/Utilities';

export default ({realAccount, founds}) =>  {

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
            if(apartados[i].estatus == 1 && apartados[i].budget == 1 && apartados[i].saldo > 0)
            sumaApartados += parseFloat(apartados[i].saldo);
        }
    }


    //BALANCE
    let balance = (foundsSum-sumaApartados).toFixed(2)

    return(

        <li id="balance">
            <div class="founds">
                <i class="fas fa-wallet"></i> 
                <span class="Label">Founds:</span> 
                <span class="amount">${(foundsSum).toFixed(2)}</span>
            </div>
            <div class="budgets">
                <i class="fas fa-chart-pie"></i> 
                <span class="Label">Budgets:</span> 
                <span class="amount">${(sumaApartados).toFixed(2)}</span> 
            </div>
            <div class="balance">
                <i class="fas fa-balance-scale"></i>
                <span class="Label">Balance:</span> 
                <span class={`amount ${balance < 0 ? "red" : ""}`} >${balance}</span>
            </div>
        </li>

    );

}