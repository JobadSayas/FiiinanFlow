import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

import Record from '../components/Record';
import Button from '../components/Button';

export default () =>  {
    //GET PARAMETERS
    const { name, date } = useParams();
    const location = useLocation();
    const { state } = location;

    const icon = state && state.icon ? state.icon : "envelop";
    const amount = state && state.formatedAmmount ? state.formatedAmmount : "";

    // Set a default value for date if not provided
    const formattedDate = date || "01-01-01";


    //GET DATA
    const [registros, setRegistros] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axios.get(`https://finanzas.visssible.com/backend/movimientos-consultar.php?apartado=${name}`);
        setRegistros(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    };

    fetchData();
    }, []); // The empty dependency array ensures that this effect runs once on mount


  return (
    <div id="movimientos" className='pantalla completa' style={{paddingBottom: '66px'}}>

            <h3 className="apartado"><i className={icon}></i> {name} <span className="saldo">${amount}</span></h3>

            <ul id="lista">
                {registros.map(registro => (
                    <Record 
                        key={registro.id}
                        description={registro.descripcion}
                        amount={registro.cantidad}
                        tipo={registro.tipo}
                        method={registro.method}
                        apartado={registro.apartado}
                        highlighted={registro.highlight}
                        fecha={registro.fecha_mov}
                    />
                    ))}
            </ul>

            <div className="footer">
                <Button type="btn-default">Close</Button>
                <i className="transaction fas fa-plus-circle"></i>
            </div>

    </div>
  );
};