import React, { useState, onRecordOpen } from 'react';
import { useNavigate } from 'react-router-dom';

import { getIcon } from '../components/Method';


export default ({ id, description, amount, tipo, method, apartado, highlighted, fecha }) =>  {

    //ABRIR MENU
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const icon = getIcon(method);

    
    //FORMAT DATE
    // Convert the date string to a Date object
    const date = new Date(fecha);

    // Extract date components
    const month = date.toLocaleString('en-us', { month: 'short' }); // Short month name
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the date and time string
    const formattedDate = `${month}/${day}/${year} - ${hours}:${minutes.toString().padStart(2, '0')}`;

    return (

        <li id_movimiento={id} onClick={onRecordOpen} tipo={tipo} method={method} apartado={apartado} className={highlighted == 1 && ("highlighted")}>
            <div className="area"></div>
            { method && ( <i className={`method ${icon}`} method="Online CC"> </i> )}
            <span className="fecha" fecha={fecha}>{formattedDate}</span>
            <div className="main-line">
                <span className="descripcion">{description}</span>
            </div>
            <span className={`cantidad ${tipo}`}>{amount}</span>
            
            <div className="opciones">
                <i class="fas fa-ellipsis-v" onClick={() => setIsMenuOpen(!isMenuOpen) }></i>
                {isMenuOpen && (
                    <ul>
                        <li className="cambiar">Change Budget</li>
                        <li className="unhighlight">Unhighlight</li>
                        <li className="clone">Duplicate</li>
                        <li className="borrar">Delete</li>
                    </ul>
                )}
            </div>
        </li>

    );
  
}