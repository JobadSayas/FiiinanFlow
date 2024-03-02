import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../components/Utilities';


const Budget = ({ budget }) =>  {

    //Abrir menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    //Cambiar nombre
    const [budgetName, setbudgetName] = useState(budget.nombre);
    

    //CHANGE NAME
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


    //DISTRIBUITE
    const handleDistribuite = () =>{
        axios.post(`${API_URL}/NEWdistribuite.php?budget=${budgetName}&amount=${budget.reparticion}`)
        .then(response => {
            console.log('API response:', response.data);
            window.location.reload();
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
        });
    };


    return (

        <li key={budget.id} apartado={budgetName} tipo="semanal" reparticion="0">

            <div className="info" onClick={handleButtonClick}>
                <div className="nombre">
                    <i className={budget.icono}></i> {budgetName}
                </div>
                <div className={`saldo ${budget.saldo < 0 ? "red" : ""}`}>${ budget.saldo }</div>
            </div>

            <i className="transaction fas fa-plus-circle"></i>

            <div className="opciones" onClick={() => setIsMenuOpen(!isMenuOpen) }>
                <i className="fas fa-ellipsis-v" ></i>
                {isMenuOpen && (
                    <ul>
                        <li className="disabled">Transfer</li>
                        {budget.reparticion !== "0" && 
                        <li onClick={handleDistribuite}>Distribute ${budget.reparticion}</li>
                        }
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