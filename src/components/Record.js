import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMethodData } from '../context/MethodContext';


export default ({ onRecordOpen, id, description, amount, tipo, method, apartado, highlighted, fecha }) =>  {

    //ABRIR MENU
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const fechaDate = new Date(fecha);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: true };
    const formatedDate = fechaDate.toLocaleString('en-US', options);


    //METHODS
    const methodData = useMethodData();

    const methodInfo = methodData.find(data => data.nombre === method);
    
    const { icono, color } = methodInfo || {};

    return (

        <li id_movimiento={id} tipo={tipo} method={method} apartado={apartado} className={highlighted == 1 && ("highlighted")}>
            <div className="area" onClick={onRecordOpen}></div>
            { method && ( <i className={`method ${icono}`} style={{color:color}}></i> )} 
            <span className="fecha" fecha={formatedDate}>{formatedDate}</span>
            <div className="main-line">
                <span className="descripcion">{description}</span>
            </div>
            <span className={`cantidad ${tipo}`}>{amount}</span>
            
            <div className="opciones" onClick={() => setIsMenuOpen(!isMenuOpen) }>
                <i className="fas fa-ellipsis-v"></i>
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