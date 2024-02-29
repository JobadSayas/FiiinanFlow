import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Budget = ({ budget }) =>  {

    //Abrir menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    //Cambiar nombre
    const [budgetName, setbudgetName] = useState(budget.nombre);
    
    const handleChangeName = () => {
        const newName = prompt("New budget name");
        setbudgetName(newName);
    };
    

    //NAVEGACION
    const navigate = useNavigate();

    const handleButtonClick = () => {
        // Navigate with parameters
        const icon = budget.icono;
        const budgetParam = budgetName;
        const params = { budget: budgetParam };
        const queryParams = new URLSearchParams(params).toString();
        navigate(`/records?${queryParams}`, { state: { icon } });
    };


    return (

        <li key={budget.id} apartado={budgetName} id_apartado="" tipo="semanal" reparticion="0">

            <div className="info" onClick={handleButtonClick}>
                <div className="nombre">
                    <i className={budget.icono}></i> {budgetName}
                </div>
                <div className="saldo">${ budget.saldo }</div>
            </div>

            <i className="transaction fas fa-plus-circle"></i>

            <div className="opciones" onClick={() => setIsMenuOpen(!isMenuOpen) }>
                <i className="fas fa-ellipsis-v" ></i>
                {isMenuOpen && (
                    <ul>
                        <li className="disabled">Transfer</li>
                        {budget.distribution !== "0" && <li className="disabled">Distribute ${budget.distribution}</li>}
                        <li className="disabled" onClick={handleChangeName}>Change Name</li>
                        <li className="disabled">Change Repartition</li>
                        <li className="disabled">Hide</li>
                    </ul>
                )}
            </div>
        </li>

    );
  
}

export default Budget;