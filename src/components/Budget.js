import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default ({ name, amount, icon, distribution }) =>  {

    //Abrir menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    //Cambiar nombre
    const [budgetName, setbudgetName] = useState(name);
    
    const changeName = () => {
        const newName = prompt("New budget name");
        setbudgetName(newName);
    };

    //Values
    let formatedAmmount = Number(amount).toFixed(2)
    
    //NAVEGACION
    const navigate = useNavigate();

    const handleButtonClick = () => {
        // Navigate with parameters
        navigate(`/records/${budgetName}`, { state: { icon, formatedAmmount } });
    };


    return (

        <li apartado={budgetName} id_apartado="" tipo="semanal" reparticion="0">

            <div className="info" onClick={handleButtonClick}>
                <div className="nombre">
                    <i className={icon}></i> {budgetName}
                </div>
                <div className="saldo">${ formatedAmmount }</div>
            </div>

            <i className="transaction fas fa-plus-circle"></i>

            <div className="opciones" onClick={() => setIsMenuOpen(!isMenuOpen) }>
                <i className="fas fa-ellipsis-v" ></i>
                {isMenuOpen && (
                    <ul>
                        <li className="transferencia">Transfer</li>
                        {distribution !== "0" && <li className="reparticion">Distribute ${distribution}</li>}
                        <li className="change-name" onClick={changeName}>Change Name</li>
                        <li className="change-repartition">Change Repartition</li>
                        <li className="hide-apartado">Hide</li>
                    </ul>
                )}
            </div>
        </li>

    );
  
}