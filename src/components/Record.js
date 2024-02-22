import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getIcon } from '../components/Method';


export default ({ onRecordOpen, id, description, amount, tipo, method, apartado, highlighted, fecha }) =>  {

    //ABRIR MENU
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const icon = getIcon(method);

    
    const fechaDate = new Date(fecha);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: true };
    const formatedDate = fechaDate.toLocaleString('en-US', options);

    return (

        <li id_movimiento={id} onClick={onRecordOpen} tipo={tipo} method={method} apartado={apartado} className={highlighted == 1 && ("highlighted")}>
            <div className="area"></div>
            { method && ( <i className={`method ${icon}`}> </i> )}
            <span className="fecha" fecha={formatedDate}>{formatedDate}</span>
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