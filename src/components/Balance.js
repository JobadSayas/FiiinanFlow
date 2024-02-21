import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {API_URL} from '../components/Utilities';

export default () =>  {

    //Fondos
    const [fondos, setFondos] = useState(null);

    useEffect(() => {
        const fetchfondos = async () => {
        try {
            const response = await fetch(`${API_URL}/methods-suma.php`);
            const data = await response.json();
            setFondos(data.fondos);
        } catch (error) {
            console.error('Error fetching fondos:', error);
        }
        };

        fetchfondos();
    }, []);


    //Suma apartados
    const [sumaApartados, setsumaApartados] = useState(null);

    useEffect(() => {
        const fetchSumaApartados = async () => {
        try {
            const response = await fetch(`${API_URL}/apartados-suma-activos.php`);
            const data = await response.json();
            setsumaApartados(data.sum);
        } catch (error) {
            console.error('Error fetching sumaApartados:', error);
        }
        };

        fetchSumaApartados();
    }, []);

    return(

        <li id="balance">
            <div class="founds"><i class="fas fa-wallet"></i> <span class="Label">Founds:</span> <span class="amount">${fondos}</span></div>
            <div class="budgets"><i class="fas fa-chart-pie"></i> <span class="Label">Budgets:</span> <span class="amount">${sumaApartados}</span> </div>
            <div class="balance"><i class="fas fa-balance-scale"></i> <span class="Label">Balance:</span> <span class="amount">${(fondos-sumaApartados).toFixed(2)}</span></div>
        </li>

    );

}